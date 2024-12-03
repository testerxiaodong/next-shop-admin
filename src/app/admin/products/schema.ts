import { z } from 'zod'

export const createOrUpdateProductSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z
    .number()
    .int({ message: 'Price must be an integer' })
    .min(0, { message: 'Price must be a positive integer' }),
  maxQuantity: z
    .number()
    .int({ message: 'Max Quantity must be an integer' })
    .min(0, { message: 'Max Quantity must be a positive integer' }),
  category: z.string().min(1, { message: 'Category is required' }),
  heroImage: z
    .union([
      z.instanceof(File), // 上传新图片
      z.string().url(), // 保留现有图片 URL
    ])
    .optional() // 在编辑模式下不强制要求
    .refine((value) => value !== undefined, 'Hero image is required'), // 确保有值
  images: z
    .array(
      z.union([
        z.instanceof(File), // 上传新图片
        z.string().url(), // 保留现有图片 URL
      ])
    )
    .nonempty({ message: 'At least one image is required' }) // 至少有一张图片
    .refine((images) => images && images.length > 0, {
      message: 'At least one image is required',
    }), // 确保至少有一张图片
  slug: z.string().optional(),
})

export type CreateOrUpdateProductSchema = z.infer<
  typeof createOrUpdateProductSchema
>

export const createProductSchemaServer = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z
    .number()
    .int({ message: 'Price must be an integer' })
    .positive({ message: 'Price is required' }),
  maxQuantity: z
    .number()
    .int({ message: 'Max Quantity must be an integer' })
    .positive({ message: 'Max Quantity is required' }),
  category: z.number().positive({ message: 'Category is required' }),
  heroImage: z.string().url({ message: 'Hero image is required' }),
  images: z.array(z.string().url({ message: 'Images are required' })),
})

export type CreateProductSchemaServer = z.infer<
  typeof createProductSchemaServer
>
