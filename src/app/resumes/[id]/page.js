'use client'

import Header from '@/components/header/index'
import { useEffect } from 'react';
import { getResumeById } from '@/app/store/slices/resumeSlice';
import Link from 'next/link';
import { useDispatch , useSelector} from 'react-redux';
import { useParams } from 'next/navigation';
import { getAgeFromBirthday , months , months1 } from '@/app/utils/format';

export default function ResumePage() {
  const dispatch = useDispatch()
  const {id} = useParams() 
  const resume = useSelector(state=>state.resume.resume)
  const didMount = ()=>{
    dispatch(getResumeById(id))
  }
  useEffect(didMount,[])

 
  const age = getAgeFromBirthday(resume.birthday)
  const birthday = new Date(resume.birthday)
  const showPhone = phone =>{
    let res = ''
    if(phone[0] === '8'){
        phone= '+7' + phone.slice(1 , phone.length)
    }
    res = `${phone.slice(0, 2)} (${phone.slice(2, 5)}) ${phone.slice(5,8)}-${phone.slice(8 , 10)}-${phone.slice(10 ,12)}`
    return res
  }

  let skills = []
  if(resume.skills) skills = resume.skills.split(',')
  return (
    <main>
      <Header/>
      <div className='container'>
        <div className='flex flex-ai-c flex-jc-sb ptb7'> 
        <Link href='/resumes' className='link'>К списку резюме</Link>
        <Link className='button button-secondary-bordered' href={`/edit-resume/${resume.id}`}>Редактировать</Link>
        </div>
        <h1>{resume.first_name} {resume.last_name}</h1>
        <p>{resume.gender} {age} лет, родился {birthday.getDate()} {months[birthday.getMonth()]} {birthday.getFullYear()}</p>
        <p className='secondary'>Контакты</p>
        <p>{resume.phone && showPhone(resume.phone)}</p>
        <p>{resume.email}</p>
        <p>Место проживание: {resume.city && resume.city.name}</p>
        <div className='flex flex-jc-sb'>
            <div>
                <h1>{resume.position}</h1>
                <p>Занятость: {resume.employmentTypes && resume.employmentTypes.map(et =>(`${et.name} `))}</p>
            </div>
            <div>
                <h1>{resume.salary} {resume.salary_type}</h1>
            </div>

        </div>
      
        <h3>Опыт работы</h3>

        {resume.workingHistory  && resume.workingHistory.map(job=>{
            let start = new Date(job.start_date)
            let end = new Date(job.end_date)
            return(
                <div key={job.id} className='flex working-history'>
                <div className='working-history-date'>
                    {months1[start.getMonth()]} {start.getFullYear()} - {months[end.getMonth()]} {end.getFullYear()}
                </div>
                <div  className='working-history-info'>
                    <h4>{job.company_name}</h4>
                    <h4>{job.company_description}</h4>
                    <p>{job.responsibilities}</p>
                </div>
            </div>
            )
            
        })}

        <h3>Ключевые навыки</h3>
        {skills.map(skil=>(<span key={skil.id} className='tag mr4'>{skil}</span>))}

        <h3>Обо мне</h3>
        <p>{resume.about}</p>

        <h3>Высшее оброзование</h3>
        {resume.education  && resume.education.map(ed=>{
            let end = new Date(ed.end_date)
            return(
                <div key={ed.id} className='flex working-history'>
                <div className='working-history-date'>
                    {end.getFullYear()}
                </div>
                <div  className='working-history-info'>
                    <h4>{ed.university_name}</h4>
                    <p>{ed.major}</p>
                </div>
            </div>
            )
            
        })}

        <h3>Знание языков</h3>
        {resume.foreignLanguages && resume.foreignLanguages.map(fl=>(<p key={fl.id} className='tag mr4'>{fl.name}-{fl.level}</p>))}
      
      <h3>Гражданство</h3>
      <p>{resume.citizhenshipObj && resume.citizhenshipObj.name}</p>
      </div>

    </main>
  );
}
