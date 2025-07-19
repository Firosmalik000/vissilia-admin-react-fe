import DataTable from './DataTable';

const ProgramChart = () => {
  return (
    <div>
      <>
        <main className="p-6 flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Top row with cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <span className="text-green-600 text-2xl mr-3">Rp</span>
                <div>
                  <p className="text-sm text-gray-500">Withdraw Hari Ini</p>
                  <p className="text-xl font-bold text-gray-800">
                    Rp 15.300.000
                    <span className="text-sm font-normal text-gray-500">/ Rp200.000.000</span>
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
                  <p className="text-sm text-gray-500">Total Produk</p>
                  <p className="text-xl font-bold text-gray-800">35</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                <span className="text-yellow-500 text-2xl mr-3">⭐</span>
                <div>
                  <p className="text-sm text-gray-500">Total Customer</p>
                  <p className="text-xl font-bold text-gray-800">124</p>
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

              {/* Right List Pengajuan Withdraw (Not changed in this iteration) */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">10 Produk Terlaris</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produk
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Produk
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-font-medium text-gray-500 uppercase tracking-wider">
                        Total Pemasukan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Photo
                        <br />
                        PRoduk
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Nama Produk</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Total Pe</td>
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

            {/* Riwayat Withdraw Section (Now using Shadcn UI Table) */}
            <DataTable />
          </div>
        </main>
      </>
    </div>
  );
};

export default ProgramChart;
