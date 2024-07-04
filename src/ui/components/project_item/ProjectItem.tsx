import { useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button as ShadcnButton } from '@/components/ui/button';
import Button from "@/ui/components/button/Button";
import Image from 'next/image';
import Link from 'next/link';
import style from './style.module.scss';
import { trpc } from '@/server/client';
import { removeVercelBlob, uploadToVercelBlob } from '@/lib/vercelBlob';
import { useToast } from '@/components/ui/use-toast';
import {LanguageContext} from "@/utils/language/LanguageContext";
import {useContext} from "react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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

export default function ProjectItem({ imageUrl, name_ua, name_eng, name_ru, name_de, description_ua, description_eng, description_ru, description_de, projectLink, id, role, setProjects, type }: { imageUrl: string, name_ua: string, name_eng: string, name_ru: string, name_de: string, description_ua: string, description_eng: string, description_ru: string, description_de: string, projectLink: string, id: string, role: string | undefined, setProjects: React.Dispatch<React.SetStateAction<Project[]>>, type: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editData, setEditData] = useState({ name_ua: name_ua, name_eng: name_eng, name_ru: name_ru, name_de: name_de, description_ua: description_ua, description_eng: description_eng, description_ru: description_ru, description_de: description_de, imageUrl: imageUrl, projectLink: projectLink, type: type });
    const { mutateAsync: deleteProject } = trpc.project.deleteProject.useMutation();
    const { mutateAsync: editProject } = trpc.project.editProjectById.useMutation();
    const [languageCode, setLanguageCode] = useState("ua");
    const { translations } = useContext(LanguageContext)!;
    const { toast } = useToast();

    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language;

    useEffect(() => {
        switch (language) {
            case 0:
                setLanguageCode("ua");
                break;
            case 1:
                setLanguageCode("eng");
                break;
            case 2:
                setLanguageCode("ru");
                break;
            case 3:
                setLanguageCode("de");
                break;
            default:
                setLanguageCode("eng");
                break;
        }
    }, [language])

    const handleDelete = async() => {
        console.log(imageUrl)
        await removeVercelBlob(imageUrl, (blob) => {
  if (blob === null) {
         deleteProject({ id }).then(() => {
          toast({
              title: 'Success',
              description: 'File removed successfully.',
              variant: 'default',
          });
      }).catch((error) => {
          toast({
              title: 'Error',
              description: `Failed to remove file: ${(error as Error).message}`,
              variant: 'destructive',
          });
      });
  } else {
      toast({
          title: 'Error',
          description: 'Failed to remove file from Vercel Blob',
          variant: 'destructive',
      });
  }
});
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
        setIsModalOpen(false);

    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await editProject({ id, ...editData }).then(() => {
            toast({
                title: 'Success',
                description: 'Project updated successfully.',
                variant: 'default',
            });
            setProjects((prevProjects) => prevProjects.map((project) => project.id === id ? { ...project, ...editData } : project));
            setIsEditModalOpen(false);
        }).catch((error) => {
            toast({
                title: 'Error',
                description: `Failed to update project: ${(error as Error).message}`,
                variant: 'destructive',
            });
        });
    };

    const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setSubmitButtonDisabled(prev => !prev);
                await uploadToVercelBlob(file, (url) => {
                    if (url) {
                        setEditData({ ...editData, imageUrl: url });
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
        <div className={`${style.item} relative`}>
            {role === 'admin' && (
                  <>
                  <button className="absolute top-2 left-2 bg-white p-1 rounded-full text-blue-500 hover:text-blue-700" onClick={handleEdit}>
                      <Edit className="w-6 h-6" />
                  </button>
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700" onClick={() => setIsModalOpen(true)}>
                      <Trash className="w-6 h-6" />
                  </button>
              </>
            )}
            <Link href={{ pathname: '/project', query: { id } }}>
            <Image width={300} height={300} src={imageUrl} alt={"image"} className={style.image} />
            </Link>
            <Link href={{ pathname: '/project', query: { id } }}>
            <h2 className={style.title}> {editData[`name_${languageCode}` as keyof typeof editData]}</h2>
            </Link>
            <p className={`text-sm mb-8 ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {editData[`description_${languageCode}` as keyof typeof editData].length > 100 
                ? `${editData[`description_${languageCode}` as keyof typeof editData].substring(0, 100)}...` 
                : editData[`description_${languageCode}` as keyof typeof editData]}
            </p>
            <Link href={{ pathname: '/project', query: { id } }}>
                <Button customStyle={style.button} type={"outline"} text={translations.projects.detail} onClick={() => {
            }}/>
            </Link>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                        <DialogClose onClick={() => setIsModalOpen(false)} />
                    </DialogHeader>
                    <DialogFooter>
                        <ShadcnButton onClick={() => setIsModalOpen(false)}>Cancel</ShadcnButton>
                        <ShadcnButton onClick={handleDelete} className="bg-red-500 text-white">Delete</ShadcnButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                        <DialogClose onClick={() => setIsEditModalOpen(false)} />
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
                        <div>
                            <Label htmlFor="title_ua" className="block text-sm font-medium text-gray-700">
                                Title (UA)
                            </Label>
                            <Input
                                type="text"
                                id="title_ua"
                                name="title_ua"
                                value={editData.name_ua}
                                onChange={(e) => setEditData({ ...editData, name_ua: e.target.value })}
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
                                value={editData.name_eng}
                                onChange={(e) => setEditData({ ...editData, name_eng: e.target.value })}
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
                                value={editData.name_ru}
                                onChange={(e) => setEditData({ ...editData, name_ru: e.target.value })}
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
                                value={editData.name_de}
                                onChange={(e) => setEditData({ ...editData, name_de: e.target.value })}
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
                                value={editData.projectLink}
                                onChange={(e) => setEditData({ ...editData, projectLink: e.target.value })}
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
                                value={editData.description_ua || ''}
                                onChange={(e) => setEditData({ ...editData, description_ua: e.target.value })}
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
                                value={editData.description_eng || ''}
                                onChange={(e) => setEditData({ ...editData, description_eng: e.target.value })}
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
                                value={editData.description_ru || ''}
                                onChange={(e) => setEditData({ ...editData, description_ru: e.target.value })}
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
                                value={editData.description_de || ''}
                                onChange={(e) => setEditData({ ...editData, description_de: e.target.value })}
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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={(e) => handleImageChange(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type
                            </Label>
                            <Select
                                value={editData.type}
                                onValueChange={(value: string) => setEditData({ ...editData, type: value })}
                            >
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
                            <ShadcnButton type="submit" className="bg-blue-500 text-white">Save</ShadcnButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}