import { defineCollection, z } from 'astro:content';

const post = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    featured: z.boolean().optional(),
    read: z.number().optional(),
    tags: z.array(z.string()).default([]), // 确保有 tags 字段
  }),
});

export const collections = {
  post,
};