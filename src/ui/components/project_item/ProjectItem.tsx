import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button as ShadcnButton } from '@/components/ui/button';
import Button from "@/ui/components/button/Button";
import Image from 'next/image';
import Link from 'next/link';
import style from './style.module.scss';
import { trpc } from '@/server/client';
import { removeVercelBlob } from '@/lib/vercelBlob';
import { useToast } from '@/components/ui/use-toast';

type Project = {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    projectLink: string | null;
    createdAt: string;
    updatedAt: string;
}

export default function ProjectItem({ imageUrl, title, description, projectLink, id, role, setProjects }: { imageUrl: string, title: string, description: string, projectLink: string, id: string, role: string | undefined, setProjects: React.Dispatch<React.SetStateAction<Project[]>> }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { mutateAsync: deleteProject } = trpc.project.deleteProject.useMutation();
    const { toast } = useToast()

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

    return (
        <div className={`${style.item} relative`}>
            {role === 'admin' && (
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700" onClick={() => setIsModalOpen(true)}>
                    <Trash className="w-6 h-6" />
                </button>
            )}
            <Image width={300} height={300} src={imageUrl} alt={"image"} className={style.image} />
            <h2 className={style.title}>{title}</h2>
            <p className={`text-sm mb-8 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                {description}
                {description.length > 100 && (
                    <span onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 cursor-pointer ml-2 absolute bottom-16 right-0">
                        {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                )}
            </p>
            <Link href={`https://${projectLink}`} target="_blank" rel="noopener noreferrer">
                <Button customStyle={style.button} type={"outline"} text={"Детальніше"} onClick={() => { }} />
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
        </div>
    );
}