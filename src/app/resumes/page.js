'use client'

import Header from '../../components/header/index'
import { useEffect } from 'react';
import MyResumes from '@/components/myresumes';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumes } from '../store/slices/resumeSlice'
import Link from 'next/link';

export default function ResumePage() {
    const dispatch = useDispatch()
    const resumes = useSelector((state)=> state.resume.resumes)
    console.log(resumes);
    const didMount  = ()=>{
      dispatch(getMyResumes())

    }
    useEffect(didMount, [])
  return (
    <main>
      <Header/>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'> 
        <h1>Мои резюме</h1>
        <Link className='button button-secondary-bordered' href='/create-resume'>Создать резюме </Link>
        </div>
        <MyResumes resumes ={resumes}/>

      </div>

    </main>
  );
}
