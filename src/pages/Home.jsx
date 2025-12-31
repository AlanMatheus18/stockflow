import React from 'react'
import Header from '../components/Header'
import { EstoqueCritico } from '../components/EstoqueCritico'
import {GiroEstoque} from '../components/GiroEstoque'
const Home = () => {
    return (
        <>
            <div className='bg-gradient-to-r from-[#1f2329] to-[#2b3036] min-h-screen'>
                <Header />
                <div className='flex items-center justify-center h-100 gap-3'>
                    <EstoqueCritico />
                    <GiroEstoque/>
                </div>
            </div>
        </>
    )
}

export default Home