import {Question , Quiz} from './../Types/quiz_types'

const ShuffleArray = (array:any[]) => 
[...array].sort(() => Math.random() - 0.5)
 
export const getQuizDetails = async (totalNumber: number , level: string) : Promise<Question[]> =>{
    const api = await fetch(`https://opentdb.com/api.php?amount=${totalNumber}&difficulty=${level}&type=multiple`)
    const {results} = await api.json()

    const quizContent:Question[] = results.map( (questionObj:Quiz) =>{
        return{
            question :questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer,
            option: ShuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })
    return quizContent
}