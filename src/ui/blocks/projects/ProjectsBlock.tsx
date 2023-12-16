'use client'

import style from "./style.module.scss"
import ProjectItem from "@/ui/components/project_item/ProjectItem";
import Button from "@/ui/components/button/Button";
import {mainPageIds} from "@/utils/Const";

export default function ProjectsBlock() {
    return (
        <div className={style.container} id={mainPageIds.project.ready}>
            <h3>
                Наші проекти
            </h3>
            <div className={style.buttons_type_layout}>
                <Button
                    text={"Реалізовано"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
                <Button
                    text={"Триває"}
                    type={"outline"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
                <Button
                    text={"Продовжується"}
                    type={"outline"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
            </div>
            <div className={style.grid_container}>
                {
                    Projects()
                }
            </div>
        </div>
    )
}

function Projects() {
    return (
        <div className={style.list}>
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
            <ProjectItem
                imageUrl={"https://placehold.co/600x400.png"}
                title={"Lorem ipsum"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"}
            />
        </div>
    )
}

function Skeleton() {
    return (
        <div>

        </div>
    )
}