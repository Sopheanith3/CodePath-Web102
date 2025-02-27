import React from "react";

const cardLayout = (props) => {
    return (
        <div className="Card">
            <img src={props.imageURL} alt={props.name}/>
            <h3>{props.name}</h3>
            <h5>{props.description}</h5>
            <a href={props.link}>
                <button>See More</button>
            </a>
        </div>
    ) 
}


export default cardLayout;