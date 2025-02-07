'use client'
import { useEffect, useState } from "react"
import Input from "../input"
export default function AutoCompliteSelect({label , placeholder , type , size ,
     items , onSelect , selected }){
    const [value , setValue] = useState({name : ''})
    const [filteredItems, setFilteredItems] = useState([])
    const onClick = (item)=>{
        onSelect(item)
        console.log(item);
        setValue(item)
        setFilteredItems([])
    }
    useEffect(()=>{
        items.map(item=>{
            if(selected === item.id)  setValue(item)
        })
     
    } , [selected , items])
    const reset = () =>{
        setValue({name : ''})
        onSelect(null)
    }

    const onChange = (e)=>{
        if(e.target.value === ''){
            setFilteredItems([])
        }else{
            setFilteredItems([...items.filter(item =>item.name.includes(e.target.value))])
        }
    }
    return(
        <div className={"autocomplite "+ size}>
            <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size}/>
            {value.name !=='' && <div className="tag">
                <span>{value.name}</span> <i onClick={()=>reset}>X</i>
                </div>
            }
            {filteredItems.length > 0  && <div className="dropdown">
                {filteredItems.map(item => (<a key={item.id} onClick={()=> onClick(item)}>{item.name}</a>))}
                </div>}
        </div>
    )
}