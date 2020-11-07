import React, { useState } from 'react';
import SelectCategory from './components/SelectCategory'
import QuizQuestion from './components/QuizQuestion'
import { fetchData, QuestionsState } from './data/fetchData'
import { Button, Container, makeStyles, Typography } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      height: "60px",
      display: "flex",
      flexDirection: "column",
    },
    quizcardContainer: {
      margin: "0px",
      padding: "0px",
    },
    quizappHeading: {
      marginTop: "60px",
      marginBottom: '40px',
      textAlign: "center",
      fontWeight: 'bold',
    },
    scoreResult: {
      display: "inline",
      alignSelf: 'center',
      padding: '10px 40px',
      textAlign: "center",
      boxShadow: "4px 4px 8px green",
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      border: '2px solid green',
      [theme.breakpoints.down("sm")]: {
        fontSize: '2rem',
        marginBottom: theme.spacing(7),
      },
    },
    categoryContainer: {
      width: "100%",
      height: "400px",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        height: "450px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "800px",
      },
    },
    beginBtn: {
      width: "200px",
      backgroundColor: "#008042",
      color: "white",
      alignSelf: "center",
      borderRadius: "30px",
      fontWeight: "bold",
      fontSize: '1.5rem',
      "&:hover": {
        backgroundColor: "#008042",
        color: "white",
        boxShadow: "5px 5px 7px #555",
      },
      "&:disabled": {
        backgroundColor: "#700000",
        color: "#555",
      },
      marginTop: "20px",
      [theme.breakpoints.down("xs")]: {
        marginTop: '100px',
      },
    },
}))


export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correct_answer: string;
}


const App: React.FC = () =>  {
  const classes = useStyles()

  const [catID, setCatID] = useState<number | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<QuestionsState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [gameOver, setGameOver] = useState(true)
  const [questNumber, setQuestNumber] = useState(0)
  const [score, setScore] = useState(0)

  async function getData() {
    if (catID === null) {
      return null;
    }
    else {
      let data = await fetchData(catID);
      setUserAnswers([]);
      setQuizQuestions(data);
      setQuestNumber(0);
      setScore(0);
      setGameOver(false);
    }
  }

  const checkAnswer = (e: any) => {
    if (!gameOver){
      const answer = e.currentTarget.value
      const correct = quizQuestions[questNumber].correct_answer === answer
      if (correct) setScore((prev) => prev + 1 )
      const answerObject = {
        question: quizQuestions[questNumber].question,
        answer,
        correct,
        correct_answer: quizQuestions[questNumber].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuest = questNumber + 1
    if (nextQuest === 10){
      setGameOver(true)
      setCatID(null) 
    }else{
      setQuestNumber(nextQuest)  
    }
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant="h3" component="h1" className={classes.quizappHeading}>Quiz App</Typography>
      {
        gameOver && userAnswers.length !== 0 ? (<Typography className={classes.scoreResult} variant="h3" component="h1">Your score is {score} / 10</Typography>): null
      }
      {
        gameOver ?
        <Container className={classes.categoryContainer} maxWidth={false}>
          <SelectCategory setID={setCatID}/>
          <Button disabled={catID === null? true: false } onClick={getData} className={classes.beginBtn}>Begin</Button>
        </Container> 
        :
        <Container>
          <QuizQuestion 
            questionNum={questNumber + 1}
            question={quizQuestions[questNumber].question}
            answers = {quizQuestions[questNumber].answers} 
            callback={checkAnswer} 
            userAnswer={userAnswers? userAnswers[questNumber]: undefined}/>
          <Button onClick={nextQuestion}>Next Question</Button>
        </Container>
      }
    </Container>
  );
}

export default App;
