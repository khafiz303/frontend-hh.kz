'use client' 
import Input from '@/components/input';
import Header from '../../components/header/index'
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
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { createResume } from '../store/slices/resumeSlice';

export default function CreateResumeEmploye() {
  const [cities , setCities] = useState([])
  const [countries , setCountries] = useState([])
  const [skillsAll , setSkills] = useState([])
  const [allemploymentTypes , setEmploymentTypes] = useState([])
  const [first_name , setName] = useState('')
  const [last_name , setSurName] = useState('')
  const [phone , setPhone] = useState('')
  const [CityId , setCity] = useState()
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

  useEffect(()=>{
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
  const onChangeEds = (eds) => {
    setEducation(eds);

};
const handleSave = () => {
  if (education && education.length > 0) {
      let updatedEds = education.map(ed => {
          if (ed.end_date && ed.end_date !== '') {
              return {
                  ...ed,
                  end_date: new Date(ed.end_date).getTime()
              };
          } else {
              return ed;
          }
      });
      setEducation(updatedEds);
    }
   
      console.log(CityId);
      console.log(citizhenship , 'citizhenship');
      dispatch(createResume({
          first_name, 
          last_name, 
          phone,
          CityId,
          birthday,
          gender,
          salary,
          salary_type,
          citizhenship, 
          position,
          working_histories,
          skills,
          education, 
          employmentTypes,
          foreignLanguages,
          about,
          main_language: '',
      }, router));
   
      console.log('sasasasa');
  
};

  return (
    <main>
      <Header/>
        <div className='container p7'>
            <h1>Ваши резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder='' type="text" label="Имя" size="fieldset-md" onChange={(e)=> setName(e.target.value)}/>
            <Input placeholder='' type="text" label="Фамилия" size="fieldset-md"  onChange={(e)=> setSurName(e.target.value)}/>
            <Input placeholder='' type="text" label="Мобильный телефон" size="fieldset-md" onChange={(e)=> setPhone(e.target.value)} />
            <AutoCompliteSelect placeholder='' type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data)=> setCity(data.id)}/>
            <SelectDate size="fieldset-sm" label='Дата рождение' onChange={(date)=> setBirthday(date)} />

            <fieldset className={'fieldset fieldset-sm'}>
              <label>Пол</label>

              <div className='radio-group'>
                <div className='radio'>
                  <input  type='radio' onClick={handleGenderChange} name='gender' id='g1' value={'Мужской'}/>
                  <label htmlFor='g1'>Мужской</label>
                </div>
              <div className='radio' >
                <input type='radio' onChange={handleGenderChange} name='gender' id='g2' value={'Женский'}/>
                <label htmlFor='g2'>Женский</label>
              </div>
                
              </div>
            </fieldset>
            <AutoCompliteSelect placeholder='' type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data)=> setCitizhenship(data.id) }/>
            <Input placeholder='' type="text" label="Желаемая должность" size="fieldset-md" onChange={(e)=> setPosition(e.target.value)} />
            
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
                {working_histories.map(item => (<WorkingHistory workingHistory={item} key={item.id} remove={removeWorkingHistory}/>))}
                <button className='button button-primary-bordered' onClick={()=> setmodalExpIsOpen(true)}>Добавить место работы</button>
              </div>
            </fieldset>


          
            <fieldset className={"fieldset fieldset-lg"}>
                <label>О себе</label>
                <textarea className='textarea' placeholder='Расскажите о себе' onChange={e => setAbout(e.target.value)} value={about} />

            </fieldset>
        
        {/* <AutoCompliteTags placeholder='' type="text" label="Ключевые навыки" size="fieldset-md" items={skillsAll} onSelect={onSkillsChange} selected={skills.length > 0 ?  skills.split(',').map(item=>({name : item})) : []} /> */}
        <h3>Оброзование</h3>
        <AddEducation onChange={onChangeEds} education={education.length > 0 ? education : []} />


        <h3>Владение языками</h3>

        <AddLang onChange={(lns)=> setForeignLanguages(lns)} foreignLanguages={foreignLanguages.length > 0 ? foreignLanguages : [] } />

          <h3>Другая важная информация</h3>      

          <SelectEmploymentTypes label='Тип занятости' size='fieldset-md' allEmploymentTypes={allemploymentTypes} onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes={[]}/>
          <button className='button button-primary' onClick={handleSave}>Сохранить и опубликовать</button>
        </div>

    </main>
  );
} 
