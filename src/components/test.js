'use client'
import {useState} from 'react'
export default function Test(){
    const name ="Islam"
    const [counter , setCounter] = useState(10)

    console.log('component war rerendered' , counter);

    const plusFunc = ()=>{
        console.log('plus', counter);
        setCounter(counter+1)
        
    }

    const minusFunc = ()=>{
        console.log('minus' , counter); 
        setCounter(counter-1)
        
        
    }
    const rebase = ()=>{
        console.log('minus' , counter); 
        setCounter(counter*0)
        
        
    }
    return(
        <main>
            <h1>My test component</h1>
            <p>My test parag ...</p>
            <a>test link</a>


            <p>Counter : {counter}</p>

            <button onClick={minusFunc}>Minus</button>
            <button onClick={plusFunc}>Plus </button>
            <button onClick={rebase}>Сброс </button>
        </main>
    )
}