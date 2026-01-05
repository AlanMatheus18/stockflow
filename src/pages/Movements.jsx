import React, { useRef } from 'react' // Importe o useRef
import Header from '../components/Header'
import ProductEntry from '../components/ProductEntry'
import { MovementTable } from '../components/MovementTable' // Verifique se é export const ou default

const Movements = () => {
  // Criamos a "ponte"
  const tableRef = useRef();

  // Função que avisa a tabela para atualizar
  const handleRefresh = () => {
    if (tableRef.current && tableRef.current.fetchMovements) {
      tableRef.current.fetchMovements();
    }
  };

  return (
    <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen'>
      <Header />
      
      <div className='p-6 flex flex-col items-center gap-8'>
          {/* 1. Passamos a função de atualização para o formulário */}
          <ProductEntry onMovementRegistered={handleRefresh} />
          
          <div className='w-full max-w-6xl'>
             {/* 2. Conectamos a ref à tabela */}
             <MovementTable ref={tableRef} />
          </div>
      </div>
    </div>
  )
}

export default Movements