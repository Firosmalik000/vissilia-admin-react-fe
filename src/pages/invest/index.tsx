import DataTable from './DataTable';
import { ChartSection } from './ChartSection';
export type WithdrawalHistory = {
  id: string; // ID Transaksi
  date: string; // Tanggal
  time: string; // Waktu
  starCode: string; // Kode Bintang
  amount: number; // Nominal
};

const withdrawHistoryData: WithdrawalHistory[] = [
  {
    id: 'wdh12345',
    date: '08/09/2003',
    time: '23H,21M,34S',
    starCode: '1KMps',
    amount: 50000,
  },
  {
    id: 'wdh67890',
    date: '07/09/2003',
    time: '10H,00M,00S',
    starCode: '2KMps',
    amount: 120000,
  },
  {
    id: 'wdh11223',
    date: '06/09/2003',
    time: '15H,45M,00S',
    starCode: '3KMps',
    amount: 75000,
  },
  {
    id: 'wdh44556',
    date: '05/09/2003',
    time: '09H,10M,20S',
    starCode: '4KMps',
    amount: 25000,
  },
];

const Invest = () => {
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
                <span className="text-yellow-500 text-2xl mr-3">⭐</span>
                <div>
                  <p className="text-sm text-gray-500">Total Saldo Bintang</p>
                  <p className="text-xl font-bold text-gray-800">Rp 430.000.000</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                {/* <span className="text-gray-600 text-2xl mr-3">Rp</span> */}
                <div>
                  <p className="text-sm text-gray-500">Total Project Investasi</p>
                  <p className="text-xl font-bold text-gray-800">2</p>
                </div>
              </div>
            </div>
            <div>
              <ChartSection />
            </div>
            <DataTable label={'List Investasi'} data={withdrawHistoryData} />
            <DataTable label={'List Pengajuan Investasi'} data={withdrawHistoryData} />
          </div>
        </main>
      </>
    </div>
  );
};

export default Invest;
