import { useEffect, useState } from 'react';
import Question from './components/Question';
import { getQuestions, sendAnswers } from './network/apiactions';
import './App.css';
import LoadingWidget from './components/LoadingWidget';

function App() {
  //let questions = [];
  const [selectedQuestion,setSelectedQuestion] = useState("");
  const [questionNumber,setQuestionNumber] = useState(1);
  const [questions,setQuestions] = useState([]);
  const [networkError,setNetworkError] = useState(false);
  const [loading,setLoading] = useState(true);
  const [advice,setAdvice] = useState("");
  const [answers,setAnswers] = useState({
    1 : "",
    2 : "", 
    3 : "", 
    4 : "", 
    5 : "", 
    6 : "", 
    7 : "", 
  })

  useEffect(() => {
    console.log("I WILL GET QUESTIONS");
    getQuestions().then((questionData) => {
      console.log(questionData);
      setQuestions(questionData.questions);
      //questions = questionData.questions;
      setSelectedQuestion(questionData.questions[0]);
      setLoading(false);
    }).catch(err => {
      console.log('Network Error');
      setNetworkError(true);
      setLoading(false);
    });
    

  }, []);

  const updateAnswer = (answer) => {
    const newAnswers = {...answers}
    newAnswers[questionNumber] = answer;
    setAnswers(newAnswers); 
    return newAnswers;
  }

  const getNextQuestion = (answer) => {
    updateAnswer(answer);
    console.log("NEXT ACTION", questions, answers);
    const nextQuestionNumber = questionNumber+ 1;
    setQuestionNumber(nextQuestionNumber);
    setSelectedQuestion(questions[nextQuestionNumber - 1]);
  }

  const getPrevQuestion = (answer) => {
    updateAnswer(answer);
    const prevQuestionNumber = questionNumber - 1;
    setQuestionNumber(prevQuestionNumber);
    setSelectedQuestion(questions[prevQuestionNumber - 1]);
  }

  const handleDone = async (answer) => {
    //Set the last answer
    setLoading(true);
    const newAnswers = updateAnswer(answer);
    await handleSendAnswers(newAnswers);
  }

  //Parse the response to give HTML p tags around the paragraphs
  const parseResponse = (text) => {
    const paragraphs = text.split('\n\n');
    const html = paragraphs.map(paragraph => <p>{paragraph}</p>);
    return html;
  }

  const handleSendAnswers = async (answers) => {
    // const questionAnswer = Object.keys(answers).reduce((acc, key) => {
    //   acc[key] = {question : questions[key-1], answer : answers[key]}; // Replace "djdjdjjdjjd" with your desired value
    //   return acc;
    // }, {});
    const questionAnswer = Object.keys(answers).map((key) => ({
      question_number: key,
      question: questions[key - 1],
      answer: answers[key]
    }));
    const qAndA = {
      q_and_a : questionAnswer
    }
    console.log("Sending Answers",qAndA);
    const response = await sendAnswers(qAndA);
    console.log("Here is the response", response);
    setAdvice( parseResponse(response));
    setLoading(false);
    
  }

  const handleReset = () => {
    setLoading(true);
    getQuestions().then((questionData) => {
      setQuestions(questionData.questions);
      setSelectedQuestion(questionData.questions[0]);
      setQuestionNumber(1);
      setAnswers({
        1 : "",
        2 : "", 
        3 : "", 
        4 : "", 
        5 : "", 
        6 : "", 
        7 : "", 
      });
      setAdvice("");
      setLoading(false);
    }).catch(err => {
      console.log('Network Error');
      setNetworkError(true);
      setLoading(false);
    });
  }


  return (
    <div className="App">
      {
        loading
        ?<LoadingWidget />
        : <>
          {
            networkError
            ? <h1>Sorry, there is a network error.</h1>
            : <> 
              <h1>Seven Questions Personality Test</h1>
              {
                advice === ""
                ? 
                  <>
                    <Question 
                      questionNumber={questionNumber} 
                      question={selectedQuestion} 
                      nextAction={getNextQuestion} 
                      prevAction={getPrevQuestion}
                      doneAction={handleDone}
                      answers={answers}
                    />                
                </>
                : <div className='advice-box'>
                  <h2>Your Personality Advice</h2>
                  {advice}
                  <button className='btn' onClick={() => handleReset()}>Start Over</button>
                </div>
              } 
            </>
          }
    
        </> 
      }
      

      {/* {
        questionNumber === 7
        ? <button className="btn" onClick={() => handleSendAnswers()} >Send Answers</button>
        : <></>
      }  */}
    </div>

  );
}

export default App;
