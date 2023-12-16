import style from "./style.module.scss"
import {ReactElement, useState} from "react";

interface ButtonProps {
    customClass?: string
    icon: ReactElement,
    onClick: () => void
}

export default function ButtonIcon({icon, onClick, customClass = ''}: ButtonProps) {

    const [isClicked, setIsClicked] = useState(false);

    const buttonStyle = `${style.button} ${isClicked ? style.click : ''} ${customClass}`

    const handleClick = () => {
        setIsClicked(true);
        onClick()
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

