import { Dispatch, SetStateAction } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { ProductWithCategory } from '@/app/admin/products/products.types'
import { CreateOrUpdateProductSchema } from '@/app/admin/products/schema'

type Props = {
  product: ProductWithCategory
  setIsEditMode: Dispatch<SetStateAction<boolean>>
  setIsProductModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentProduct: Dispatch<
    SetStateAction<CreateOrUpdateProductSchema | null>
  >
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ProductTableRow = ({
  product,
  setIsEditMode,
  setIsProductModalOpen,
  setCurrentProduct,
  setIsDeleteModalOpen,
}: Props) => {
  const handleEditClick = (product: CreateOrUpdateProductSchema) => {
    setCurrentProduct({
      title: product.title,
      category: product.category,
      price: product.price,
      maxQuantity: product.maxQuantity,
      heroImage: product.heroImage,
      // 处理 images 确保类型匹配
      images:
        product.images && product.images.length > 0
          ? [product.images[0], ...product.images.slice(1)]
          : ['placeholder'],
      slug: product.slug,
    })
    setIsEditMode(true)
    setIsProductModalOpen(true)
  }

  return (
    <TableRow key={product.id}>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.maxQuantity}</TableCell>
      <TableCell>
        {product.heroImage && (
          <Image
            width={40}
            height={40}
            src={product.heroImage}
            alt="Hero"
            className="w-10 h-10 object-cover"
          />
        )}
      </TableCell>
      <TableCell>
        {product.imagesUrl.map((url, index) => (
          <Image
            width={40}
            height={40}
            key={index}
            src={url}
            alt={`Product ${index + 1}`}
            className="w-10 h-10 object-cover inline-block mr-1"
          />
        ))}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleEditClick({
              title: product.title,
              category: product.category.id.toString(),
              price: product.price,
              maxQuantity: product.maxQuantity,
              heroImage: product.heroImage,
              images:
                product.imagesUrl.length > 0
                  ? [product.imagesUrl[0], ...product.imagesUrl.slice(1)]
                  : ['placeholder'],
              slug: product.slug,
            })
          }
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setCurrentProduct({
              title: product.title,
              category: product.category.id.toString(),
              price: product.price,
              maxQuantity: product.maxQuantity,
              heroImage: product.heroImage,
              // 确保 images 至少有一个元素
              images:
                product.imagesUrl.length > 0
                  ? [product.imagesUrl[0], ...product.imagesUrl.slice(1)]
                  : ['placeholder'], // 确保 images 类型,
              slug: product.slug,
            })
            setIsDeleteModalOpen(true)
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
