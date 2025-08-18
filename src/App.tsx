import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Activity, Chart, Dashboard, EChart, Invest, Login, MainInvest, Marketing, Notification, Produk, ProgramChart, ProgramMarketing, ProgramProduk, User } from './pages'
import MainLayout from './fragment/MainLayout'
import ProtectedRoute from './route/protectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login.default />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Dashboard.default />} />
                            <Route path="invest" element={<MainInvest.default />} />
                            <Route path="approval/chart" element={<Chart.default />} />
                            <Route path="approval/invest" element={<Invest.default />} />
                            <Route path="e-commerce/chart" element={<EChart.default />} />
                            <Route path="e-commerce/produk" element={<Produk.default />} />
                            <Route path="e-commerce/marketing" element={<Marketing.default />} />
                            <Route path="program/program-chart" element={<ProgramChart.default />} />
                            <Route path="program/program-produk" element={<ProgramProduk.default />} />
                            <Route path="program/program-marketing" element={<ProgramMarketing.default />} />
                            <Route path="notification" element={<Notification.default />} />
                            <Route path="activity" element={<Activity.default />} />
                            <Route path="user" element={<User.default />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>

            <Toaster position="top-right" reverseOrder={false} />
        </>
    )
}

export default App
