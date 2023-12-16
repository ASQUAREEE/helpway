import style from "./style.module.scss"
import {useState} from "react";

interface ButtonProps {
    text: string,
    onClick: () => void,
    type?: "primary" | "outline",
    customStyle?: string
}

export default function Button({text, onClick, type = "primary", customStyle = ''}: ButtonProps) {

    const [isClicked, setIsClicked] = useState(false);

    const buttonTypeStyle = type === 'primary' ? style.primary : style.outline
    const buttonStyle = `${buttonTypeStyle} ${isClicked ? style.click : ''}`

    const handleClick = () => {
        setIsClicked(true);
        onClick()
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    return (
        <div onClick={handleClick} className={`${buttonStyle} ${customStyle}`}>
            <p className={style.text}>{text}</p>
        </div>
    );
}

