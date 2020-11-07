
import axios from 'axios'
import { shuffleArray } from '../utils/shuffleArray';

const url = "https://opentdb.com/api.php?amount=10"


export type QuestionObject = {
    questionNr: number,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    difficulty: string,
    type: string,
  }

export type QuestionsState = QuestionObject & { answers: string[] };


export const fetchData = async (id: number): Promise<QuestionsState[]> => {
    let response = await axios(`${url}&category=${id}`)
    let {data} = await response
    

    console.log(data)
    return data.results.map((question: QuestionObject) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])

    })) 

}