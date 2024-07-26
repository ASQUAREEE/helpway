"use client"

import {Image} from 'antd';
import style from './style.module.scss';
import Button from "@/ui/components/button/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import { mainPageIds } from "@/utils/Const";
import { trpc } from '@/server/client';
import { useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeVercelBlob, uploadToVercelBlob } from "@/lib/vercelBlob";
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react';
import { LanguageContext } from '@/utils/language/LanguageContext';

type ProjectWithGallery = {
    id: string;
    imageGallery: { id: string; imageUrl: string; projectId: string; }[];
}



export default function GalleryBlock({ isHeader = false, userId, projectWithGallery }: { isHeader?: boolean, userId: string | undefined, projectWithGallery?: ProjectWithGallery | null }) {
    const userData = trpc.user.getUser.useMutation();
    const [images, setImages] = useState<{ id: string; imageUrl: string; projectId: string; }[]>([]);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [projectId, setProjectId] = useState<string | null>(projectWithGallery?.id ?? null);
    const {data: galeryFromApi, isLoading} = trpc.project.getGallery.useQuery();
    const imageSave = trpc.project.createGallery.useMutation()
    const { mutateAsync: deleteImage } = trpc.project.deleteGallery.useMutation();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
    const [deleteImageUrl, setDeleteImageUrl] = useState<string | null>(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const {data: projectWithGalleryFromApi, isLoading: isProjectWithGalleryLoading} = trpc.project.getProjectWithGallery.useQuery();

    const {translations} = useContext(LanguageContext)!

    const { toast } = useToast()

  useEffect(() => {
    if (projectWithGallery) {
        setImages(projectWithGallery.imageGallery);
        setProjectId(projectWithGallery.id);
    }
  }, [projectWithGallery]);

 

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddImage = (image: { projectId: string; id: string; imageUrl: string; }) => {
        imageSave.mutateAsync(image).then(() => {
            setImages([...images, image]);
            toast({
                title: 'Success',
                description: 'Image uploaded successfully.',
                variant: 'default',
            });
        }).catch((error) => {
            toast({
                title: 'Error',
                description: `Failed to upload image: ${(error as Error).message}`,
                variant: 'destructive',
            });
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await uploadToVercelBlob(file, (url) => {
                    if (url) {
                        setImageUrl(url);
                        setSubmitButtonDisabled(prev => !prev);
                    } else {
                        console.error("Upload returned a null URL");
                    }
                });
            } catch (error) {
                console.error("Upload error:", error);
            }
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (imageUrl) {
            handleAddImage({ projectId: projectId ?? '', id: new Date().toISOString(), imageUrl });
        }
        setSubmitButtonDisabled(prev => !prev);
        setImageUrl(null);
        handleCloseModal();
    };

    const handleDelete = async() => {
        if (deleteImageId && deleteImageUrl) {
            await removeVercelBlob(deleteImageUrl, (blob) => {
                if (blob === null) {
                    deleteImage({ id: deleteImageId }).then(() => {
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
            setImages((prevImages) => prevImages.filter((image) => image.id !== deleteImageId));
            setIsDeleteModalOpen(false);
        }
    };

    useEffect(() => {
        if (userId) {
            userData.mutate(
                { id: userId },
                {
                    onSuccess: (data) => {
                        setRole(data?.role);
                    },
                }
            );
        }
    }, [userId]);


    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-6xl px-4">
                <Image.PreviewGroup preview={{ movable: false }}>
                    <div className={`${style.container} text-center`} id={mainPageIds.gallery}>
                        <h3 className="text-2xl font-bold mb-6">{translations.header_menu.gallery}</h3>
                        <div className={`${style.content} flex justify-center`}>
                            <div className={`${style.images} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
                                {role && role === "admin" && (
                                    <ShadcnButton className="h-48 w-full flex items-center justify-center" onClick={handleOpenModal}>
                                        <p className="text-4xl">+</p>
                                    </ShadcnButton>
                                )}
                                {images.map((image) => (
                                    <div className="relative" key={image.id}>
                                        {role && role === 'admin' && (
                                            <button 
                                                className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 z-10" 
                                                onClick={() => {
                                                    setDeleteImageId(image.id);
                                                    setDeleteImageUrl(image.imageUrl);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        )}
                                        <Image
                                            preview={{ mask: (<div />), maskClassName: style.image }}
                                            className={`${style.image} w-full h-48 object-cover`}
                                            src={image.imageUrl}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Image.PreviewGroup>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                        <DialogClose onClick={handleCloseModal} />
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                onChange={handleImageChange}
                            />
                        </div>
                        <DialogFooter>
                            <ShadcnButton onClick={handleSubmit} disabled={submitButtonDisabled}>Submit</ShadcnButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Image</DialogTitle>
                    </DialogHeader>
                    <div>Are you sure you want to delete this image?</div>
                    <DialogFooter>
                        <ShadcnButton onClick={handleDelete}>Delete</ShadcnButton>
                        <ShadcnButton onClick={() => setIsDeleteModalOpen(false)}>Cancel</ShadcnButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}