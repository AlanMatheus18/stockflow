import React, { useState } from 'react'
import { supabase } from "../supabaseClient"
import { PriceStockFields } from './PriceStockFields'
import ButtonCancel from './ButtonCancel'
import ButtonSave from './ButtonSave'
import {CategoryInput} from './CategoryInput';

export const AddProductForm = ({ onClose, onProductAdded }) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category: '',
        supplier: '',
        description: '',
        costPrice: '',
        sellPrice: '',
        currentStock: '',
        minStock: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('products')
                .insert([{
                    name: formData.name,
                    sku: formData.sku,
                    category: formData.category,
                    supplier: formData.supplier,
                    description: formData.description,
                    cost_price: parseFloat(formData.costPrice),
                    sale_price: parseFloat(formData.sellPrice),
                    quantity: parseInt(formData.currentStock),
                    min_stock: parseInt(formData.minStock),
                }])
                

            if (error) throw error

            alert("Produto cadastrado com sucesso!")
            if (onProductAdded) onProductAdded()
            onClose()
        } catch (error) {
            alert("Erro ao cadastrar: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    

    return (
        /* ALTERAÇÃO CHAVE: 
           - 'fixed inset-0': Fixa o modal na tela toda.
           - 'z-50': Garante que fique acima de tudo.
           - 'bg-black/60': Escurece o fundo (backdrop).
           - 'overflow-y-auto': Permite rolar o formulário se a tela for pequena.
        */
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto'>

            {/* O formulário agora tem uma largura máxima e fundo sólido */}
            <form
                onSubmit={handleSubmit}
                className='relative w-full max-w-4xl bg-[#1f2329] border border-zinc-800 p-6 md:p-10 rounded-2xl shadow-2xl my-auto'
            >
                <div className='mb-8'>
                    <h1 className='text-2xl md:text-3xl font-bold text-white'>Novo Produto</h1>
                    <p className='text-zinc-500 text-sm'>Preencha as informações para cadastrar no estoque.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-zinc-400 text-sm ml-1'>Nome do Produto</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" required
                            placeholder='Ex: Smartphone Samsung S24'
                            className='w-full bg-zinc-800/40 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-zinc-600'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-zinc-400 text-sm ml-1'>SKU (Código Único)</label>
                        <input
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            type="text" required
                            placeholder='Ex: CEL-SAM-S24'
                            className='w-full bg-zinc-800/40 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-zinc-600'
                        />
                    </div>

                    {/* Substituindo o input de categoria antigo pelo novo de Tags */}
                    <div className='md:col-span-1'>
                        <CategoryInput
                            tags={formData.category ? formData.category.split(', ') : []}
                            setTags={(newTags) => setFormData(prev => ({
                                ...prev,
                                category: newTags.join(', ')
                            }))}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-zinc-400 text-sm ml-1'>Fornecedor</label>
                        <input
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            type="text"
                            placeholder='Nome do Fornecedor'
                            className='w-full bg-zinc-800/40 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-zinc-600'
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-zinc-400 text-sm ml-1'>Descrição do Produto</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className='w-full bg-zinc-800/40 border border-zinc-700 text-zinc-200 p-3 rounded-xl outline-none focus:border-amber-500 transition-all placeholder:text-zinc-600 resize-none'
                            placeholder="Detalhes sobre o item..."
                        ></textarea>
                    </div>

                    <div className='md:col-span-2'>
                        <PriceStockFields formData={formData} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-zinc-800/50">
                    <div className='w-full sm:w-auto'>
                        <ButtonCancel onClick={onClose} />
                    </div>
                    <div className='w-full sm:w-auto'>
                        <ButtonSave isLoading={loading} />
                    </div>
                </div>
            </form>
        </div>
    )
}