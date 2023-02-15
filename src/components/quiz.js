import React, { useState } from 'react'

// import quizData
import  quizData  from '../assets/quizData.json'

//import css file
import './quiz.css'

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = React.useState(0) //state to keep track of current question
  const [selectedAnswer, setSelectedAnswer] = React.useState('') //state for which answer user has selected
  const [showResult, setShowResult] = React.useState(false) //state to store overall stats and result after the quiz
  const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(null) //state to highlight only selected answer
  const [result, setResult] = React.useState({
    score: 0,
    percentage: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  }) // result, to calculate total scores, correctAnswers, wrongAnswers, percentage

  const [summaryAnswer, setSummaryAnswer] = React.useState([]) // state to store answer selected by user
  const [showSummary, setShowSummary] = React.useState(false) // sate to show summary of results
  const { questions } = quizData
 
  //destructring

  const { question, choices, correctAnswer } = questions[activeQuestion]
  
  // function to calculate the user score on basis of selected answer
  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult(prev =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
            percentage: ((prev.correctAnswers + 1) / questions.length) * 100
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion(prev => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  //function to match if the selected answer matches the answer given in question file.
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
      setSummaryAnswer(setAnswer => {
        return [...setAnswer, correctAnswer]
      })
    } else {
      setSelectedAnswer(false)
      setSummaryAnswer(setAnswer => {
        return [...setAnswer, answer]
      })
    }
  }

  // Add a 0 to the question number less than 10.

  const addLeadingZero = number => (number > 9 ? number : `0${number}`)

  const onShowSummaryClicked = () => {
  
    setShowSummary(true)
  }

  return (
    <div className='quiz-container'>
      {!showSummary ? (
        <div>
          {!showResult ? (
            <div>
              <div>
                <span className='active-question-no'>
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className='total-question'>
                  /{addLeadingZero(questions.length)}
                </span>
              </div>
              <h2>{question}</h2>
              <ul>
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={
                      selectedAnswerIndex === index ? 'selected-answer' : null
                    }
                  >
                    {answer}
                  </li>
                ))}
              </ul>
              <div className='flex-right'>
                <button
                  onClick={onClickNext}
                  disabled={selectedAnswerIndex === null}
                >
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          ) : (
            <div className='result'>
              <h3>Result</h3>
              <p>
                Total Question: <span>{questions.length}</span>
              </p>
              <p>
                Total Score:<span> {result.score}</span>
              </p>
              <p>
                Correct Answers:<span> {result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers:<span> {result.wrongAnswers}</span>
              </p>
              <p>
                Total Percentage:<span> {result.percentage}</span>
              </p>
              <button onClick={onShowSummaryClicked}>Show Answers</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className='active-question-no'>Quiz Result Summary</h2>
          <ul>
            {
              questions.map((data, index) => (
              
              <li key={index}>
                <div>
                  <span className='active-question-no'>
                    {addLeadingZero(index + 1)}
                  </span>
                  <span className='total-question'>
                    /{addLeadingZero(questions.length)}
                  </span>
                </div>
                <h2>{data.question}</h2>
                <ul>
                  {data.choices.map((answer, i) => (
                    <li 
                     key ={i}
                     className={
                      data.correctAnswer === answer ? 'correct-answer' : summaryAnswer[index]==answer ? 'wrong-answer' : null
                    }
                     >{answer}</li>
                  ))}
                </ul>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Quiz
