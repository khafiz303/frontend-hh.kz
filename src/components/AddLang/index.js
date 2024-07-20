'use client'

import { useEffect, useState } from "react"

export default function AddLang({onChange , foreignLanguages}){
    const remove= (index)=>{
        const langs = [...foreignLanguages]
        langs.splice(index , 1)
        onChange(langs)
    }


    const onSelect = (e) => {
        const [index, key] = e.target.name.split('-')
        const langs = foreignLanguages.map((lang, i) =>
            i === parseInt(index) ? { ...lang, [key]: e.target.value } : lang
        )
        onChange(langs)
    }
    
   const lns = foreignLanguages.map((ln , index ) =>
    (<div key={index} className="lns fieldset-md selectdate selectdate-noday">
        <span className="remove" onClick={()=> remove(index)}>X</span>
        <select  placeholder='Язык' className='input' name={index + '-name'} value={foreignLanguages[index].name} onChange={onSelect}>
                <option value="Казахский">Казахский</option>
                <option value="Английский">Английский</option>
                <option value="Русский">Русский</option>
                
        </select>
        <select  placeholder='Уровень' className='input' name={index + '-level'} value={foreignLanguages[index].level} onChange={onSelect}>
                <option value="А1">А1-навальный</option>
                <option value="А2">А2-элементарный</option>
                <option value="В1">В1-средний</option>
                <option value="В2">В2 - средне-продвинутый</option>
                <option value="С1">С1 - продвинутый</option>
                <option value="С2">С2 - в совершенстве</option>
        
        </select>
    </div>))
    return(
        <div className="eds">
            {lns}
            <a onClick={()=> onChange([...foreignLanguages , {name : '' , level : ''}])}>Добавить язык</a>
        </div>
    )
}