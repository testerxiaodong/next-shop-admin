'use client'

import { FC, useState } from 'react'
import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CategoryTableRow } from '@/app/admin/categories/category-table-row'
import { CategoriesWithProductsResponse } from '@/app/admin/categories/categories.types'
import { CategoryForm } from '@/app/admin/categories/category-form'
import { DialogDescription } from '@radix-ui/react-dialog'
import { CreateCategorySchema } from './category.schema'

type Props = {
  categories: CategoriesWithProductsResponse
}

const CategoriesPageComponent: FC<Props> = ({ categories }) => {
  // 控制Dialog弹窗的状态
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 设置当前编辑的分类
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategorySchema | null>(null)
  // 设置当前是否为编辑模式
  const [isEditMode, setIsEditMode] = useState(false)

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isModalOpen}
            onOpenChange={() => setIsModalOpen(!isModalOpen)}
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setCurrentCategory(null)
                  setIsModalOpen(true)
                  setIsEditMode(false)
                }}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? 'Edit Category' : 'Create New Category'}
                </DialogTitle>
                <DialogDescription>
                  Please fill out the form below
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                setIsModalOpen={setIsModalOpen}
                isEditMode={isEditMode}
                defaultValues={{
                  name: currentCategory?.name || '',
                  image: currentCategory?.image || '',
                  slug: currentCategory?.slug || '',
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="md:table-cell">Created at</TableHead>
                <TableHead className="md:table-cell">Products</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  setIsModalOpen={setIsModalOpen}
                  setCurrentCategory={setCurrentCategory}
                  setIsEditMode={setIsEditMode}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}

export default CategoriesPageComponent
