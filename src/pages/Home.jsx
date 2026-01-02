import React from 'react'
import Header from '../components/Header'
import { EstoqueCritico } from '../components/EstoqueCritico'
import { GiroEstoque } from '../components/GiroEstoque'
import { UltimasMovimentacoes } from '../components/UltimasMovimentacoes'
import { BalancoMensal } from '../components/BalancoMensal'
import { ProdutosMaisVendidos } from '../components/ProdutosMaisVendidos'

const Home = () => {
    return (
        <>
            <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen'>
                <Header />
                {/* Alterações:
                    1. grid-cols-1: Uma coluna por padrão (celular)
                    2. md:grid-cols-2: Duas colunas em tablets
                    3. lg:grid-cols-3: Três colunas em telas grandes
                    4. max-w-7xl: Aumentei o limite de largura para aproveitar melhor telas grandes
                */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 md:p-10 max-w-7xl mx-auto'>
                    <EstoqueCritico />
                    <GiroEstoque />
                    <UltimasMovimentacoes />
                    <BalancoMensal />
                    <ProdutosMaisVendidos />
                </div>
            </div>
        </>
    )
}

export default Home