import style from "./style.module.scss"
import {useState} from "react";

interface ButtonProps {
    text: string,
    onClick: () => void,
    type?: "primary" | "primary_dark" | "outline" | "outline_light",
    customStyle?: string
}

export default function Button({text, onClick, type = "primary", customStyle = ''}: ButtonProps) {

    const [isClicked, setIsClicked] = useState(false);

    let buttonTypeStyle = type === 'primary' ? style.primary : style.outline
    switch (type) {
        case "primary": {
            buttonTypeStyle = style.primary
        }
            break
        case "outline": {
            buttonTypeStyle = style.outline
        }
            break
        case "primary_dark": {
            buttonTypeStyle = style.primary_dark
        }
            break
        case "outline_light": {
            buttonTypeStyle = style.outline_light
        }
            break
    }
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

