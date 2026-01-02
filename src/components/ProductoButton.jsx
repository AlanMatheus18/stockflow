import React, { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io"
import { AddProductForm } from './AddProductForm'

export function ProductoButton({ onProductAdded }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='w-full flex justify-end px-2 sm:px-0'>
        <button
          onClick={() => setOpen(true)}
          className='flex items-center justify-center gap-2 mb-5 bg-blue-600 hover:bg-blue-500 h-11 md:h-10 w-full sm:w-auto sm:min-w-[150px] px-4 text-white font-semibold rounded-xl md:rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20'
        >
          <IoIosAddCircleOutline className="text-xl" />
          <span className='text-sm md:text-base'>Novo Produto</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto flex items-center justify-center p-4">
          <AddProductForm 
            onClose={() => setOpen(false)} 
            onProductAdded={onProductAdded} 
          />
        </div>
      )}
    </>
  )
}