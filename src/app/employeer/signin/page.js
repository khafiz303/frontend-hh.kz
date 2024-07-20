'use client'
import Image from 'next/image'
import logo from '@/app/images/logo.svg'
import { useEffect, useState } from 'react';
import { setError, signIn } from '@/app/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Signin() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
   
    const router = useRouter()
    const dispatch = useDispatch()
    const error = useSelector((state) =>state.auth.error)

    useEffect(()=>{
        return()=>{
            dispatch(setError(null))
        }
    } , [])

   

    const handleSignin = ()=>{
        dispatch(signIn({
            email,
            password
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
       <div className="card">
                <h1>Вход для поиска сотрудников</h1>
                <form>
                    <input className="input" type='email' placeholder="Введит email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input className="input" type='password' placeholder="Введит пароль" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="button button-primary" type='button' onClick={handleSignin}>Войти</button>
                    <Link className="button button-primary-bordered mtb4" href={'/employeer/signup'} >Зарегистрироваться</Link>
                </form>
            {error && Object.keys(error).map(key => (<p className='error' key={key}>{error[key]}</p>))}

                </div>
              


        </section>


    </main>
  );
}
