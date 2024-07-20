'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import logo from '../../app/images/logo.svg';
import Link from 'next/link';
import { logOut } from '@/app/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [buttonText, setButtonText] = useState('Войти');
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const router = useRouter();

    useEffect(() => {
        if (isAuth) {
            setButtonText('Выйти');
        } else {
            setButtonText('Вoйти');
        }
        setIsMounted(true);
    }, [isAuth]);

    if (!isMounted) {
        return null; // Ожидаем, пока компонент будет смонтирован на клиенте
    }

    return (
        <header className='header'>
            <div className='container'>
                <div className='header-inner'>
                    <div>
                        <Link href="/">
                            <Image src={logo} alt="Logo" />
                        </Link>
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && (
                            <Link href="/vacancy" className="nav-link">Мои Вакансии</Link>
                        )}
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && (
                            <a href="/resumes" className="nav-link">Мои резюме</a>
                        )}
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && (
                            <Link href='/applies' className="nav-link">Отклики</Link>
                        )}
                        <a href="#" className="nav-link">Помощь</a>
                    </div>
                    <div>
                        <Link href={`/search/vacancy/advanced`} className="header-search">
                            <img src='/images/search.svg' alt="Search Icon" />
                            Поиск
                        </Link>
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && (
                            <Link href='/create-vacancy' className="header-button header-button--green">
                                Создать вакансию
                            </Link>
                        )}
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && (
                            <Link href='/create-resume' className="header-button header-button--green">
                                Создать резюме
                            </Link>
                        )}
                        {!isAuth && (
                            <Link href="/login" className="header-button">
                                {buttonText}
                            </Link>
                        )}
                        {isAuth && (
                            <a className="header-button" onClick={() => dispatch(logOut(router))}>
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
