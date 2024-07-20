'use client'
import Image from 'next/image'
import logo from '@/app/images/logo.svg'
import { useEffect, useState } from 'react';
import { setError, signIn } from '@/app/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import MyVacancies from '@/components/myvacancies';
import { getMyVacancies } from '../store/slices/vacancySlice';
import Link from 'next/link';
import Header from '../../components/header/index'
export default function Vacancy() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getMyVacancies())
    }, [])
  return (
    <main>
        <Header/>
        <div className='container'>
            <div className='flex flex-ai-c flex-jc-sb ptb7'> 
                <h1>Мои Вакансии</h1>
                <Link className='button button-secondary-bordered' href='/create-vacancy'>Создать вакансию </Link>
            </div>

            <MyVacancies/>

        </div>



    </main>
  );
}
