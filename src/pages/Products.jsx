import React, { useRef } from 'react'
import Header from '../components/Header'
import SearchProduct from '../components/SearchProduct'
import { ProductTable } from '../components/ProductTable'

const Products = () => {
    const tableRef = useRef()

    // Função para quando um produto é adicionado/editado/excluído
    const handleProductAdded = () => {
        if (tableRef.current && tableRef.current.fetchProducts) {
            tableRef.current.fetchProducts()
        }
    }

    // NOVA FUNÇÃO: Recebe o texto da busca e avisa a tabela
    const handleSearch = (searchTerm) => {
        if (tableRef.current && tableRef.current.fetchProducts) {
            // Chamamos a função da tabela passando o termo de busca
            tableRef.current.fetchProducts(searchTerm)
        }
    }

    return (
        <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen flex flex-col'>
            <Header />
            
            <div className='p-6 flex flex-col items-center'>
                {/* Adicionamos a prop onSearch aqui */}
                <SearchProduct 
                    onProductAdded={handleProductAdded} 
                    onSearch={handleSearch} 
                />
            </div>

            <div className="p-4 md:p-10 pt-0">
                <ProductTable ref={tableRef} />
            </div>
        </div>
    )
}

export default Products