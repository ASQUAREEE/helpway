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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadToVercelBlob } from "@/lib/vercelBlob";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LanguageContext } from "@/utils/language/LanguageContext";

type User = {
    id: string;
    email: string;
    role: string;
}

type Project = {
    id: string;
    name_ua: string | null;
    name_eng: string | null;
    name_ru: string | null;
    name_de: string | null;
    description_ua: string | null;
    description_eng: string | null;
    description_ru: string | null;
    description_de: string | null;
    imageUrl: string | null;
    type: string | null;
    projectLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export default function ProjectsBlock({userId, projectType, setProjectType}: {userId: string | undefined, projectType: string, setProjectType: React.Dispatch<React.SetStateAction<string>>}) {

   const [data, setData] = useState<User | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [imageUrl, setImageUrl] = useState<string | null>(null);
//    const [projectType, setProjectType] = useState<string>("ongoing");
   const [selectedType, setSelectedType] = useState<string>("ongoing");
   const projectSave = trpc.project.createProject.useMutation()
   const userData = trpc.user.getUser.useMutation()
   const {data: projectsFromApi, isLoading, refetch} = trpc.project.getProject.useQuery()
   const [projectByType, setProjectByType] = useState<Project[]>([]);
   const [projects, setProjects] = useState<Project[]>([]);
   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
   const {translations} = useContext(LanguageContext)!
    const router = useRouter()

   useEffect(() => {
    setProjects(projectsFromApi ?? []);
   }, [projectsFromApi]);

   useEffect(() => {
    if (projectsFromApi) {
        const filteredProjects = projectsFromApi.filter(project => project.type === projectType);
        setProjectByType(filteredProjects);
    }
}, [projectsFromApi, projectType]);

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
        const title_ua = formData.get('title_ua')?.toString();
        const title_eng = formData.get('title_eng')?.toString();
        const title_ru = formData.get('title_ru')?.toString();
        const title_de = formData.get('title_de')?.toString();
        const projectUrl = formData.get('project-url')?.toString();
        const description_ua = formData.get('description_ua')?.toString();
        const description_eng = formData.get('description_eng')?.toString();
        const description_ru = formData.get('description_ru')?.toString();
        const description_de = formData.get('description_de')?.toString();
        // const type = formData.get('type')?.toString();
        const type = selectedType; 

        projectSave.mutateAsync({
            name_ua: title_ua ?? '',
            name_eng: title_eng ?? '',
            name_ru: title_ru ?? '',
            name_de: title_de ?? '',
            description_ua: description_ua ?? '',
            description_eng: description_eng ?? '',
            description_ru: description_ru ?? '',
            description_de: description_de ?? '',
            imageUrl: imageUrl ?? '',
            projectLink: projectUrl ?? '',
            userId: userId ?? '',
            type: selectedType ?? "ongoing"
        }).then(() => {
            setProjects([...projects, {
                name_ua: title_ua ?? '',
                name_eng: title_eng ?? '',
                name_ru: title_ru ?? '',
                name_de: title_de ?? '',
                description_ua: description_ua ?? '',
                description_eng: description_eng ?? '',
                description_ru: description_ru ?? '',
                description_de: description_de ?? '',
                imageUrl: imageUrl ?? '',
                projectLink: projectUrl ?? '',
                type: selectedType ?? "ongoing",
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
        
        <section id={"projects"}>
        <div className={style.container} id={mainPageIds.project.ready}>
        <h3>
            {translations.projects.title}
        </h3>
        <div className={style.buttons_type_layout}>
            <Button1
                text={translations.projects.ready}
                type={projectType === "implemented" ? "primary" : "primary_dark"}
                customStyle={style.buttons_type}
                onClick={() => { setProjectType("implemented");}}
            />
            <Button1
                text={translations.projects.current}
                type={projectType === "ongoing" ? "primary" : "primary_dark"}
                customStyle={style.buttons_type}
                onClick={() => { setProjectType("ongoing");}}
            />

            <Button1
                text={translations.projects.regular}
                type={projectType === "regular" ? "primary" : "primary_dark"}
                customStyle={style.buttons_type}
                onClick={() => { setProjectType("regular");}}
            />

        </div>
        <div className={style.grid_container}>
        {
                    projectByType.length > 0 ? (
                        Projects(data?.role, handleOpenModal, projectByType, setProjects)
                    ) : (
                        <p>No projects here</p>
                    )
                }
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Project Details</DialogTitle>
                        <DialogClose onClick={handleCloseModal} />
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
                        <div>
                            <Label htmlFor="title_ua" className="block text-sm font-medium text-gray-700">
                                Title (UA)
                            </Label>
                            <Input
                                type="text"
                                id="title_ua"
                                name="title_ua"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="title_eng" className="block text-sm font-medium text-gray-700">
                                Title (ENG)
                            </Label>
                            <Input
                                type="text"
                                id="title_eng"
                                name="title_eng"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="title_ru" className="block text-sm font-medium text-gray-700">
                                Title (RU)
                            </Label>
                            <Input
                                type="text"
                                id="title_ru"
                                name="title_ru"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="title_de" className="block text-sm font-medium text-gray-700">
                                Title (DE)
                            </Label>
                            <Input
                                type="text"
                                id="title_de"
                                name="title_de"
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
                            <Label htmlFor="description_ua" className="block text-sm font-medium text-gray-700">
                                Description (UA)
                            </Label>
                            <Textarea
                                id="description_ua"
                                name="description_ua"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description_eng" className="block text-sm font-medium text-gray-700">
                                Description (ENG)
                            </Label>
                            <Textarea
                                id="description_eng"
                                name="description_eng"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description_ru" className="block text-sm font-medium text-gray-700">
                                Description (RU)
                            </Label>
                            <Textarea
                                id="description_ru"
                                name="description_ru"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description_de" className="block text-sm font-medium text-gray-700">
                                Description (DE)
                            </Label>
                            <Textarea
                                id="description_de"
                                name="description_de"
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
                            <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type
                            </Label>
                            <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="implemented">Implemented</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                <SelectItem value="regular">Regular</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={submitButtonDisabled}>Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        </section>
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
                    name_ua={project.name_ua ?? ''}
                    name_eng={project.name_eng ?? ''}
                    name_ru={project.name_ru ?? ''}
                    name_de={project.name_de ?? ''}
                    description_ua={project.description_ua ?? ''}
                    description_eng={project.description_eng ?? ''}
                    description_ru={project.description_ru ?? ''}
                    description_de={project.description_de ?? ''}
                    projectLink={project.projectLink ?? ''}
                    type={project.type ?? ''}
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
