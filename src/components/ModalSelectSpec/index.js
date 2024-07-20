'use client'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SpecType from "./SpecType"

export default function ModalSelectExp({close ,onChange , value}){
    const [search , setSearch] = useState('')
    const [filteredSpecTypes , setfilteredSpecTypes] = useState([])

    const specializationTypes = useSelector((state) => state.vacancy.specializations) 
    console.log(specializationTypes);

    const onSearch =e=>{
        setSearch(e.target.value)

        let types = [...specializationTypes]
        types = types.filter(item =>{
            for(let i = 0; i<item.specializations.length; i++){
                if(item.specializations[i].name.includes(e.target.value)) return item
            }
        })
        setfilteredSpecTypes(types)
    }

    useEffect(()=>{
        setfilteredSpecTypes(specializationTypes)
    } , [specializationTypes])
    return(
       <div className="modal">
        <div className="modal-backdrop" onClick={close}>  </div>
            <div className="modal-inner">
                <h2>Кого вы хотите найти</h2>
                <input className="input" type="text" value={search} onChange={onSearch} />

                {filteredSpecTypes.map(specType => (<SpecType key={specType.id} specType={specType} onChange={onChange} value={value} />))}
            </div>
        </div>
    )
}