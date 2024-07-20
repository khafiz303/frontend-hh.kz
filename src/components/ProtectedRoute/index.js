'use client'
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoute ({children}) {
    const [token, setToken] = useState(null);
    const isAuth =  useSelector((state)=> state.auth.isAuth)
    const router = useRouter()
    useEffect(()=>{
    const storedItem = localStorage.getItem('token')
        setToken(storedItem)
    } , [])
    if(token){
        let decodedToken = jwtDecode(token)
        if(decodedToken.exp *1000 > Date.now()){
            return (<>{children}</>
            ); 
        }else if(decodedToken.role.name == 'employee'){
            router.push('/login')
        }else{
            router.push('/employer/signin')
        }
         
    }else{
        router.push('/login')
    }
    
   
}
