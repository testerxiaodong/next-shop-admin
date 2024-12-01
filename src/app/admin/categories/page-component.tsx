'use client'

import { FC, useState } from 'react'
import { CategoryForm } from '@/components/CategoryForm'

type Props = {
  categories: CategoriesWithProductsResponse
}

const CategoriesPageComponent: FC<Props> = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategorySchema | null>(null)

  const openModal = (category?: CreateCategorySchema) => {
    setCurrentCategory(category || null)
    setIsModalOpen(true)
  }

  return (
    <div>
      <Button onClick={() => openModal()}>Create Category</Button>
      {categories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span>
          <Button onClick={() => openModal(category)}>Edit</Button>
        </div>
      ))}
      {isModalOpen && (
        <CategoryForm
          defaultValues={currentCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default CategoriesPageComponent
