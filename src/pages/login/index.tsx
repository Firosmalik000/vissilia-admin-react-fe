import { useState } from 'react'
import { login } from '@/services/api'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { handleApiError } from '../utils/handleApiError'

const Login = () => {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getFingerprint = async (): Promise<string> => {
        const fp = await FingerprintJS.load()
        const result = await fp.get()
        return result.visitorId
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const device_id = await getFingerprint()
        try {
            const res = await login({ identifier, password, device_id })
            localStorage.setItem('token', res.token)
            window.location.href = '/'
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Selamat Datang!</h2>
                <p className="text-center text-gray-600 mb-8">Silakan masuk ke akun Anda</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input type="text" id="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="********" />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-200 hover:to-indigo-200 hover:text-blue-700 transition-all duration-500 disabled:opacity-50">
                        {loading ? 'Loading...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
