import { useCategoryForm } from '@/hooks/useCategoryForm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Props = {
  defaultValues?: CreateCategorySchema
  onClose: () => void
}

export const CategoryForm = ({ defaultValues, onClose }: Props) => {
  const { form, handleSubmit } = useCategoryForm(defaultValues)

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Input
        {...form.register('name')}
        placeholder="Category Name"
        disabled={form.formState.isSubmitting}
      />
      <Input
        type="file"
        {...form.register('image')}
        disabled={form.formState.isSubmitting}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {defaultValues ? 'Update Category' : 'Create Category'}
      </Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </form>
  )
}
