'use client'

import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/header'
import ModalSelectExp from '@/components/ModalSelectSpec'
import AutoCompliteSelect from '@/components/autoCompliteSelect'
import MyVacancies from '@/components/myvacancies'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSearchedVacancies, getSpecializations, getCities, getExperiences, getSkills, getEmpType } from '@/app/store/slices/vacancySlice'

function SearchVacancyComponent() {
    const searchParams = useSearchParams()

    const [q, setQ] = useState(searchParams.get('q') || '')
    const [cityId, setCity] = useState(searchParams.get('cityId') || '')
    const [isSpecModalOpen, setSpecModalOpen] = useState(false)
    const [specializationId, setSpecialization] = useState(searchParams.get('specializationId') || '')
    const [specializationName, setSpecializationName] = useState('')
    const [salary, setSalary] = useState(searchParams.get('salary') || '')
    const [salary_type, setsalary_type] = useState(searchParams.get('salary_type') || 'KZT')
    const [experienceId, setExperienceId] = useState(searchParams.get('experienceId') || '')
    const [employmentTypeId, setEmploymentTypeId] = useState(searchParams.get('employmentTypeId') || '')
    const dispatch = useDispatch()
    const router = useRouter()

    const closeSpecModalOpen = () => {
        setSpecModalOpen(false)
    }

    const handleSearch = () => {
        dispatch(getSearchedVacancies({
            q,
            specializationId,
            cityId,
            salary,
            salary_type,
            experienceId,
            employmentTypeId
        }, router));
    }

    useEffect(() => {
        handleSearch()
    }, [cityId, specializationId, salary, experienceId, employmentTypeId])

    useEffect(() => {
        handleSearch()
        dispatch(getCities());
        dispatch(getExperiences());
        dispatch(getSkills());
        dispatch(getEmpType());
    }, []);

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

    return (
        <main>
            <Header />
            <div className='container mt7 '>
                <div className='flex'>
                    <fieldset className='fieldset-vertical flex' style={{ width: `100%` }}>
                        <input className='input' placeholder='Введите название' type='text' value={q} onChange={(e) => setQ(e.target.value)} />
                    </fieldset>
                    <button className='button button-primary' onClick={handleSearch}>Найти</button>
                </div>

                <div className='flex'>
                    <div style={{ width: `20%` }}>
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
                                        <input type='radio' name='empType' value={et.id} onChange={(e) => setEmploymentTypeId(e.target.value)} />
                                        <label>{et.name}</label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                    <div style={{ width: `80%`, paddingLeft: `40px` }}>
                        <MyVacancies />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchVacancyComponent />
        </Suspense>
    );
}
