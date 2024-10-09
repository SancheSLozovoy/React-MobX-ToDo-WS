import React, { useState } from "react";

interface InputProps {
    currentTitle: string;
    onTitleChange: (newTitle: string) => void;
}
 
const InputChange: React.FunctionComponent<InputProps> = ({currentTitle, onTitleChange}) => {

    const[title, setTitle] = useState(currentTitle);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleConfirm = () => {
        if(title.trim() !== ""){
            onTitleChange(title.trim())
        }
    }

    return (
        <div>
            <input type="text" placeholder="Enter new task name" onChange={handleChange}/>
            <button onClick={handleConfirm}>OK</button>
        </div>

    );
}
 
export default InputChange;