import { Button } from '@/components/ui/button'
import { deleteCategoryKadoCinta, getCategoryKadoCinta, releaseCategoryKadoCinta, updateCategoryKadoCinta } from '@/services/api'
import type { KadoCintaCategory } from '@/services/inteface'
import React, { useEffect, useState } from 'react'
import { ModalCategoryKadoCinta } from './ModalUpdate'
import { ConfirmDialog } from '@/components/ConfirmDialog'

const CategoryKadoCinta: React.FC = () => {
    const [categories, setCategories] = useState<KadoCintaCategory[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<KadoCintaCategory | null>(null)

    const fetchCategories = async (loading = true) => {
        if (loading) setLoading(true)
        try {
            const res = await getCategoryKadoCinta()
            setCategories(res.data)
        } catch (err) {
            console.error('Gagal fetch category:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (id: number, newName: string) => {
        if (!newName) return
        try {
            await updateCategoryKadoCinta(id, newName)
            setIsModalOpen(false)
            fetchCategories(false)
        } catch (err) {
            console.error('Gagal update nama:', err)
        }
    }

    const handleRelease = async (id: number) => {
        try {
            await releaseCategoryKadoCinta(id)
            setIsReleaseModalOpen(false)
            fetchCategories(false)
        } catch (err) {
            console.error('Gagal release kategori:', err)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await deleteCategoryKadoCinta(id)
            setIsDeleteModalOpen(false)
            fetchCategories(false)
        } catch (err) {
            console.error('Gagal release kategori:', err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">List Kategori</h2>
            {loading ? (
                <p>Loading...</p>
            ) : categories.length === 0 ? (
                <p className="text-gray-500">Belum ada kategori</p>
            ) : (
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3 border-b">Nama</th>
                            <th className="px-4 py-3 border-b">Status</th>
                            <th className="px-4 py-3 border-b text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 border-b">{cat.name}</td>
                                <td className="px-4 py-3 border-b">{cat.is_release ? <span className="px-4 py-1 text-xs bg-green-100 text-green-700 rounded-full">Aktif</span> : <span className="px-4 py-1 text-xs bg-red-100 text-red-700 rounded-full">Nonaktif</span>}</td>
                                <td className="px-4 py-3 border-b text-right flex gap-2 justify-end">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCategory(cat)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-yellow-600"
                                        onClick={() => {
                                            setSelectedCategory(cat)
                                            setIsReleaseModalOpen(true)
                                        }}
                                        disabled={cat.is_release}
                                    >
                                        Release
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600"
                                        onClick={() => {
                                            setSelectedCategory(cat)
                                            setIsDeleteModalOpen(true)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Modal Update */}
            <ModalCategoryKadoCinta
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                category={selectedCategory}
                onSubmit={(categoryName, id) => {
                    handleUpdate(id, categoryName)
                }}
            />
            <ConfirmDialog open={isReleaseModalOpen} onOpenChange={setIsReleaseModalOpen} title="Konfirmasi Release" description={`Apakah Anda yakin ingin release kategori "${selectedCategory?.name}" ke produksi?`} confirmText="Release" cancelText="Batal" onConfirm={() => selectedCategory && handleRelease(selectedCategory.id)} />
            <ConfirmDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} title="Konfirmasi Delete" description={`Apakah Anda yakin ingin menghapus kategori "${selectedCategory?.name}"?`} confirmText="Delete" cancelText="Batal" onConfirm={() => selectedCategory && handleDelete(selectedCategory.id)} />
        </div>
    )
}

export default CategoryKadoCinta
