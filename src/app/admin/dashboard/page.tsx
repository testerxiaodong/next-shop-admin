import { getMonthlyOrders } from '@/actions/orders'
import PageComponent from './page-component'
import { getCategoryData } from '@/actions/categories'
import { getLatestUsers } from '@/actions/auth'

const Dashboard = async () => {
  // const monthlyOrders = await getMonthlyOrders()
  // const categoryData = await getCategoryData()
  // const latestUsers = await getLatestUsers()
  const [monthlyOrders, categoryData, latestUsers] = await Promise.all([
    getMonthlyOrders(),
    getCategoryData(),
    getLatestUsers(),
  ])

  return (
    <PageComponent
      latestUsers={latestUsers}
      monthlyOrders={monthlyOrders}
      categoryData={categoryData}
    />
  )
}

export default Dashboard
