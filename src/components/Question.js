import { useState } from "react";

const Question = (props) => {
  console.log("MOUNTING QUESTION");
  const [currentAnswer, setCurrentAnswer] = useState(props.answers[props.questionNumber]);
  const [error,setError] = useState("");

  const handleAnswerInput = (evt) => {
    setError("");
    console.log("input", evt.currentTarget.value, props.answers);
    //const answer = props.answers[props.questionNumber];
    // const answers = {...props.answers[props.questionNumber]};
    // answers[props.questionNumber] = evt.currentTarget.value;
    // props.setAnswer(answers);
    setCurrentAnswer(evt.currentTarget.value);

  }

  const handleNext = () => {
    if(currentAnswer.length > 0) {
      setCurrentAnswer(props.answers[props.questionNumber + 1]);
      props.nextAction(currentAnswer);
    } else {
      setError("Please provide an answer to advance.")
    }

  }

  const handlePrev = () => {
    setCurrentAnswer(props.answers[props.questionNumber - 1]);
    props.prevAction(currentAnswer);
  }

  const handleDone = () => {
    console.log('CURRENT ANSWER', currentAnswer);
    props.doneAction(currentAnswer);
  }


  return(
    <div className="question-box">
      <h2>Question {props.questionNumber}</h2>
      <div className="q-and-a-input">
        <label htmlFor="question-input">{props.question}</label>
        <input id="question-input" onChange={evt => handleAnswerInput(evt)} value={currentAnswer} />
      </div>

      {
        props.questionNumber > 1
        ? <button className="btn" onClick={() => handlePrev()}>Prev</button>
        : <></>
      }
      {
        props.questionNumber < 7
        ? <button className="btn" onClick={() => handleNext()}>Next</button>
        : <></>
      }
      {
        props.questionNumber === 7
        ? <button className="btn" onClick={() => handleDone()}>Done</button>
        : <></>
      }
      <p className="error">{error}</p>
    </div>
  );

}

export default Question;