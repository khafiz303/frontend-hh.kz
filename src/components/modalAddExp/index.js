'use client'

import { useState } from "react"

export default function ModalAddExp({close ,addWorkingHistory}){
    const [start_date , setStartDate] = useState(Date.now())
    const [end_date , setEndDate] = useState(Date.now())
    const [responsibilities, setResponsibilites] = useState('')

    const [company_name , setCompany_name] = useState('')
    const [company_description , setCompany_description] = useState('')
    const onChangeMonth = (e)=>{
        let data = new Date (start_date)
        data.setMonth(e.target.value)
        setStartDate(data.getTime())
    }
    const onChangeYear = (e)=>{
        let data = new Date (start_date)
        data.setFullYear(e.target.value)
        setStartDate(data.getTime())

    }
    const onChangeMonthEnd = (e)=>{
        let data = new Date (end_date)
        data.setMonth(e.target.value)
        setEndDate(data.getTime())
    }
    const onChangeYearEnd = (e)=>{
        let data = new Date (end_date)
        data.setFullYear(e.target.value)
        setEndDate(data.getTime())
    }


    const onChangeCompanyName = (e)=>{
        setCompany_name(e.target.value)
    }
    const onChangeCompanyDesc = (e)=>{
        setCompany_description(e.target.value)
    }

    const onResponsibilites = (e)=>{
        setResponsibilites(e.target.value)
    }

    const save = ()=>{
        const workingHistory ={
            start_date,
            end_date,
            company_name,
            company_description,
            responsibilities
        }
        addWorkingHistory(workingHistory)
    }
    return(
       <div className="modal">
        <div className="modal-backdrop" onClick={close}>  </div>
            <div className="modal-inner">
                <h2>Опыт работы</h2>

                <h4>Начало работы</h4>
            <div className="selectdate selectdate-noday">
                <select onChange={onChangeMonth}  placeholder='Месяц' className='input'>
                    <option disabled>Выберите месяц</option>
                    <option value={0}>Январь</option>
                    <option value={1}>Февраль</option>
                    <option value={2}>Март</option>
                    <option value={3}>Апрель</option>
                    <option value={4}>Май</option>
                    <option value={5}>Июнь</option>
                    <option value={6}>Июль</option>
                    <option value={7}>Август</option>
                    <option value={8}>Сентябрь</option>
                    <option value={9}>Октябрь</option>
                    <option value={10}>Ноябрь</option>
                    <option value={11}>Декабрь</option>
                </select>
                <input  className='input' placeholder='Год' type='text' onChange={onChangeYear}/>
            </div>
            
            <h4>Конец работы</h4>

            <div className="selectdate selectdate-noday">
                <select onChange={onChangeMonthEnd}  placeholder='Месяц' className='input'>
                <option disabled>Выберите месяц</option>
                    <option value={0}>Январь</option>
                    <option value={1}>Февраль</option>
                    <option value={2}>Март</option>
                    <option value={3}>Апрель</option>
                    <option value={4}>Май</option>
                    <option value={5}>Июнь</option>
                    <option value={6}>Июль</option>
                    <option value={7}>Август</option>
                    <option value={8}>Сентябрь</option>
                    <option value={9}>Октябрь</option>
                    <option value={10}>Ноябрь</option>
                    <option value={11}>Декабрь</option>
                </select>
                <input  className='input' placeholder='Год' type='text' onChange={onChangeYearEnd}/>
            </div>
            <h4>Организация</h4>
            <input className="input" placeholder="Название компании" type="text" onChange={onChangeCompanyName} value={company_name}/>
            <h4>Должность</h4>
            <input className="input" placeholder="Должность" type="text" onChange={onChangeCompanyDesc} value={company_description}/>
            <h4>Обязанности на рабочем месте</h4>
            <textarea className="textarea "  placeholder="опишите что вы делали на рабочем месте" onChange={onResponsibilites} value={responsibilities} ></textarea>
            <div className="modal-actions">
                <button className="button button-primary-bordered" onClick={close}>Отменить</button>
                <button className="button button-primary" onClick={save}>Сохранить</button>
            </div>
            </div>

       
       </div>
    )
}