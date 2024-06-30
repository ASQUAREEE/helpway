'use client'

import style from "./style.module.scss"
import ProjectItem from "@/ui/components/project_item/ProjectItem";
import Button1 from "@/ui/components/button/Button";
import {mainPageIds} from "@/utils/Const";
import { Button } from "@/components/ui/button";
import { clerkClient } from "@clerk/nextjs/server";
import { trpc } from "@/server/client";
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadToVercelBlob } from "@/lib/vercelBlob";

type User = {
    id: string;
    email: string;
    role: string;
}

type Project = {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    projectLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export default function ProjectsBlock({userId}: {userId: string | undefined}) {

   const [data, setData] = useState<User | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const projectSave = trpc.project.createProject.useMutation()
   const userData = trpc.user.getUser.useMutation()
   const {data: projectsFromApi, isLoading, refetch} = trpc.project.getProject.useQuery()
   const [projects, setProjects] = useState<Project[]>([]);
   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

   useEffect(() => {
    setProjects(projectsFromApi ?? []);
   }, [projectsFromApi]);

    console.log(projects)
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (userId) {
            userData.mutate(
                { id: userId },
                {
                    onSuccess: (data) => {
                        setData(data);
                    },
                }
            );
        }
    }, [userId]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get('title')?.toString();
        const projectUrl = formData.get('project-url')?.toString();
        const description = formData.get('description')?.toString();

        projectSave.mutateAsync({
            name: title ?? '',
            description: description ?? '',
            imageUrl: imageUrl ?? '',
            projectLink: projectUrl ?? '',
            userId: userId ?? ''
        }).then(() => {
            setProjects([...projects, {
                name: title ?? '',
                description: description ?? '',
                imageUrl: imageUrl ?? '',
                projectLink: projectUrl ?? '',
                id: "",
                createdAt: "",
                updatedAt: ""
            }]);
        }).then(() => {
            (event.target as HTMLFormElement).reset();
        }).then(() => {
            refetch();
        });
        // Handle form submission logic here
        handleCloseModal();
    };

    const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setSubmitButtonDisabled(prev => !prev);
                await uploadToVercelBlob(file, (url) => {
                    if (url) {
            setImageUrl(url);
            } else {
            console.error("Upload returned a null URL");
            }
            setSubmitButtonDisabled(prev => !prev);
  });
} catch (error) {
  console.error("Upload error:", error);
} 
     }

    };

    return (
        <div className={style.container} id={mainPageIds.project.ready}>
            <h3>
                Наші проекти
            </h3>
            <div className={style.buttons_type_layout}>
                <Button1
                    text={"Реалізовано"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
                <Button1
                    text={"Триває"}
                    type={"outline"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
                <Button1
                    text={"Продовжується"}
                    type={"outline"}
                    customStyle={style.buttons_type}
                    onClick={() => {
                    }}/>
            </div>
            <div className={style.grid_container}>
                {
                    Projects(data?.role, handleOpenModal, projects, setProjects) // Pass handleOpenModal as a prop
                }
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Project Details</DialogTitle>
                        <DialogClose onClick={handleCloseModal} />
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="project-url" className="block text-sm font-medium text-gray-700">
                                Project URL
                            </Label>
                            <Input
                                type="text"
                                id="project-url"
                                name="project-url"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Upload Image
                            </Label>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={submitButtonDisabled}>Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

function Projects(role: string | undefined, handleOpenModal: () => void, projects: Project[] | undefined, setProjects: React.Dispatch<React.SetStateAction<Project[]>>) {
    return (
        <div className={style.list}>
            {role === "admin" && <Button className="h-32 w-32 mt-20 ml-20" onClick={handleOpenModal}>
                <p className="text-8xl">+</p>
            </Button>}
            {projects?.map((project) => (
                <ProjectItem
                    key={project.id}
                    id={project.id}
                    imageUrl={project.imageUrl ?? ''}
                    title={project.name}
                    description={project.description ?? ''}
                    projectLink={project.projectLink ?? ''}
                    role={role}
                    setProjects={setProjects}
                />
            ))}
        </div>
    )
}

function Skeleton() {
    return (
        <div>

        </div>
    )
}
