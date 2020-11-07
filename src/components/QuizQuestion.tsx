import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { AnswerObject } from '../App'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '70%',
        height: '450px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: "5px 5px 7px #777",
        padding: "50px",
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: "0px",
            margin: "0px",
        },
    },
    quesNum: {
        alignSelf: 'flex-start',
        fontSize: '1.4rem',
        color: '#777',
        [theme.breakpoints.down("sm")]: {
            fontSize: '1rem',
        },

    },
    question: {
        fontSize: '1.5rem',
        color: "#333",
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.1rem',
        },
    },
    answerOptions: {
        padding: "30px",
        width: '80%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    answers: {
        fontSize: '1.3rem',
        marginBottom: "5px",
        paddingBottom: "10px",
        borderBottom: '1px solid #999',
        [theme.breakpoints.down("xs")]: {
            fontSize: '1rem',
        },
    },
    correctanswers: {
        fontSize: '1.3rem',
        marginBottom: "5px",
        paddingBottom: "10px",
        borderBottom: '1px solid #999',
        backgroundColor: "green",
        "&:disabled": {
            color: 'green',
            backgroundColor: "white"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1rem',
        },
    },
    wronganswer: {
        fontSize: '1.3rem',
        marginBottom: "5px",
        paddingBottom: "10px",
        borderBottom: '1px solid #999',
        backgroundColor: 'red',
        "&:disabled": {
            color: 'red',
            backgroundColor: 'white',
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '1rem',
        },
    },
    correctoption: {
        fontSize: "1.2rem",
        textAlign: 'center',
        marginBottom: '15px',
        textDecoration: 'underline',
        [theme.breakpoints.down("xs")]: {
            fontSize: '1rem',
        },
    },
    answerText: {
        color: "green",
        fontWeight: 'bold',
    },
}))



const RenderAnswer: React.FC<{answerHTML: string}> = ({answerHTML}) => {
    return (
        <span dangerouslySetInnerHTML={{ __html: answerHTML}}></span>
    )
}

interface Props {
    question: string;
    answers: string[];
    questionNum: number;
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
}


const QuizQuestion: React.FC<Props> = ({
    question,
    callback,
    userAnswer,
    answers,
    questionNum,
    }) => {

    const classes = useStyles()

    return (
        <Container className={classes.root} fixed>
            <Typography className={classes.quesNum}>Question {questionNum} of 10:</Typography>
            <Typography component="p" dangerouslySetInnerHTML={{__html: question}} className={classes.question}></Typography>
                <Container className={classes.answerOptions}>
                {
                    !userAnswer?.correct && userAnswer?.answer ? (
                    <Typography className={classes.correctoption}>Correct Answer is "<span dangerouslySetInnerHTML={{__html: userAnswer.correct_answer}} className={classes.answerText}></span>"</Typography>
                    ): null
                }
                    {answers.map(answer => (
                        <Button 
                            disabled={userAnswer? true: false} 
                            key={answer}
                            onClick={callback} 
                            value={answer} 
                            className={
                                userAnswer?.answer === answer && !userAnswer.correct ? classes.wronganswer : userAnswer?.answer === answer && userAnswer?.correct ? classes.correctanswers : classes.answers
                            }>
                                <RenderAnswer answerHTML={answer} />
                        </Button>
                    ))}
                </Container>
        </Container>
    )
}

export default QuizQuestion
