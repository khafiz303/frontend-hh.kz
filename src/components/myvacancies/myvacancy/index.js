'use client'
import Link from "next/link"
import { useDispatch , useSelector } from "react-redux"
import { deleteVacancy } from "@/app/store/slices/vacancySlice"


export default function MyVacancy({item}){
    const currentUser = useSelector((state) => state.auth.currentUser)
    const dispatch =useDispatch()
    return(
        <div  className="card mtb4">

            <Link className="h3 link" href={`/vacancy/${item.id}`}>{item.name} </Link>
            <p>Создан: {item.createdAt}</p>
            <p> { item.salary_from &&  `от ${item.salary_from } `} {item.salary_to && `до ${item.salary_to}`} {item.salary_type}</p>
         
            {currentUser && item.userId === currentUser.id && (
                <span onClick={() => dispatch(deleteVacancy(item.id))} className="deleteResume">Удалить</span>
            )}


        </div>
    )
}