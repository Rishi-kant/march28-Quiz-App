import React, {useState,useRef} from 'react'
 import  style from "./quiz.module.css"
import { Question } from './questions'
export default function Quiz(){
      const [currentQuest,setCurrentQuest]=useState(0)
      const [score, setScore] = useState(0);
      const [showResult, setShowResult] = useState(false);
   
      const selectedOptionRef = useRef(null);
      
    
    const handleNextClick = () => {
        const selectedOption = selectedOptionRef.current.value;
       
        if (selectedOption === Question[currentQuest].answer) {
          setScore(score + 2);
        }
        if (currentQuest === Question.length - 1) {
          setShowResult(true);
        } else {
          setCurrentQuest(currentQuest + 1);
          
        }
       };
       function handleRestart(){
        setCurrentQuest(0)
        setScore(0)
        setShowResult(false)
        
       }
       const passingCriteria = score >= 6

     return(
        <div  className={style.mainContainer}>
            <h1  className={style.heading}>QUIZ APP</h1>
            <div className={style.container}>
                {
                  showResult ?(

                    <div className={style.result}>
                        <h2>Quiz Result :</h2>
                        <p>Your Score is {score} out of {Question.length*2}</p>
                        {
                           passingCriteria ? 
                           (<p>Congratulations! You passed the quiz.</p>)
                            : 
                           (<button onClick={handleRestart}>Start Again</button>)
                        }

                    </div>
                  )
                  :
                  ( 
                    
                    <div>
                     <h3>Question Nomber ({currentQuest+1})</h3>
                     <div className={style.question}>
                         {Question[currentQuest].question}
                     </div>
                           <div className={style.optionContainer}>
                            {
                                 Question[currentQuest].options.map((opt,index)=>
                                {
                                return (
                                <li className={style.list}>
                                 <label key={opt}>
                                   <input
                                      type="radio"
                                      name="opt"
                                      value={opt}
                                      ref={selectedOptionRef}
                                     
                                   />
                                  {opt}
                                 </label>
                                </li>
                               )
                                })
                            }
                            </div>
                          <button  onClick={handleNextClick} className={style.nextBtn}>next</button>
                         
                          </div>
                           
                    )
                }
            </div>
        </div>
    )
}