import React from "react";

const RecipeChoices = ({ handleChange, label, choices, checked, useTextInput = true, validateInput }) => {
    // Handle key press for text input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            validateInput(e.target.value);
        }
    };

    // If we're using text input (default)
    if (useTextInput) {
        return (
            <div className="recipe-choices">
                <input
                    type="text"
                    name={label}
                    value={checked || ''}
                    placeholder={`Enter ${label}...`}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    className="textbox"
                />
                <ul className="radio-buttons">
                    {choices && choices.map((choice) => (
                        <li key={choice}>
                            {choice}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Radio buttons version
    return (
        <ul className="radio-buttons">
            {choices && choices.map((choice) => (
                <li key={choice}>
                    <input
                        id={`${label}-${choice}`}
                        value={choice}
                        name={label}
                        type="radio"
                        onChange={handleChange}
                        checked={checked === choice}
                    />
                    <label htmlFor={`${label}-${choice}`}>{choice}</label>
                </li>
            ))}
        </ul>
    );
};

export default RecipeChoices;