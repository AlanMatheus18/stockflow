import React, { useState } from 'react'
import { supabase } from "../supabaseClient" // Importe sua instância

import { PriceStockFields } from './PriceStockFields'

import ButtonCancel from './ButtonCancel'
import ButtonSave from './ButtonSave'

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
            if (onProductAdded) onProductAdded() // Função para atualizar a tabela
            onClose() // Fecha o formulário
        } catch (error) {
            alert("Erro ao cadastrar: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen p-4 md:p-10'>
            <form onSubmit={handleSubmit} className='max-w-4xl mx-auto bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-sm'>
                <div className='mb-8'>
                    <h1 className='text-2xl md:text-3xl font-bold text-white'>Novo Produto</h1>
                    <p className='text-zinc-500 text-sm'>Preencha as informações para cadastrar no estoque.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-zinc-400 text-sm ml-1'>Nome do Produto</label>
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" required
                            placeholder='Ex: Smartphone Samsung S24' 
                            className='bg-zinc-800/50 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all'
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
                            className='bg-zinc-800/50 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all'
                        />
                    </div>

                    {/* Certifique-se que o CategoryInput receba value e onChange internamente se possível, 
                        ou simplifique para um select/input comum para teste */}
                    <div className='md:col-span-1'>
                        <label className='text-zinc-400 text-sm ml-1'>Categoria</label>
                        <input 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Eletrônicos, Ferramentas..."
                            className='w-full bg-zinc-800/50 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all'
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
                            className='bg-zinc-800/50 border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-amber-500 transition-all'
                        />
                    </div>

                    <div className='flex flex-col gap-2 md:col-span-2'>
                        <label className='text-zinc-400 text-sm ml-1'>Descrição do Produto</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className='bg-zinc-800/50 border border-zinc-700 text-gray-200 p-3 rounded-xl outline-none focus:border-amber-500 transition-all'
                            placeholder="Detalhes sobre o item..."
                        ></textarea>
                    </div>

                    <div className='md:col-span-2'>
                        <PriceStockFields formData={formData} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-zinc-800">
                    <ButtonCancel onClick={onClose}/>
                    <ButtonSave isLoading={loading} />
                </div>
            </form>
        </div>
    )
}
