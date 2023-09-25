import Navbar from "../components/Navbar"


function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-5xl m-auto">
            <Navbar/>
            {children} 
        </div>
    )
}

export default UserDashboardLayout;