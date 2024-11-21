import { ReactNode } from 'react'

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return <>{children}</>
}

export default AdminLayout
