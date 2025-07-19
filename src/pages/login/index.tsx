const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Selamat Datang!</h2>
        <p className="text-center text-gray-600 mb-8">Silakan masuk ke akun Anda</p>

        <form>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" placeholder="nama@email.com" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" placeholder="********" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2" />
              Ingat saya
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Lupa Password?
            </a>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-200 hover:to-indigo-200 hover:text-blue-700  transition-all duration-500   ">
            Masuk
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-8">
          Belum punya akun?{' '}
          <a href="#" className="text-blue-600 hover:underline font-semibold">
            Daftar Sekarang
          </a>
        </p>

        <div className="relative flex items-center justify-center w-full mt-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">Atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button className="flex items-center justify-center p-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm hover:shadow-md">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" className="h-5 w-5 mr-2" />
            <span className="sr-only">Masuk dengan Google</span>
          </button>
          <button className="flex items-center justify-center p-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm hover:shadow-md">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Facebook_icon_%282018%29.svg" alt="Facebook" className="h-5 w-5 mr-2" />
            <span className="sr-only">Masuk dengan Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
