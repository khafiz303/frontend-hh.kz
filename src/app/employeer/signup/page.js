'use client'
import Image from 'next/image'
import logo from '@/app/images/logo.svg'
import { useEffect, useState } from 'react';
import { setError, signUp } from '@/app/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function SignUp() {
    const [email , setEmail] = useState()
    const [step , setStep] = useState(1)
    const [first_name , setName] =useState('')
    const [last_name , setSurname] =useState('')
    const[company_name , setCompanyName] =useState('')
    const [company_description , setCompanyDesc] =useState('')
    const [company_address , setCompanyAdr] =useState('')
    const [company_logo , setCompanyLogo] =useState()
    const[password , setPassword] = useState('')
    const[password2 , setPassword2] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const error = useSelector((state) =>state.auth.error)

    
    useEffect(()=>{
        return()=>{
            dispatch(setError(null))
        }
    } , [])

    const onLogoChange = (e)=>{
      setCompanyLogo(e.target.files[0])
    }

    const handleSignUp = ()=>{
        dispatch(signUp({
            email,
            full_name : `${first_name} ${last_name}` ,
            password, 
            password2,
            company_name,
            company_description,
            company_address,
            company_logo
        } , router))
    }
  return (
    <main className='bg'>
        <div className='container'>
            <div className='authHeader'>
                <Image src={logo}/>
                <p>
                    Зарегистрируйтесь сейчас,
                    чтобы купить доступ к базе резюме или
                    публикацию ваканисий по выгодным ценам - все
                    акции уже ждут вас в разделе 
                    Спецпредложение
                </p>
                <p>Ответим на ваши вопросы</p>
                <a href='tel:77072342424'>+7 707 234 24 24</a>
            </div>

        </div>
        <section className='login-page'>
        {step === 1 && <div className="card">
                <h1>Регистрация для поиска сотрудников</h1>
                {/* <p>В завершении на почту прийдет пароль</p> */}
                <form>
                    <input className="input" placeholder="Введит email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button className="button button-primary" onClick={()=> setStep(2)}>Продолжить</button>
                </form>
                <Link className="button button-primary-bordered mtb4" href={'/employeer/signin'} >Войти</Link>
            {error && Object.keys(error).map(key => (<p className='error' key={key}>{error[key]}</p>))}

                </div>}
                {step === 2 && <div className="card">
                    <h1>Как вас зовут?</h1>
                <form>
                    <input className="input" placeholder="Имя" value={first_name} onChange={(e)=>setName(e.target.value)}/>
                    <input className="input" placeholder="Фамилия" value={last_name} onChange={(e)=>setSurname(e.target.value)}/>

                    <button className="button button-primary" type="button"   onClick={()=>setStep(3)}>Продолжить</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(1)}>Назад </button>
                </form>
            {error && Object.keys(error).map(key => (<p className='error' key={key}>{error[key]}</p>))}

            </div>}

            {step === 3 && <div className="card">
                    <h1>Введите название компании</h1>
                <form>
                    <input className="input" type='text' placeholder="Название компании" value={company_name} onChange={(e)=>setCompanyName(e.target.value)}/>
                    <textarea className="textarea" placeholder="Описание" value={company_description} onChange={(e)=>setCompanyDesc(e.target.value)}></textarea>
                    <input className="input" placeholder="Адрес компании" value={company_address} onChange={(e)=>setCompanyAdr(e.target.value)}/>
                    <input className="input" type='file' placeholder="logo" onChange={onLogoChange}/>
                    <button className="button button-primary" type="button"   onClick={()=>setStep(4)}>Продолжить</button>
                    <button className="button button-primary-bordered" type="button"   onClick={()=>setStep(2)}>Назад </button>
                </form>
            {error && Object.keys(error).map(key => (<p className='error' key={key}>{error[key]}</p>))}

            </div>}
            {step === 4 && <div className="card">
                    <h1>Введите пароль</h1>
                <form>
                    <input type='password' className="input"placeholder="Введите пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input  type='password' className="input" placeholder="Повторите пароль" value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                    <button className="button button-primary" type="button"   onClick={handleSignUp}>Зарегистрироваться</button>
                    <button className="button button-primary-bordered" onClick={()=>setStep(3)}>Назад </button>
                </form>
            {error && Object.keys(error).map(key => (<p className='error' key={key}>{error[key]}</p>))}

            </div>}





        </section>


    </main>
  );
}
