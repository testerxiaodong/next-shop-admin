import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, { message: '分类名称是必填项' }),
  // 图片字段可以是文件或 URL，在编辑模式下是非必填
  image: z
    .union([
      z.instanceof(File), // 新上传图片
      z.string().url(), // 现有图片的 URL
    ])
    .optional(), // 编辑模式下可选
  slug: z.string().optional(),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>

export const createCategorySchemaServer = z.object({
  imageUrl: z.string().min(1, { message: 'Image is required' }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
})

export type CreateCategorySchemaServer = z.infer<
  typeof createCategorySchemaServer
>

export const updateCategorySchema = z.object({
  imageUrl: z.string().min(1, { message: 'Image is required' }),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
})

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>
