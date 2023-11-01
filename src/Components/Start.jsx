import React from "react"


export default function Start(props){
    
    return(
        <>
           
                <div className="quiz-div">
                    <h1 className="quiz-head">Quizzical</h1>
                    <button className="quiz-button" onClick = {props.onClick}>Start Quiz</button>
                </div>
        </>
        
    )
}