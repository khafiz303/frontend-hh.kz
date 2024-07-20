'use client' 
import Input from '@/components/input';
import Header from '@/components/header/index'
import { END_POINT } from '@/config/end-point';
import axios  from 'axios';
import { useEffect , useState } from 'react';
import AutoCompliteSelect from '@/components/autoCompliteSelect';
import SelectDate from '@/components/selectDate';
import ModalAddExp from '@/components/modalAddExp';
import WorkingHistory from '@/components/WorkingHistory';
import AutoCompliteTags from '@/components/autoCompliteTags';
import AddEducation from '@/components/addEducation';
import AddLang from '@/components/AddLang';
import SelectEmploymentTypes from '@/components/selectEmployment-types';
import { useRouter , useParams } from 'next/navigation';
import { useDispatch , useSelector} from 'react-redux';
import { getResumeById } from '@/app/store/slices/resumeSlice';
import { editResume } from '@/app/store/slices/resumeSlice';

export default function CreateResumeEmploye() {
  const [cities , setCities] = useState([])
  const [countries , setCountries] = useState([])
  const [skillsAll , setSkills] = useState([])
  const [allemploymentTypes , setEmploymentTypes] = useState([])
  const [first_name , setName] = useState('')
  const [last_name , setSurName] = useState('')
  const [phone , setPhone] = useState('')
  const [cityId , setCity] = useState()
  const [birthday , setBirthday] = useState()
  const [gender , setGender] = useState('')
  const [citizhenship , setCitizhenship] = useState()
  const [position , setPosition] = useState('')
  const [salary , setSalary] = useState()
  const [salary_type , setSalaryType] = useState('KZT')
  const [education , setEducation] = useState([])
  const [foreignLanguages , setForeignLanguages] = useState([])

  const [modalExpIsOpen ,setmodalExpIsOpen ] = useState(false)
  const [working_histories , setWorkingHistories] = useState([])
  const [skills , setSelectedSkills] = useState('')
  const [employmentTypes , setSelectedEmpTypes] = useState([])
  const [about , setAbout] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()
  const {id} = useParams() 
  const resume = useSelector(state=>state.resume.resume)

  useEffect(()=>{
    dispatch(getResumeById(id))
    axios.get(`${END_POINT}/api/region/cities`).then(res =>{
        setCities(res.data)
     })
     axios.get(`${END_POINT}/api/region/countries`).then(res =>{
      setCountries(res.data)
   })
   axios.get(`${END_POINT}/api/skills`).then(res =>{
    setSkills(res.data)
    })
    axios.get(`${END_POINT}/api/employment-types`).then(res =>{
      setEmploymentTypes(res.data)
   })
  },[])
  useEffect(()=>{
    if(resume.id){
        setCity(resume.cityId)
        setSelectedEmpTypes(resume.employmentTypes.map(et=>et.id))
        setName(resume.first_name)
        setSurName(resume.last_name)
        setPhone(resume.phone)
        setCity(resume.CityId)
        setGender(resume.gender)
        setCitizhenship(resume.citizhenship)
        setPosition(resume.position)
        setSalary(resume.salary)
        setSalaryType(resume.salary_type)
        setWorkingHistories(resume.workingHistory)
        setAbout(resume.about)
        setSelectedSkills(resume.skills)
        setEducation(resume.education)
        setForeignLanguages(resume.foreignLanguages)
        console.log('sakjznm',foreignLanguages);

    }
  }, [resume])

  
  // const onSelect=(data)=>{
  //   setCity(data.id)
  // }
  const closeModalExp = ()=>{
    setmodalExpIsOpen(false)
  }
  const addWorkingHistory = (item)=>{
    setWorkingHistories([...working_histories, item])
    closeModalExp()
  }
  // ф?
  const removeWorkingHistory = (workingHistory)=>{
    let wh = [...working_histories]
    let index = working_histories.indexOf(workingHistory)
    wh.splice(index , 1)
    setWorkingHistories(wh)
  }
  const handleGenderChange = (e)=>{
    setGender(e.target.value)
  
  }
  const onSkillsChange = (data)=>{
    const arr = data.map(item => item.name)
    setSelectedSkills(arr.join(','))
  }

  const handleSave = ()=>{
    dispatch(editResume( {
      id : resume.id,
      first_name , 
      last_name , 
      phone ,
      cityId ,
      birthday , 
      gender ,
      salary,
      salary_type,
      citizhenship,
      position,
      working_histories,
      skills, 
      education, 
      employmentTypes,
      foreignLanguages , 
      about, 
      main_language : '',
      
      
    }, router))
     
  
  }
  let eds = education.map(ed =>{
    const end = new Date(ed.end_date)
    return {
        ...ed , 
        end_date : end.getFullYear()
    }
  })
  return (
    <main>
      <Header/>
        <div className='container p7'>
            <h1>Ваши резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder='' type="text" label="Имя" size="fieldset-md" onChange={(e)=> setName(e.target.value)} value={first_name}/>
            <Input placeholder='' type="text" label="Фамилия" size="fieldset-md"  onChange={(e)=> setSurName(e.target.value)} value={last_name}/>
            <Input placeholder='' type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e)=> setPhone(e.target.value)} value={phone} />
            <AutoCompliteSelect placeholder='' type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data)=> setCity(data.id)} selected={cityId}/>
            <SelectDate size="fieldset-sm" label='Дата рождение' onChange={(date)=> setBirthday(date)}  value={resume.birthday}/>

            <fieldset className={'fieldset fieldset-sm'}>
              <label>Пол</label>

              <div className='radio-group'>
                <div className='radio'>
                  {resume.gender && resume.gender === 'Муж' && <input  type='radio' onClick={handleGenderChange} name='gender' id='g1' value={'Мужской'} checked/>}
                  {!resume.gender || resume.gender !== 'Муж' && <input  type='radio' onClick={handleGenderChange} name='gender' id='g1' value={'Мужской'} />}
                  <label for='g1'>Мужской</label>
                </div>
              <div className='radio' >
                    {resume.gender && resume.gender === 'Жен' && <input  type='radio' onClick={handleGenderChange} name='gender' id='g1' value={'Женский'} checked/>}
                    {!resume.gender || resume.gender !== 'Жен' && <input  type='radio' onClick={handleGenderChange} name='gender' id='g1' value={'Женский'} />}
                    <label for='g2'>Женский</label>
              </div>
                
              </div>
            </fieldset>
            <AutoCompliteSelect placeholder='' type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data)=> setCitizhenship(data.id)} selected={citizhenship}/>
            <Input placeholder='' type="text" label="Желаемая должность" size="fieldset-md" onChange={(e)=> setPosition(e.target.value)} value={position} />
            
            <fieldset className={'fieldset fieldset-lg'}>
              <label>Зарплата</label>

              <div className='salary'>
              <input placeholder='' type='number' className='input' value={salary} onChange={e => setSalary(e.target.value*1)}/>
              <select className='input' value={salary_type} onChange={e => setSalaryType(e.target.value)}>
                <option value={'KZT'}>KZT</option>
                <option value={'USD'}>USD</option>
                <option value={'RUB'}>RUB</option>
              </select>
              на руки
              </div>
            </fieldset>


            <h3>Опыт работы</h3>
            {modalExpIsOpen && <ModalAddExp close={closeModalExp} addWorkingHistory = {addWorkingHistory}/>}
            <fieldset className={'fieldset fieldset-lg'}>
              <label>Место работы</label>

              <div className='exp'>
                {working_histories.map(item => (<WorkingHistory key={item.id} workingHistory={item} remove={removeWorkingHistory}/>))}
                <button className='button button-primary-bordered' onClick={()=> setmodalExpIsOpen(true)}>Добавить место работы</button>
              </div>
            </fieldset>


          
            <fieldset className={"fieldset fieldset-lg"}>
                <label>О себе</label>
                <textarea  className='textarea' placeholder='Расскажите о себе' onChange={e => setAbout(e.target.value)} value={about} > </textarea>
            </fieldset>
        
        {/* <AutoCompliteTags placeholder='' type="text" label="Ключевые навыки" size="fieldset-md" items={skillsAll} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(',').map(item=>({name : item})) : []}/> */}
        <h3>Оброзование</h3>
        <AddEducation onChange={(eds)=> setEducation(eds)} education={eds}/>

        <h3>Владение языками</h3>

        <AddLang onChange={(lns)=> setForeignLanguages(lns)} foreignLanguages={foreignLanguages}/> 

          <h3>Другая важная информация</h3>      

          <SelectEmploymentTypes label='Тип занятости' size='fieldset-md' allEmploymentTypes={allemploymentTypes} onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes = {employmentTypes} />
          <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
        </div>

    </main>
  );
} 
