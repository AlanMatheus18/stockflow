import React, { useRef } from 'react'
import Header from '../components/Header'
import SearchProduct from '../components/SearchProduct'
import { ProductTable } from '../components/ProductTable'

const Products = () => {
    const tableRef = useRef()

    const handleProductAdded = () => {
        // Se a tabela tiver uma função fetchProducts exposta via forwardRef, ela atualiza aqui
        if (tableRef.current && tableRef.current.fetchProducts) {
            tableRef.current.fetchProducts()
        }
    }

    return (
        <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen flex flex-col'>
            <Header />
            
            <div className='p-6 flex flex-col items-center'>
                {/* Unificamos tudo aqui: busca + botão de adicionar */}
                <SearchProduct onProductAdded={handleProductAdded} />
            </div>

            <div className="p-4 md:p-10 pt-0">
                <ProductTable ref={tableRef} />
            </div>
        </div>
    )
}

export default Products