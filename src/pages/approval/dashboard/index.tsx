import MainLayout from '@/fragment/MainLayout';

const Dashboard = () => {
  return (
    <div>
      <MainLayout>
        <main className="p-6 flex-1">
          {/* Your main dashboard content would go here */}
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          {/* Placeholder for the main content from your image */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Top row with cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <span className="text-green-600 text-2xl mr-3">Rp</span>
                <div>
                  <p className="text-sm text-gray-500">Withdraw Hari Ini</p>
                  <p className="text-xl font-bold text-gray-800">
                    Rp 15.300.000<span className="text-sm font-normal text-gray-500">/ Rp200.000.000</span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <span className="text-gray-600 text-2xl mr-3">Rp</span>
                <div>
                  <p className="text-sm text-gray-500">Total Withdraw</p>
                  <p className="text-xl font-bold text-gray-800">Rp 80.773.000</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <span className="text-yellow-500 text-2xl mr-3">⭐</span>
                <div>
                  <p className="text-sm text-gray-500">Total Saldo Bintang</p>
                  <p className="text-xl font-bold text-gray-800">Rp 430.000.000</p>
                </div>
              </div>
            </div>

            {/* Charts and Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Chart Area */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Withdrawal Overview</h3>
                  <select className="border border-gray-300 rounded-md p-1 text-sm">
                    <option>Tahun 2025</option>
                  </select>
                </div>
                {/* Placeholder for chart */}
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                  <p>Chart Goes Here</p>
                  {/* For a real application, you'd integrate a charting library like Recharts or Chart.js */}
                  {/* The small box on the graph can be a tooltip or an annotation. */}
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>Mei</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Agu</span>
                  <span>Sep</span>
                  <span>Okt</span>
                  <span>Nov</span>
                  <span>Des</span>
                </div>
              </div>

              {/* Right List Pengajuan Withdraw */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">List Pengajuan Withdraw</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nominal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        08/09/24
                        <br />
                        10H,08M,24S
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp200.000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Proses</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        04/09/24
                        <br />
                        10H,08M,24S
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp50.000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Selesai</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        01/09/24
                        <br />
                        10H,08M,24S
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp1.200.000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Dibatalkan</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">Rincian</button>
                </div>
              </div>
            </div>

            {/* Riwayat Withdraw Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Riwayat Withdraw</h3>
                <button className="text-blue-600 hover:underline text-sm">Download Excel</button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <input type="text" placeholder="Cari berdasarkan nama, id, ..." className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM5 9h14l-1 7H6L5 9zM4 21h16"></path>
                  </svg>
                </button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Transaksi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode Bintang
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nominal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bukti Pembayaran
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      08/09/2003
                      <br />
                      23H,21M,34S
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">234dfseh</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1KMps</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp50.000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:underline">Lihat</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default Dashboard;
