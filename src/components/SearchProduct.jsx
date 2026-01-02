import React from 'react'
import { ProductoButton } from './ProductoButton'
import { IoSearch } from "react-icons/io5"

const SearchProduct = ({ onProductAdded }) => {
    return (
        <div className="flex flex-col items-start w-full max-w-3xl">
            {/* O botão azul agora está aqui e controla o Popup sozinho */}
            <ProductoButton onProductAdded={onProductAdded} />
            
            <div className="relative w-full">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="search"
                    placeholder="Search"
                    className="bg-zinc-800/50 border border-gray-500 text-white w-full pl-10 pr-2 py-2 rounded-md outline-none focus:border-amber-500 transition-colors"
                />
            </div>
        </div>
    )
}

export default SearchProduct