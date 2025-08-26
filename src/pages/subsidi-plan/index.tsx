import DataTable from './DataTable';

const index = () => {
  return (
    <div>
      <>
        <main className="p-6 flex-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DataTable label={'List Subsidi Plan'} />
          </div>
        </main>
      </>
    </div>
  );
};

export default index;
