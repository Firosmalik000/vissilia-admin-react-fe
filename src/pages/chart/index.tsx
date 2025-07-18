import MainLayout from '@/fragment/MainLayout';
import DataTable from './DataTable';

const Chart = () => {
  return (
    <div>
      <MainLayout>
        <main className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
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
                  <p className="text-sm text-gray-500">Total Saldo Bintang</p>
                  <p className="text-xl font-bold text-gray-800">Rp 430.000.000</p>
                </div>
              </div>
            </div>

            <DataTable />
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default Chart;
