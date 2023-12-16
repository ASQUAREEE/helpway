import {Carousel} from "antd";
import {MissionBlockItem} from "../MissionBlock";
import MissionItem from "@/ui/components/mission_item/MissionItem";

export default function MissionBlockMobile(items: MissionBlockItem[]) {
    return (
        <div>
            <Carousel autoplay dots={false}>
                {
                    items.map((item, index) => (
                        <MissionItem icon={item.icon} text={item.text} color={item.color} key={index}/>
                    ))
                }
            </Carousel>
        </div>
    )
}