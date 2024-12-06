'use client'

import { FC, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ProductsWithCategoriesResponse } from '@/app/admin/products/products.types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Category } from '@/app/admin/categories/categories.types'
import { CreateOrUpdateProductSchema } from '@/app/admin/products/schema'
import { deleteProduct } from '@/actions/products'
import { ProductForm } from '@/app/admin/products/product-dialog-form'
import { ProductTableRow } from '@/app/admin/products/product-table-row'
import { useRouter } from 'next/navigation'

type Props = {
  categories: Category[]
  productsWithCategories: ProductsWithCategoriesResponse
}

export const ProductPageComponent: FC<Props> = ({
  categories,
  productsWithCategories,
}) => {
  // 用于存储当前选择的产品
  const [currentProduct, setCurrentProduct] =
    useState<CreateOrUpdateProductSchema | null>(null)
  // 用于控制产品模态框的打开/关闭
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  // 用于控制当前模式
  const [isEditMode, setIsEditMode] = useState(false)
  // 用于控制删除产品模态框的打开/关闭
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // 处理产品的删除
  const router = useRouter()
  const deleteProductHandler = async () => {
    if (currentProduct?.slug) {
      await deleteProduct(currentProduct.slug)
      router.refresh()
      toast.success('Product deleted successfully', {
        position: 'top-right',
      })
      setIsDeleteModalOpen(false)
      setCurrentProduct(null)
    }
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="container mx-auto p-4">
        {/* 头部以及添加产品按钮 */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <Button
            onClick={() => {
              // 清空当前选择的产品
              setCurrentProduct(null)
              // 设置为新增模式
              setIsEditMode(false)
              // 打开产品模态框
              setIsProductModalOpen(true)
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        {/* 产品列表 */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Max Quantity</TableHead>
              <TableHead>Hero Image</TableHead>
              <TableHead>Product Images</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* 列表内容 */}
          <TableBody>
            {productsWithCategories.map((product) => (
              <ProductTableRow
                setIsEditMode={setIsEditMode}
                setIsProductModalOpen={setIsProductModalOpen}
                key={product.id}
                product={product}
                setCurrentProduct={setCurrentProduct}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </TableBody>
        </Table>
        {/* Product Modal */}
        <ProductForm
          categories={categories}
          isProductModalOpen={isProductModalOpen}
          isEditMode={isEditMode}
          setIsProductModalOpen={setIsProductModalOpen}
          defaultValues={currentProduct}
        />
        {/* Delete Product Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onOpenChange={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                <span className="sr-only">
                  Are you sure you want to delete this product?
                </span>
              </DialogDescription>
            </DialogHeader>
            <p>Are you sure you want to delete {currentProduct?.title}</p>
            <DialogFooter>
              <Button variant="destructive" onClick={deleteProductHandler}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
