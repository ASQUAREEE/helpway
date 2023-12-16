'use client'

import style from "./style.module.scss"
import Button from "@/ui/components/button/Button";
import {mainPageIds} from "@/utils/Const";

export default function PartnersBlock() {
    return (
        <div className={style.container} id={mainPageIds.partners}>
            <div className={style.block}>
                <div className={style.info}>
                    <h3>
                        Partners
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </div>
                <Button text={"Become a partner"} onClick={function (): void {
                }}/>
            </div>
        </div>
    )
}