'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/header'
import ModalSelectExp from '@/components/ModalSelectSpec'
import AutoCompliteSelect from '@/components/autoCompliteSelect'
import { getSpecializations, getCities, getExperiences , getSkills , getEmpType, createVacancy } from '@/app/store/slices/vacancySlice'

import { useRouter } from 'next/navigation'
export default function SerachVacancyAdvanced() {
    const [q, setQ] = useState('')
    const [cityId, setCity] = useState()
    const [address, setAddress] = useState('')
    const [isSpecModalOpen, setSpecModalOpen] = useState(false)
    const [specializationId, setSpecialization] = useState()
    const [specializationName, setSpecializationName] = useState()
    const [salary, setSalary] = useState('')
    const [salary_type, setsalary_type] = useState('')
    const [experienceId, setExperienceId] = useState()
    const [employmentTypeId , setEmploymentTypeId] = useState()
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
    }, [])

    const handleOnSpecChange = (e) => {
        setSpecialization(e.target.value * 1)
        setSpecializationName(e.target.dataset.name)
        setSpecModalOpen(false)

    }

    const cities = useSelector((state) => state.vacancy.cities)
    const experiences = useSelector((state) => state.vacancy.experiences)
    const empTypes = useSelector((state) => state.vacancy.employmentTypes)
    const handleChangeExp = (e) => {
        setExperienceId(e.target.value)
    }

      const handleSearch =()=>{
       let queryString = '?'
        
        if(q) queryString +=`q=${q}&`
        if(specializationId) queryString +=`specializationId=${specializationId}&`
        if(cityId) queryString +=`cityId=${cityId}&`
        if(salary) queryString +=`salary=${salary}&`
        if(salary_type) queryString +=`salary_type=${salary_type}&`
        if(experienceId) queryString +=`experienceId=${experienceId}&`
        if(employmentTypeId) queryString +=`employmentTypeId=${employmentTypeId}&`
        router.push(`/search/vacancy${queryString}`)
      }

    return (
        <main>
            <Header />
            <div className='container p7'>
                <h1>Поиск вакансии</h1>

                <fieldset className='fieldset-vertical'>
                    <label>Ключевые слова</label>
                    <input className='input' placeholder='Введите название' type='text' value={q} onChange={(e) => setQ(e.target.value)} />
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
                        <input className='input' placeholder='От' type='text' value={salary} onChange={(e) => setSalary(e.target.value)} />
                        <select className='input' name='salary_type' value={salary_type} onChange={e => setsalary_type(e.target.value)}>
                            <option value={'KZT'}>KZT</option>
                            <option value={'USD'}>USD</option>
                            <option value={'RUB'}>RUB</option>
                        </select>
                    </div>
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
                    <label>Тип занятости</label>
                    <div className=''>
                        {empTypes.map(et => (
                            <div className='radio' key={et.id}>
                                <input type='radio' name='empType' value={et.id} onChange={(e)=> setEmploymentTypeId(e.target.value)} />
                                <label>{et.name }</label>
                            </div>
                        ))}
                    </div>
                </fieldset>

          

                <button className='button button-primary' onClick={handleSearch}>Поиск</button>
            </div>
        </main>
    )
}
