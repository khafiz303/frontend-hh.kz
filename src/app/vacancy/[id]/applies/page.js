'use client'
import Image from 'next/image'
import logo from '@/app/images/logo.svg'
import { useEffect, useState } from 'react';
import { setError, signIn } from '@/app/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import MyVacancies from '@/components/myvacancies';
import Link from 'next/link';
import Header from '@/components/header';
import { useParams } from 'next/navigation';
import { getVacancyApplies } from '@/app/store/slices/applySlice';
import Applies from '@/components/VacancyApplies';
import ProtectedRoute from '@/components/ProtectedRoute';
export default function VacancyApplies() {
    const [status , setStatus]= useState('NEW')
    const {id} = useParams()
    const applies = useSelector((state)=> state.apply.applies)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getVacancyApplies(id))
    }, [])
    const filteredItems = applies.filter(item => item.status == status)

  return (
    <ProtectedRoute>
    <main>
        <Header/>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb ptb7'> 
                <h1>Отклики {applies.length}</h1>
            </div>
            <div className='flex flex-jc-sb'>
                <div className='list'>
                    <div className={`list-item${status === 'NEW'?" active":''}`} onClick={()=> setStatus('NEW')}>Все неразобранные</div>
                    <div className={`list-item${status === 'INVITATION'?" active":''}`}onClick={()=> setStatus('INVITATION')}>Приглашенные</div>
                    <div className={`list-item${status === 'DECLINED'?" active":''}`}onClick={()=> setStatus('DECLINED')}>Отказы</div>
                </div>
                    <Applies applies={filteredItems}/>
            
            </div>
           
          

        </div>



    </main>
    </ProtectedRoute>
  );
}
