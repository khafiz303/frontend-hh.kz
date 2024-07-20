
import { useEffect, useState } from "react"
import Spec from "./Spec"
export default function SpecType({specType , onChange , value}){
    const [active , setActive] = useState(false)

    useEffect(()=>{
        specType.specializations.map(spec => spec.id === value ? setActive(true):null)
    } ,[])
    return(
        <div className={`specTypes${ active ? 'active' :''}`}>
            <img src='/images/arrow-right.svg' onClick={()=> setActive(!active)}/>
            {specType.name}

            {active && specType.specializations.map(spec => (<Spec key={spec.id} spec={spec} onChange={onChange} value={value} />))}
        </div>
    )
}