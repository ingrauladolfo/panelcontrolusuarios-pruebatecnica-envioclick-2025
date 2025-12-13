import { Outlet } from "react-router"
import "@/common/styles/pages/Dashboard/index.css"
import { Navbar } from "@/common/components"
export const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div >
    )
}
