import style from "./style.module.scss"
import {ReactElement, useState} from "react";

interface ButtonProps {
    customClass?: string
    icon: ReactElement,
    onButtonClick: () => void
}

export default function ButtonIcon({icon, onButtonClick, customClass = ''}: ButtonProps) {

    const [isClicked, setIsClicked] = useState(false);

    const buttonStyle = `${style.button} ${isClicked ? style.click : ''} ${customClass}`

    const handleClick = () => {
        setIsClicked(true);
        onButtonClick()
        setTimeout(() => {
            setIsClicked(false);
        }, 500);
    };

    return (
        <div onClick={handleClick} className={buttonStyle}>
            {icon}
        </div>
    );
}

