import TableUser from './TableUser';
import { Button } from '@/components/ui/button';
import { ModalAddMember } from './ModalAddMember';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
type Mode = 'user' | 'admin';
const User = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>('user');
  const [search, setSearch] = useState<string>('');
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <main className="flex-1 p-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="w-full">
            <div className=" w-full flex gap-2 justify-between bg-white">
              <div className="flex gap-2">
                <Button type="button" onClick={() => setMode('user')}>
                  User
                </Button>
                <Button type="button" onClick={() => setMode('admin')}>
                  Admin
                </Button>
              </div>
              <div className="flex gap-3 items-center ">
                {/* Search Input */}
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <Input
                    type="text"
                    placeholder="Cari user..."
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 
                 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* Button */}
                <Button
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-5 py-2 rounded-lg 
               font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                  onClick={() => setIsOpen(true)}
                >
                  + Tambah User
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <TableUser mode={mode} search={search} />
            </div>
          </div>
        </div>
      </main>
      <ModalAddMember isOpen={isOpen} onOpenChange={setIsOpen} onCancel={handleClose} />
    </>
  );
};

export default User;
