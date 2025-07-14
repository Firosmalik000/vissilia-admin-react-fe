import MainLayout from '@/fragment/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TableUser from './TableUser'; // Pastikan TableUser menerima prop 'role'

const User = () => {
  return (
    <MainLayout>
      <main className="flex-1 p-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="w-full">
            <Tabs defaultValue="user">
              <TabsList className=" w-full flex gap-2 justify-between bg-white">
                <div className="flex gap-2">
                  <TabsTrigger value="user">User</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Search" className="w-full border border-black rounded-md px-4 py-2" />
                  <div className="w-[50px] border border-gray-300 rounded-2xl"></div>
                </div>
              </TabsList>
              <TabsContent value="user" className="mt-4">
                <TableUser />
              </TabsContent>
              <TabsContent value="admin" className="mt-4">
                <div>afefeaf</div>{' '}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default User;
