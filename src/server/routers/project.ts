import { z } from "zod";
import { procedure, router } from "../trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const projectRouter = router({

    getProject: procedure.query(async () => {
        return await prisma.project.findMany();
    }),
    
    getProjectWithGallery: procedure.query(async () => {
        return await prisma.project.findMany({
            include: {
                imageGallery: true
            }
        });
    }),

    getHomePageGallery: procedure.query(async () => {
        return await prisma.gallery.findMany();
    }),

    editProjectById: procedure.input(z.object({
        id: z.string(),
        name_ua: z.string().optional(),
        name_eng: z.string().optional(),
        name_ru: z.string().optional(),
        name_de: z.string().optional(),
        description_ua: z.string().optional(),
        description_eng: z.string().optional(),
        description_ru: z.string().optional(),
        description_de: z.string().optional(),
        imageUrl: z.string().optional(),
        projectLink: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return await prisma.project.update({
            where: { id },
            data
        });
    }),

    getProjectWithGalleryById: procedure.input(z.object({ name_eng: z.string() })).query(async ({ ctx, input: { name_eng } }) => {
        return await prisma.project.findUnique({
            where: {
                name_eng: name_eng,
            },
            include: {
                imageGallery: true
            }
        });
    }),

    createProject: procedure
    .input(z.object({
        userId: z.string(),
        name_ua: z.string().optional(),
        name_eng: z.string().optional(),
        name_ru: z.string().optional(),
        name_de: z.string().optional(),
        description_ua: z.string().optional(),
        description_eng: z.string().optional(),
        description_ru: z.string().optional(),
        description_de: z.string().optional(),
        imageUrl: z.string(),
        projectLink: z.string(),
    }))
      .mutation(async ({ ctx, input }) => {
        return (
          await prisma.project.create({
          data: input
        })
      )
      
      }),

      deleteProject: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        return await prisma.project.delete({
          where: {
            id,
          },
        });
      }),

      getGallery: procedure.query(async () => {
        return await prisma.imageGallery.findMany();
    }),

      createGallery: procedure.input(z.object({ projectId: z.string(), imageUrl: z.string() })).mutation(async ({ ctx, input: { projectId, imageUrl } }) => {
        return await prisma.imageGallery.create({
          data: {
            imageUrl,
            projectId,
          },
        });
      }),

      deleteGallery: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        return await prisma.imageGallery.delete({
          where: {
            id,
          },
        });
      }),

      createHomePageGallery: procedure.input(z.object({ userId: z.string(), imageUrl: z.string() })).mutation(async ({ ctx, input: { userId, imageUrl } }) => {
        return await prisma.gallery.create({
          data: {
            imageUrl,
            userId,
          },
        });
      }),

      deleteHomePageGallery: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input: { id } }) => {
        return await prisma.gallery.delete({
          where: {
            id,
          },
        });
      }),



});
