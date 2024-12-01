import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createCategorySchema,
  CreateCategorySchema,
} from '@/app/admin/categories/create-category.schema'

export const useCategoryForm = (defaultValues?: CreateCategorySchema) => {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues,
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    // 处理提交逻辑
    if (data.intent === 'create') {
      // 调用创建分类的 API
    } else {
      // 调用更新分类的 API
    }
  })

  return { form, handleSubmit }
}
