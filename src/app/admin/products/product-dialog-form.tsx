import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  createOrUpdateProductSchema,
  CreateOrUpdateProductSchema,
} from '@/app/admin/products/schema'
import { Input } from '@/components/ui/input'
import { Category } from '@/app/admin/categories/categories.types'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'
import { imageUploadHandler } from '@/actions/categories'
import { toast } from 'sonner'
import { createProduct, updateProduct } from '@/actions/products'

type Props = {
  categories: Category[]
  setIsProductModalOpen: Dispatch<SetStateAction<boolean>>
  isEditMode: boolean
  isProductModalOpen: boolean
  defaultValues: CreateOrUpdateProductSchema | null
}

export const ProductForm = ({
  categories,
  setIsProductModalOpen,
  isEditMode,
  isProductModalOpen,
  defaultValues,
}: Props) => {
  // console.log('defaultValues', defaultValues)
  // 表单验证规则
  const form = useForm<CreateOrUpdateProductSchema>({
    resolver: zodResolver(
      createOrUpdateProductSchema
        .refine((data) => data.heroImage || !isEditMode, {
          message: 'Please upload a hero image',
          path: ['heroImage'],
        })
        .refine(
          (data) => (data.images && data.images.length > 0) || isEditMode,
          {
            message: 'Please upload at least one product image',
            path: ['images'],
          }
        )
    ),
    defaultValues: {
      title: '',
      category: '',
      price: 0,
      maxQuantity: 0,
      heroImage: undefined,
      images: [], // 默认值为空数组
      ...(isEditMode && defaultValues ? defaultValues : {}),
    },
  })

  // 根据是否有默认值重置表单
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues)
    } else {
      form.reset({
        title: '',
        category: '',
        price: 0,
        maxQuantity: 0,
        heroImage: undefined,
        images: [],
      })
    }
  }, [defaultValues, form])

  // 动态生成和清理预览 URL
  const [previewHeroImageUrl, setPreviewHeroImageUrl] = useState<string | null>(
    null
  )
  const [previewImagesUrls, setPreviewImagesUrls] = useState<string[]>([])

  const heroImage = form.watch('heroImage')
  const images = form.watch('images')

  // 监听 heroImage 变化，生成预览 URL
  useEffect(() => {
    if (heroImage instanceof File) {
      const url = URL.createObjectURL(heroImage)
      setPreviewHeroImageUrl(url)

      return () => URL.revokeObjectURL(url)
    }
    if (typeof heroImage === 'string') {
      setPreviewHeroImageUrl(heroImage)
    } else {
      setPreviewHeroImageUrl(null)
    }
  }, [heroImage])

  // 监听 images 变化，生成预览 URLs
  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      const urls = images.map((image) => {
        if (image instanceof File) return URL.createObjectURL(image) // 新文件生成 URL
        return image // 已有 URL
      })

      setPreviewImagesUrls(urls)

      // 清理旧的 blob URL
      return () => {
        urls.forEach((url) => {
          if (url.startsWith('blob:')) URL.revokeObjectURL(url)
        })
      }
    } else {
      setPreviewImagesUrls([]) // 没有图片时清空预览
    }
  }, [images])

  const router = useRouter()

  // 处理产品的创建/更新
  const onSubmit = async (data: CreateOrUpdateProductSchema) => {
    // console.log('onSubmit', data)
    try {
      const { category, title, price, maxQuantity, heroImage, images } = data

      // 1. 并行上传主图和产品图片
      const uploadedHeroImagePromise = handleImageUpload(heroImage)

      const uploadedImagesPromises = images.map((image) =>
        handleImageUpload(image)
      )

      // 等待所有图片上传完成
      const [uploadedHeroImage, uploadedImages] = await Promise.all([
        uploadedHeroImagePromise,
        Promise.all(uploadedImagesPromises),
      ])

      // 检查主图是否成功上传
      if (!uploadedHeroImage) {
        toast.error('Failed to upload the hero image. Please try again.', {
          position: 'top-right',
        })
        return
      }

      // 检查是否所有产品图片都成功上传
      if (uploadedImages.includes(null)) {
        toast.error('Failed to upload some product images. Please try again.', {
          position: 'top-right',
        })
        return
      }

      // 2. 创建产品逻辑
      if (!isEditMode) {
        await createProduct({
          category: Number(category),
          heroImage: uploadedHeroImage,
          images: uploadedImages as string[],
          title,
          price,
          maxQuantity,
        })
      } else {
        await updateProduct({
          category: Number(category),
          heroImage: uploadedHeroImage,
          imagesUrl: uploadedImages as string[],
          title,
          price,
          maxQuantity,
          slug: defaultValues?.slug as string,
        })
      }

      // 4. 成功后操作
      toast.success(
        isEditMode
          ? 'Product updated successfully!'
          : 'Product created successfully!',
        {
          position: 'top-right',
        }
      )
      form.reset() // 重置表单
      router.refresh() // 刷新页面
      setIsProductModalOpen(false) // 关闭模态框
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
      })
    }
  }

  // 辅助函数：上传图片（主图或产品图）
  const handleImageUpload = async (image: string | File) => {
    if (image instanceof File) {
      const uniqueId = uuid()
      const fileName = `product/product-${uniqueId}`
      const formData = new FormData()
      formData.append('file', image, fileName)

      try {
        return await imageUploadHandler(formData)
      } catch (err) {
        console.error('Image upload failed:', err)
        return null
      }
    }

    // 如果图片是已有的 URL（编辑模式），直接返回
    return typeof image === 'string' ? image : null
  }

  const handleDialogClose = () => {
    setIsProductModalOpen(false)
    form.reset() // 重置表单
  }

  return (
    <Dialog open={isProductModalOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Product' : 'Create New Product'}
          </DialogTitle>
          <DialogDescription>Please fill out the form below</DialogDescription>
        </DialogHeader>
        <div
          className="max-h-[calc(100svh-200px)] overflow-y-auto"
          style={{
            scrollbarWidth: 'none' /* Firefox */,
            msOverflowStyle: 'none' /* Internet Explorer 10+ */,
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {/* 产品标题控件 */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product title"
                        {...field}
                        className="col-span-3"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 产品分类控件 */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          disabled={form.formState.isSubmitting}
                          className="col-span-3"
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 产品价格控件 */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="number"
                        className="col-span-3"
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          // 确保输入值为数字
                          field.onChange(value === '' ? '' : parseFloat(value))
                        }}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 产品最大库存控件 */}
              <FormField
                control={form.control}
                name="maxQuantity"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Max Quantity</FormLabel>
                    <FormControl>
                      <Input
                        id="maxQuantity"
                        type="number"
                        className="col-span-3"
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value
                          // 确保输入值为数字
                          field.onChange(
                            value === '' ? '' : parseInt(value, 10)
                          )
                        }}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 产品主图控件 */}
              <FormField
                control={form.control}
                name="heroImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Hero Image</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        type="file"
                        accept="image/*"
                        // {...form.register('heroImage')}
                        onChange={(event) => {
                          field.onChange(event.target.files?.[0])
                        }}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 图片预览 */}
              {previewHeroImageUrl && (
                <div className="mt-4">
                  <Image
                    src={previewHeroImageUrl}
                    alt={'Category Image'}
                    className="h24 w-24 rounded-lg border-2 border-gray-300 shadow-lg object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              )}
              {/* 产品图片控件 */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Product Images</FormLabel>
                    <FormControl className="col-span-3">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          if (event.target.files) {
                            const newFiles = Array.from(event.target.files) // 新上传的文件
                            const existingFiles = field.value || [] // 确保已有文件为数组，或设置为空数组
                            const updatedFiles = [...existingFiles, ...newFiles] // 合并文件
                            field.onChange(updatedFiles) // 更新值
                          }
                        }}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 图片预览 */}
              {previewImagesUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImagesUrls.map((url, idx) =>
                    url ? (
                      <div key={idx} className="relative">
                        <Image
                          src={url}
                          alt={`Preview ${idx + 1}`}
                          className="h-24 w-24 rounded-lg border-2 border-gray-300 shadow-md object-cover"
                          width={96}
                          height={96}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedImages: (string | File)[] = (
                              images || []
                            ).filter((_, index) => index !== idx)

                            // 确保删除图片后，images 始终是一个有效的数组
                            form.setValue(
                              'images',
                              updatedImages as [
                                string | File,
                                ...(string | File)[]
                              ]
                            )

                            // 清理预览 URL
                            const updatedPreviewUrls = previewImagesUrls.filter(
                              (_, index) => index !== idx
                            )
                            setPreviewImagesUrls(updatedPreviewUrls)
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : null
                  )}
                </div>
              )}
              <DialogFooter>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
