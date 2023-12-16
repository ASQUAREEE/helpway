import style from "./style.module.scss"
import {MissionBlockItem} from "@/ui/blocks/mission/MissionBlock"


export default function MissionItem({text, icon, color}: MissionBlockItem) {
    return (
        <div className={style.wrapper}>
            <div className={style.circle} style={{background: color}}>
                {icon}
            </div>
            <p className={style.text}>
                {text}
            </p>
        </div>
    )
}