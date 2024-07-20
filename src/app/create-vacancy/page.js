'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/header'
import ModalSelectExp from '@/components/ModalSelectSpec'
import AutoCompliteSelect from '@/components/autoCompliteSelect'
import { getSpecializations, getCities, getExperiences , getSkills , getEmpType, createVacancy } from '@/app/store/slices/vacancySlice'

import AutoCompliteTags from '@/components/autoCompliteTags'
import SelectEmploymentTypes from '@/components/selectEmployment-types'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

export default function CreateVacancy() {

    const [name, setName] = useState('')
    const [cityId, setCity] = useState()
    const [address, setAddress] = useState('')
    const [isSpecModalOpen, setSpecModalOpen] = useState(false)
    const [specializationId, setSpecialization] = useState()
    const [specializationName, setSpecializationName] = useState()
    const [salary_from, setsalary_from] = useState('')
    const [salary_to, setsalary_to] = useState('')
    const [salary_type, setsalary_type] = useState('KZT')
    const [experienceId, setExperienceId] = useState()
    const [description , seetDescription] = useState("<h3>Обязанности</h3><ul><li><li></ul><h3>Требование</h3><ul><li><li></ul><h3>Условия</h3><ul><li><li></ul>")
    const [skills , setSelectedSkills] =useState('')
    const [employmentTypeId , setEmploymentType] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()
    const closeSpecModalOpen = () => {
        setSpecModalOpen(false)
    }

    useEffect(() => {
        dispatch(getSpecializations())
        dispatch(getCities())
        dispatch(getExperiences())
        dispatch(getSkills())
        dispatch(getEmpType())
    }, [dispatch])

    const handleOnSpecChange = (e) => {
        setSpecialization(e.target.value * 1)
        setSpecializationName(e.target.dataset.name)
        setSpecModalOpen(false)

    }

    const cities = useSelector((state) => state.vacancy.cities)
    const experiences = useSelector((state) => state.vacancy.experiences)
    const AllSkills = useSelector((state) => state.vacancy.skills)
    const empTypes = useSelector((state) => state.vacancy.employmentTypes)
    
    const handleChangeExp = (e) => {
        setExperienceId(e.target.value)
    }
    const onSkillsChange = (data)=>{
        const arr = data.map(item => item.name)
        setSelectedSkills(arr.join(','))
      }
      const handleSave =()=>{
        dispatch(createVacancy({
            name,
            cityId: `${cityId}` , 
            address,
            specializationId : `${specializationId}`,
            salary_from,
            salary_to,
            salary_type,
            experienceId,
            description,
            skills ,
            employmentTypeId ,
            about_company : ''
        }, router))
      }
    
    const Editor =  dynamic(()=> import('./editor') , {ssr : false}) 
    return (
        <main>
            <Header />
            <div className='container p7'>
                <h1>Создание вакансии</h1>

                <h2>Основная информация</h2>

                <fieldset className='fieldset-vertical'>
                    <label>Название вакансии</label>
                    <input className='input' placeholder='Введите название' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </fieldset>

                <fieldset className='fieldset-vertical'>
                    <label>Указать специализацию</label>
                    {specializationName && <p>{specializationName}</p>}
                    <p className='link' onClick={() => setSpecModalOpen(true)}>Указать специализацию</p>
                </fieldset>
                {isSpecModalOpen && <ModalSelectExp close={closeSpecModalOpen} onChange={handleOnSpecChange} value={specializationId} />}
                <AutoCompliteSelect placeholder='' type="text" label="Город проживания" size="fieldset-md fieldset-vertical" items={cities} onSelect={(data) => setCity(data.id)} />

                <fieldset className='fieldset-vertical fieldset-md'>
                    <label>Предпологаемый уровень дохода в месяц</label>
                    <div className='input-group'>
                        <input className='input' placeholder='От' type='text' value={salary_from} onChange={(e) => setsalary_from(e.target.value)} />
                        <input className='input' placeholder='До' type='text' value={salary_to} onChange={(e) => setsalary_to(e.target.value)} />
                        <select className='input' name='salary_type' value={salary_type} onChange={e => setsalary_type(e.target.value)}>
                            <option value={'KZT'}>KZT</option>
                            <option value={'USD'}>USD</option>
                            <option value={'RUB'}>RUB</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset className='fieldset-vertical'>
                    <label>Адрес</label>
                    <input className='input' placeholder='Введите адрес' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                </fieldset>

                <fieldset className='fieldset-vertical fieldset-md'>
                    <label>Опыт работы</label>
                    <div className=''>
                        {experiences.map(exp => (
                            <div className='radio' key={exp.id}>
                                <input type='radio' name='exp' value={exp.id} onChange={handleChangeExp} />
                                <label>{exp.duration}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <fieldset className='fieldset-vertical fieldset-md'>
                    <label>Расскажите про вакансию</label>
                    <div className=''>
                       <Editor description={description} setDescription={seetDescription}/>
                    </div>
                </fieldset>
                <AutoCompliteTags placeholder='' type="text" label="Ключевые навыки" size="fieldset-md fieldset-vertical" items={AllSkills} onSelect={onSkillsChange} selected={[]} />

                <fieldset className='fieldset-vertical fieldset-md'>
                    <label>Тип занятости</label>
                    <div className=''>
                        {empTypes.map(et => (
                            <div className='radio' key={et.id}>
                                <input type='radio' name='exp' value={et.id} onChange={(e)=> setEmploymentType(e.target.value)} />
                                <label>{et.name }</label>
                            </div>
                        ))}
                    </div>
                </fieldset>

                <button className='button button-primary' onClick={handleSave}>Создать</button>
            </div>
        </main>
    )
}
