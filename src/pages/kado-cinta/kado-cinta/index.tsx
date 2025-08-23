import { Button } from '@/components/ui/button'
import { getKadoCinta, getListUsers } from '@/services/api'
import type { KadoCinta, User } from '@/services/inteface'
import React, { useEffect, useState } from 'react'
import { SearchableUserSelect } from '@/components/SearchableSelect'
import CreateKadoCintaModal from './ModalCreateKado'

const KadoCintaPage: React.FC = () => {
    const [searchUser, setSearchUser] = useState('')
    const [userOptions, setUserOptions] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const [kadoCinta, setKadoCinta] = useState<KadoCinta[]>([])
    const [loading, setLoading] = useState(false)

    // Modal state
    const [openModal, setOpenModal] = useState(false)
    const [newKadoName, setNewKadoName] = useState('')
    const [newQuantity, setNewQuantity] = useState(1)

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchUser.length > 2) {
                fetchUsers(searchUser)
            }
        }, 500)
        return () => clearTimeout(delayDebounce)
    }, [searchUser])

    const fetchUsers = async (query: string) => {
        try {
            const res = await getListUsers(query)
            setUserOptions(res.data)
        } catch (err) {
            console.error('Gagal fetch users:', err)
        }
    }

    const fetchOrders = async (userId: number) => {
        setLoading(true)
        try {
            const res = await getKadoCinta(userId)
            setKadoCinta(res.data)
        } catch (err) {
            console.error('Gagal fetch order:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateKado = () => {
        if (!selectedUser) return
        console.log('Submit new kado cinta:', {
            userId: selectedUser.id,
            name: newKadoName,
            quantity: newQuantity,
        })
        // TODO: panggil API create kado cinta di sini

        setOpenModal(false)
        setNewKadoName('')
        setNewQuantity(1)
    }

    return (
        <main className="p-6 flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* User Select */}
                <h5 className="text-lg font-semibold mb-2">Pilih User</h5>
                <SearchableUserSelect
                    value={selectedUser}
                    users={userOptions}
                    onSearch={(q) => setSearchUser(q)}
                    onChange={(user) => {
                        setSelectedUser(user)
                        if (user) fetchOrders(user.id)
                    }}
                />

                {/* Order List */}
                {selectedUser ? (
                    loading ? (
                        <p className="mt-4 text-gray-500">Loading orders...</p>
                    ) : (
                        <div className="mt-10">
                            <h5 className="text-lg font-semibold mb-2">List Kado Cinta {selectedUser.name}</h5>
                            <div className="mt-2">
                                <Button variant="outline" onClick={() => setOpenModal(true)}>
                                    Buat Kado Cinta
                                </Button>
                            </div>
                            {/* Tambah Kado Cinta */}
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {kadoCinta.map((kado) => (
                                    <div key={kado.id} className="bg-gray-200 p-4 rounded-xl shadow flex flex-col justify-between hover:cursor-pointer hover:bg-gray-100">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {kado.kado_name} ({kado.product.product_header.name} - {kado.product.variant})
                                            </h3>
                                            <p className="text-sm text-gray-600">{kado.category_name}</p>
                                            <div className="flex gap-2 items-center">
                                                <p className="text-lg text-black mt-1">Rp {kado.final_price.toLocaleString()}</p>
                                                <span className="text-sm text-gray-500 mt-1 line-through">Rp {kado.product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <Button variant="outline" size="sm">
                                                Detail
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    <p className="mt-4 text-gray-500">Cari dan pilih user untuk melihat order.</p>
                )}
            </div>

            <CreateKadoCintaModal open={openModal} onOpenChange={setOpenModal} selectedUser={selectedUser} newKadoName={newKadoName} setNewKadoName={setNewKadoName} newQuantity={newQuantity} setNewQuantity={setNewQuantity} onSubmit={handleCreateKado} />
        </main>
    )
}

export default KadoCintaPage
