import { createClient } from '@/supabase/server'
import { QueryData } from '@supabase/supabase-js'

const supabase = await createClient()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ordersWithProductsQuery = supabase
  .from('order')
  .select('*, order_items:order_item(*, product(*)), user(*)')
  .order('created_at', { ascending: false })

export type OrdersWithProducts = QueryData<typeof ordersWithProductsQuery>
