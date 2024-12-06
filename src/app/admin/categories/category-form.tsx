import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  createCategorySchema,
  CreateCategorySchema,
} from '@/app/admin/categories/category.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createCategory,
  imageUploadHandler,
  updateCategory,
} from '@/actions/categories'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import Image from 'next/image'
import slugify from 'slugify'

export const CategoryForm = ({
  isEditMode,
  setIsModalOpen,
  defaultValues,
}: {
  isEditMode: boolean
  setIsModalOpen: (isOpen: boolean) => void
  defaultValues: CreateCategorySchema | null
}) => {
  // 表单验证规则
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(
      createCategorySchema.refine(
        (data) => data.image || !isEditMode, // 新增时要求有图片，编辑时可以无图片
        {
          message: '图片是必填项',
          path: ['image'],
        }
      )
    ),
    defaultValues: isEditMode
      ? {
          name: defaultValues?.name || '',
          image: defaultValues?.image || '',
        }
      : { name: '', image: undefined },
  })

  // 监控表单image字段的值变化
  const image = form.watch('image')
  // 定义预览图片url
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 监控 image 值变化并生成预览
  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreviewUrl(url)

      // 清理旧的 URL 避免内存泄漏
      return () => URL.revokeObjectURL(url)
    }
    // 如果是编辑模式且有图片URL，使用图片URL来设置预览
    if (typeof image === 'string' && !image.startsWith('blob:')) {
      setPreviewUrl(image)
    }
  }, [image])

  const router = useRouter()

  // 副作用函数，根据是否有默认值，重置表单
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    } else {
      form.reset({ name: '', image: undefined })
    }
  }, [defaultValues, form])

  // 表单提交回调函数
  const onSubmit: SubmitHandler<CreateCategorySchema> = async (data) => {
    const { name, image } = data

    // 定义上传图片函数
    const handleImageUpload = async () => {
      if (image instanceof File) {
        const uniqueId = uuid()
        const fileName = `category/category-${uniqueId}`
        const file = new File([image], fileName)
        const formData = new FormData()
        formData.append('file', file)

        try {
          return await imageUploadHandler(formData)
        } catch {
          toast.error('Image upload failed!', {
            position: 'top-right',
          })
          return null
        }
      }

      // 如果 image 不是文件类型（编辑时可能是 URL），直接返回 URL
      return typeof image === 'string' ? image : null
    }

    // 编辑模式下，更新分类信息
    if (isEditMode) {
      const imageUrl = (await handleImageUpload()) ?? ''
      const slug = slugify(name, { lower: true }) // 生成 slug

      await updateCategory({
        name,
        imageUrl,
        slug: defaultValues?.slug || slug, // 如果已有 slug，则沿用；否则根据名称生成
      })
      toast.success('Category updated successfully', {
        position: 'top-right',
      })
    } else {
      // 创建新分类
      const imageUrl = await handleImageUpload()
      if (imageUrl) {
        await createCategory({ imageUrl, name })
        toast.success('Category created successfully', {
          position: 'top-right',
        })
      }
    }
    form.reset()
    router.refresh()
    setIsModalOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Category Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  // {...form.register('image')}
                  onChange={(event) => {
                    // 通过field.onChange来传递文件
                    const file = event.target.files?.[0]
                    field.onChange(file) // 传递文件给react-hook-form
                  }}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>Category Image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 图片预览 */}
        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt={'Category Image'}
              className="max-h-64 w-auto rounded border"
              width={50}
              height={50}
            />
          </div>
        )}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="outline"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
