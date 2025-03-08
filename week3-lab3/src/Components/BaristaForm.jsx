import React, { useState, useEffect } from "react";
import RecipeChoices from "./RecipeChoices";

const BaristaForm = () => {
    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});
    const [correct_temp, setCheckedTemperature] = useState('');
    const [correct_syrup, setCheckedSyrup] = useState('');
    const [correct_milk, setCheckedMilk] = useState('');
    const [correct_blended, setCheckedBlended] = useState('');
    const [useTextInput, setUseTextInput] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': '',
    });

    // Import your drinks data
    const drinksJson = {
        "drinks": [
            {
                "name": "salted caramel frappuccino",
                "ingredients": {
                    "temp": "cold",
                    "syrup": "caramel",
                    "milk": "cow",
                    "blended": "yes"
                }
            },
            // You should replace this with your full drinks.json import
        ]
    };

    const ingredients = {
        'temperature': ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no'],
    };

    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '', 
            'syrup': '',
            'blended': '' 
        });
        getNextDrink();
        setCheckedTemperature('');
        setCheckedMilk('');
        setCheckedSyrup('');
        setCheckedBlended('');
    };

    const onCheckAnswer = () => {
        // Check temperature
        if (trueRecipe.temp !== inputs['temperature']) {
            setCheckedTemperature('wrong');
        } else {
            setCheckedTemperature('correct');
        }
        
        // Check syrup
        if (trueRecipe.syrup !== inputs['syrup']) {
            setCheckedSyrup('wrong');
        } else {
            setCheckedSyrup('correct');
        }
        
        // Check milk
        if (trueRecipe.milk !== inputs['milk']) {
            setCheckedMilk('wrong');
        } else {
            setCheckedMilk('correct');
        }
        
        // Check blended
        if (trueRecipe.blended !== inputs['blended']) {
            setCheckedBlended('wrong');
        } else {
            setCheckedBlended('correct');
        }
    };

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    };

    // Validate text input
    const validateInput = (input, type) => {
        const validOptions = ingredients[type];
        if (!validOptions.includes(input) && input !== '') {
            setAlertMessage(`For ${type}, that isn't even an option!`);
            setShowAlert(true);
            return false;
        }
        return true;
    };

    // Handle input change with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Initialize with a drink when component mounts
    useEffect(() => {
        getNextDrink();
    }, []);

    // Toggle between radio buttons and text input
    const toggleInputMode = () => {
        setUseTextInput(!useTextInput);
    };

    return (
        <div>
            <div className="logo-container">
                <img src="/coffee-bag.png" alt="Coffee Bag" className="logo" />
                <h1>On My Grind</h1>
            </div>
            
            <p>So you think you can barista? Let's put that to the test...</p>
            
            <h2>Hi, I'd like to order a:</h2>
            <div className="salted-caramel">
                {currentDrink}
                <button type="button" className="button newdrink" onClick={onNewDrink} style={{marginLeft: "10px"}}>🔄</button>
            </div>
            
            <div className="container">
                <div className="mini-container">
                    <h3>Temperature</h3>
                    <div className="answer-space" id={correct_temp}>
                        {inputs["temperature"]}
                    </div>
                    <RecipeChoices
                        handleChange={handleInputChange}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                        useTextInput={useTextInput}
                        validateInput={(input) => validateInput(input, "temperature")}
                    />
                </div>

                <div className="mini-container">
                    <h3>Syrup</h3>
                    <div className="answer-space" id={correct_syrup}> 
                        {inputs["syrup"]}
                    </div>
                    <RecipeChoices 
                        handleChange={handleInputChange}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                        useTextInput={useTextInput}
                        validateInput={(input) => validateInput(input, "syrup")}
                    />
                </div>

                <div className="mini-container">
                    <h3>Milk</h3>
                    <div className="answer-space" id={correct_milk}>
                        {inputs["milk"]}
                    </div>
                    <RecipeChoices 
                        handleChange={handleInputChange}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                        useTextInput={useTextInput}
                        validateInput={(input) => validateInput(input, "milk")}
                    />
                </div>

                <div className="mini-container">
                    <h3>Blended</h3>
                    <div className="answer-space" id={correct_blended}> 
                        {inputs["blended"]}
                    </div>
                    <RecipeChoices 
                        handleChange={handleInputChange}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                        useTextInput={useTextInput}
                        validateInput={(input) => validateInput(input, "blended")}
                    />
                </div>
            </div>

            <div className="button-container">
                <button className="button submit" onClick={onCheckAnswer}>
                    Check Answer
                </button>
            </div>

            {showAlert && (
                <div className="alert">
                    <p>{alertMessage}</p>
                    <div className="alert-buttons">
                        <button onClick={() => setShowAlert(false)} className="button submit">OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BaristaForm;