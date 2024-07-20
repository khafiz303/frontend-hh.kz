'use client'

import { useEffect, useState } from "react"

export default function SelectDate({ size , label , onChange , value}){
    const [day ,setDay] = useState('')
    const [month , setMonth] = useState(0)
    const [year ,setYear] = useState('')

    useEffect(()=>{
        const date = new Date()
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(day)
        onChange(date)
  
    }, [day , month , year , onChange])
    useEffect(()=>{
        if(value){
            const date =new Date(value)
            setDay(date.getDate())
            setMonth(date.getMonth())
            setYear(date.getFullYear())
        }
      
    }, [value])
    return(
        <fieldset className={"fieldset "+ size}>
            <label>{label}</label>
            <div className="selectdate">
                <input  className='input' placeholder='День' type='text' onChange={(e)=>setDay(e.target.value)} value={day}/>
                <select onChange={(e)=> setMonth(e.target.value)}  value={month} placeholder='Месяц' className='input'>
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
                <input  className='input' placeholder='Год' type='text' onChange={(e)=> setYear(e.target.value)} value={year}/>
            </div>
           
        </fieldset>
    )
}