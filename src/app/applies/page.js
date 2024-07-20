'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getEmployeeApplies } from '../store/slices/applySlice';
import Link from 'next/link';
import MyApplies from '@/components/MyApplies';
import Header from '../../components/header/index'
export default function Applies() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getEmployeeApplies())
    }, [])

return(
    <main>
        <Header/>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb ptb7'> 
                <h1>Отклики и приглашение</h1>
            </div>
        <MyApplies/>

        </div>



    </main>
  );
}
