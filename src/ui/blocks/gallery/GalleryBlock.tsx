"use client"

import {Image} from 'antd';
import style from './style.module.scss';
import Button from "@/ui/components/button/Button";
import {mainPageIds} from "@/utils/Const";

export default function GalleryBlock() {

    const urls = [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ]

    return (
        <div>
            <Image.PreviewGroup preview={{
                movable: false
            }}>
                <div className={style.container} id={mainPageIds.gallery}>
                    <h3>
                        Галерея
                    </h3>
                    <div className={style.content}>
                        <div className={style.folders}>
                            <Button customStyle={style.button} text={'Test folder'} onClick={() => {
                            }}/>

                            <Button customStyle={style.button} text={'Test folder'} type={"outline"} onClick={() => {
                            }}/>

                            <Button customStyle={style.button} text={'Test folder'} type={"outline"} onClick={() => {
                            }}/>
                        </div>
                        <div className={style.images}>
                            {
                                urls.map((url, index) => (
                                    <Image
                                        preview={{
                                            mask: (<div/>),
                                            maskClassName: style.image
                                        }}
                                        className={style.image}
                                        src={url}
                                        key={index}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Image.PreviewGroup>
        </div>
    )
}