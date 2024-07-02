"use client"

import {Image} from 'antd';
import style from './style.module.scss';
import Button from "@/ui/components/button/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import { mainPageIds } from "@/utils/Const";
import { trpc } from '@/server/client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeVercelBlob, uploadToVercelBlob } from "@/lib/vercelBlob";
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react';


export default function GalleryBlock({ isHeader = false, userId }: { isHeader?: boolean, userId: string | undefined }) {
    const userData = trpc.user.getUser.useMutation();
    const [images, setImages] = useState<{ userId: string; id: string; imageUrl: string; }[]>([]);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const {data: galeryFromApi, isLoading} = trpc.project.getGallery.useQuery();
    const imageSave = trpc.project.createGallery.useMutation()
    const { mutateAsync: deleteImage } = trpc.project.deleteGallery.useMutation();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState<string | null>(null);
    const [deleteImageUrl, setDeleteImageUrl] = useState<string | null>(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const { toast } = useToast()

    useEffect(() => {
        setImages(galeryFromApi ?? []);
    }, [galeryFromApi]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddImage = (image: { userId: string; id: string; imageUrl: string; }) => {
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
            handleAddImage({ userId: userId ?? '', id: new Date().toISOString(), imageUrl });
        }
        setSubmitButtonDisabled(prev => !prev);
        setImageUrl(null);
        handleCloseModal();
    };

    const handleDelete = async() => {
        if (deleteImageId && deleteImageUrl) {
            console.log(deleteImageUrl)
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

    console.log(images);

    return (
        <div>
            <Image.PreviewGroup preview={{ movable: false }}>
                <div className={style.container} id={mainPageIds.gallery}>
                    <h3>Галерея</h3>
                    <div className={style.content}>
                        <div className={style.folders}>
                            <Button customStyle={style.button} text={'Test folder'} onClick={() => { }} />
                            <Button customStyle={style.button} text={'Test folder'} type={"outline"} onClick={() => { }} />
                            <Button customStyle={style.button} text={'Test folder'} type={"outline"} onClick={() => { }} />
                        </div>
                        <div className={style.images}>
                            {role && role === "admin" && (
                                <ShadcnButton className="h-16 w-16 mt-8 ml-16" onClick={handleOpenModal}>
                                    <p className="text-4xl">+</p>
                                </ShadcnButton>
                            )}
                            {images.map((image, index) => (
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
                                        className={style.image}
                                        src={image.imageUrl}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Image.PreviewGroup>
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