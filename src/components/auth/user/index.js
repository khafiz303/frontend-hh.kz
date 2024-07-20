'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector ,  useDispatch} from 'react-redux'
import { authorize , sendVerificationEmail , verifyCode} from "@/app/store/slices/authSlice"
import Link from "next/link"
export default function UserLogin() {
    const [step , setStep] = useState(1)
    const [email , setEmail] = useState('')
    const [time , setTime] = useState(119)
    const [code , setCode] =useState('')
    const router = useRouter()
    const isAuth = useSelector((state) =>state.auth.isAuth)
    const dispatch = useDispatch()

    const sendVerifyEmail = ()=>{
        dispatch(sendVerificationEmail(email))
        setStep(2)
    }
    const verifyCodeFunc =()=>{
        dispatch(verifyCode(email , code))
    }

    useEffect(()=>{
        let interval;
        if(step === 2){
            if(time !== 0)  interval = setInterval(()=>{ setTime(time => time - 1)
           }, 1000)
        }else if(interval){
            clearInterval(interval)
        }
    }, [step])

    useEffect(()=>{
        if(isAuth) router.push('/resumes')
    }, [isAuth])

    const min = parseInt(time/60)
    const sec = time % 60 
    return (
        <section className='login-page'>
        
            {step === 1 && <div className="card">
                <h1>Поиски работы</h1>
                <form>
                    <input className="input" placeholder="Введит email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button className="button button-primary" onClick={sendVerifyEmail}>Продолжить</button>
                </form>
            </div>}

            {step === 1 && <div className="card">
                <h1>Поиск отрудников</h1>
                <p>Размещение вакансий и доступ к базе резюме</p>
                <Link className="button button-primary-bordered " href='/employeer/signup'>Я ищу сотрудника</Link>
            </div>}

            {step === 2 && <div className="card">
                <h1>Отправить код на...</h1>
                <p>Напишите ег чтобы одтвердить что это вы, а не кто то другой</p>
                <form>
                    <input className="input" placeholder="введите код" value={code} onChange={(e)=>setCode(e.target.value)}/>
                    <p>Повторить можно через {min}:{sec}  секунд</p>
                    <button className="button button-primary" type="button" onClick={verifyCodeFunc}>Продолжить</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(1)}>Назад </button>
                </form>
            </div>}
{/* 
            {step === 3 && <div className="card">
                <h1>Давайте познакомимся</h1>
                <form>
                    <input className="input" placeholder="введите имя"/>
                    <input className="input" placeholder="введите фамилию"/>
                    <button className="button button-primary" type="button" onClick={()=> dispatch(authorize())}>Продолжить</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(2)}>Назад </button>
                </form>
            </div>} */}
        </section>
    )
}
