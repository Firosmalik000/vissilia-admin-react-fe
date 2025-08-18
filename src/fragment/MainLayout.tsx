import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'

const MainLayout = () => {
    const { user, token, fetchUserData } = useUserStore()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            await fetchUserData()
            setLoading(false)
        }
        init()
    }, [fetchUserData])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading...</p>
            </div>
        )
    }

    if (!user || !token) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
