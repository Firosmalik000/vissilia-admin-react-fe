import { useState } from 'react';
import { login } from '@/services/api';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { handleApiError } from '../utils/handleApiError';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getFingerprint = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const device_id = await getFingerprint();
    try {
      const res = await login({ identifier, password, device_id });
      localStorage.setItem('token', res.token);
      window.location.href = '/';
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center mb-3 text-white drop-shadow-lg">Login</h2>
        <p className="text-center text-white/80 mb-8">Silakan masuk ke akun anda</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-white font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70 placeholder-gray-500"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/70 placeholder-gray-500"
              placeholder="********"
            />
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md disabled:opacity-50">
            {loading ? 'Loading...' : 'Daftar'}
          </button>
        </form>

        {/* Link ke login */}
        <p className="mt-6 text-center text-white/80">
          Belum punya akun?
          <a href="/register" className="text-yellow-300 font-semibold hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
