import { getCategoriesWithProducts } from '@/actions/categories'
import { getProductsWithCategories } from '@/actions/products'
import { ProductPageComponent } from '@/app/admin/products/page-component'

export default async function Products() {
  // const categories = await getCategoriesWithProducts()
  // const productsWithCategories = await getProductsWithCategories()
  const [categories, productsWithCategories] = await Promise.all([
    getCategoriesWithProducts(),
    getProductsWithCategories(),
  ])

  return (
    <ProductPageComponent
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  )
}
