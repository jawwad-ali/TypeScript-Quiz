import React , {useState} from "react"
import { questionPropsType } from './../Types/quiz_types'
import "./Questions.css"

const Questions: React.FC<questionPropsType> = ({ questions, options, callback }) => {

    let [selectedAns , setSelectedAns] = useState("")

    const handleSelection = (ev:any) =>{
        setSelectedAns(ev.target.value)
    }

    return (
        <div className="content">
          
            <p className="questions">{questions}</p>
            <form onSubmit={ (e:React.FormEvent<EventTarget>)=>{callback(e , selectedAns)} }>
                {
                    options.map((opt: string, ind: number) => {
                        return (
                            <div className="option-div" key={ind}>
                                <p className="options">
                                <input
                                    type="radio"
                                    name="answer"
                                    required
                                    value={opt}
                                    checked={selectedAns === opt}
                                    onChange={handleSelection}
                                    className="radioBtn"
                                />
                                {opt} </p>
                            </div>
                        )
                    })
                }
                <div className="submitBtnDiv">
                    <input type="submit" id="submit" value="Submit your Answer" className="btn btn-success" />
                </div>
            </form>
        </div>
    )
}
export default Questions