import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="">
        <div className="container mx-auto">
            <Outlet />
        </div>
    </div>
  )
}
