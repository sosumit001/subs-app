import Navbar from "../../components/Navbar"


function productsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default productsLayout