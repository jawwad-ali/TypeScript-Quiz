import React, { useEffect, useState } from 'react';
import { getQuizDetails } from "./Service/service"
import { Question } from './Types/quiz_types'
import Questions from './Components/Questions'
import "./App.css"

function App() {

  // storing question,and options in Quiz variable
  let [Quiz, setQuiz] = useState<Question[]>([])
  // current question 
  let [currentQues, setCurrentQues] = useState(0)
  // total Questions
  let TotalQues: number = Quiz.length
  // initial value of score is 0
  let [score, setScore] = useState(0)
  // showResult return
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const questions: Question[] = await getQuizDetails(5, "easy")
      setQuiz(questions)
      console.log(questions)
    }
    fetchData()
  }, [])

  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault()

    // storing questions in quiz variable
    const currentQuestion: Question = Quiz[currentQues]

    if (userAns === currentQuestion.correct_answer) {
      setScore(++score)
      // console.log(score)
    }

    if (currentQues !== Quiz.length - 1) {
      setCurrentQues(++currentQues)
    }
    else {
      setShowResult(true)
    }
  }

  // function reStart(){
  //   setCurrentQues(0)
  // }

  if (showResult) {
    return (
      <div className="score-div">
        <div className="score-inner-div">
          <span className="score-text">Your score: </span> <span className="score">{score/TotalQues *100}%</span> 
          <div className="text-center">
            <button className="btn btn-primary" onClick={()=>{ setShowResult(false); setCurrentQues(0) }}>PLAY AGAIN</button>
          </div>
        </div>
      </div>
    )
  }

  if (!Quiz.length) {
    return <h4 style={{textAlign:"center"}}>Working on it...</h4>
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="heading">
            <h1>Quiz App Using TypeScript </h1 >
          </div>
          <div className="totalQuestions"> {currentQues + 1} /  {TotalQues} </div>
          <Questions
            options={Quiz[currentQues].option}
            questions={Quiz[currentQues].question}
            callback={handleSubmit}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
