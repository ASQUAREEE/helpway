import style from "./style.module.scss"

interface cardInfoProps {
    title: string,
    text: string,
    color: "green" | "purple" | "pink" | "peache" | "orange"
}

export default function CardInfo({title, text, color}: cardInfoProps) {

    let colorStyle = ""

    switch (color) {
        case "green":
            colorStyle = style.green
            break;
        case "purple":
            colorStyle = style.purple
            break;
        case "pink":
            colorStyle = style.pink
            break;
        case "peache":
            colorStyle = style.peache
            break;
        case "orange":
            colorStyle = style.orange
            break;
    }

    return (
        <div className={style.card}>
            <div className={`${style.overlay} ${colorStyle}`}/>
            <p className={style.title}>
                {title}
            </p>
            <p className={style.text}>
                {text}
            </p>
        </div>
    )
}