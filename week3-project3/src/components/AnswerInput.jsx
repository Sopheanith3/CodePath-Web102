import React, {useState, forwardRef, useImperativeHandle} from 'react';

const AnswerInput = forwardRef(function AnswerInput({correctAnswer, onCorrectAnswer, onIncorrectAnswer}, ref) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useImperativeHandle(ref, () => ({
        resetInput: () => {
          setUserAnswer('');
          setFeedback(null);
          setHasSubmitted(false);
        }
    }));
    
    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };
    
    const checkAnswer = () => {
        const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        
        setHasSubmitted(true);
        setFeedback(isCorrect);
        
        if (isCorrect) {
          onCorrectAnswer && onCorrectAnswer();
        } else {
          onIncorrectAnswer && onIncorrectAnswer();
        }
    };
    
    return (
        <div className="answer-input-container">
            <div className="input-wrapper">
                <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Type your answer here..."
                className="answer-input"
                disabled={hasSubmitted}
            />
            <button 
              onClick={checkAnswer} 
              className={`submit-button ${hasSubmitted ? (feedback ? 'correct' : 'incorrect') : ''}`}
              disabled={hasSubmitted || !userAnswer.trim()}
            >
            Submit Guess
            </button>
        </div>
          
        {hasSubmitted && (
            <div className={`feedback-message ${feedback ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {feedback 
                ? 'Correct!' 
                : 'Incorrect. Try again or see the answer.'}
            </div>
        )}
        </div>
    );
});
    
export default AnswerInput;