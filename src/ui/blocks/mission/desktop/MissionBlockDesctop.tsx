'use client'

import {MissionBlockItem} from '../MissionBlock'
import style from './style.module.scss'
import MissionItem from "@/ui/components/mission_item/MissionItem";

export default function MissionBlockDesctop(items: MissionBlockItem[]) {
    return (
        <div className={style.container}>
            <div className={style.line}>
                <MissionItem icon={items[0].icon} text={items[0].text} color={items[0].color}/>
                <div className={style.divider_v}/>
                <MissionItem icon={items[1].icon} text={items[1].text} color={items[1].color}/>
                <div className={style.divider_v}/>
                <MissionItem icon={items[2].icon} text={items[2].text} color={items[2].color}/>
            </div>
            <div className={style.divider_h}/>
            <div className={style.line}>
                <MissionItem icon={items[3].icon} text={items[3].text} color={items[3].color}/>
                <div className={style.divider_v}/>
                <MissionItem icon={items[4].icon} text={items[4].text} color={items[4].color}/>
                <div className={style.divider_v}/>
                <MissionItem icon={items[5].icon} text={items[5].text} color={items[5].color}/>
            </div>
        </div>
    )
}