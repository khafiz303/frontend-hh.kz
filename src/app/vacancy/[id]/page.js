'use client'

import Header from '@/components/header/index'
import { useEffect, useState } from 'react';
import { getVacancyById } from '@/app/store/slices/vacancySlice';
import Link from 'next/link';
import { useDispatch , useSelector} from 'react-redux';
import { useParams } from 'next/navigation';
import { getMyResumes } from '@/app/store/slices/resumeSlice';
import {createApply, getEmployeeApplies , getVacancyApplies } from '@/app/store/slices/applySlice';
export default function VacancyPage() {
  const dispatch = useDispatch()
  const {id} = useParams() 
  const vacancy = useSelector(state=>state.vacancy.vacancy)
  const currentUser = useSelector(state=>state.auth.currentUser)
  const resumes = useSelector((state)=> state.resume.resumes)
  const applies = useSelector((state)=> state.apply.applies)
  const [resumeId , setResume] = useState()

  useEffect(()=>{
    if(resumes[0]){
      setResume(resumes[0].id)
    }
  }, [resumes])


  console.log('my resume',resumes);
  const didMount = ()=>{
    dispatch(getVacancyById(id))

   
 
  }
  useEffect(didMount,[])
  

  useEffect(()=>{
    if(currentUser && currentUser.role.name === 'employee'){
      dispatch(getMyResumes())
      dispatch(getEmployeeApplies())
    }else if(currentUser){
      dispatch(getVacancyApplies(id))
    }
  } , [currentUser])


  const handleApply =()=>{
    dispatch(createApply({
      resumeId,
      vacancyId : id
  }))
  }

  let isApplied = applies.some(item => item.vacancyId == id)
  console.log('someApply',isApplied);
  console.log(applies , 'appliesAll');
  let skills = []
  if(vacancy.skills) skills = vacancy.skills.split(',')
  return (
    <main>
      <Header/>
      <div className='container'>
        {currentUser && currentUser?.id === vacancy.userId && <div className='flex flex-ai-c flex-jc-sb ptb7'> 
        <Link className='button button-secondary-bordered' href={`/edit-vacancy/${vacancy.id}`}>Редактировать</Link>
        </div>}
        <div className='card mt7'>
           {currentUser && currentUser?.id === vacancy.userId &&<Link className='link' href={`/vacancy/${id}/applies`}>{applies.length} соискателей</Link>}  
            <h1>{vacancy.name}</h1>
            <p> { vacancy.salary_from &&  `от ${vacancy.salary_from } `} {vacancy.salary_to && `до ${vacancy.salary_to}`} {vacancy.salary_type}</p>
            {vacancy.experience && <p>Требуемый опыт работы {vacancy.experience.duration}</p>}
            {vacancy.employmentType && <p>Тип занятости {vacancy.employmentType.name}</p>}
            {
              currentUser && currentUser.role.name === 'employee' && (
                <select className='input mtb4' value={resumeId} onChange={(e)=> setResume(e.target.value)}>
                  {resumes && resumes.map(item => (
                    <option key={item.id} value={item.id}>{item.position}</option>
                  ))}
                </select>
              )
            }



            {currentUser &&  currentUser?.id != vacancy.userId && !isApplied && <button className='button button-primary' onClick={handleApply}>Откликнуться</button>}
            {currentUser &&  currentUser?.id != vacancy.userId && isApplied && <Link className='button button-primary' href={'/applies'} style={{ width: '30%' }} >Смотреть отклик</Link>}
        </div>

        {vacancy.company && <p className='secondary mt7'><b>{vacancy.company.name}</b></p>}
        {vacancy.company && <div>{vacancy.company.description} </div>}
        <p className='secondary' dangerouslySetInnerHTML={{ __html: vacancy.description }} />
        <p className='secondary'>{vacancy.address}</p>

        <h3 className='mt7'>Ключевые навыки</h3>
        {skills.map(skil=>(<span key={skil.id} className='tag mr4'>{skil}</span>))}
    
      </div>``

    </main>
  );
}
