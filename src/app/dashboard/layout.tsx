import Navbar from "../components/Navbar"


function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default UserDashboardLayout;