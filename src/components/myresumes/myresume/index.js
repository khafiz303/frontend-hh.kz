'use client'
import Link from "next/link"
import { useDispatch } from "react-redux"
import { deleteResume } from "@/app/store/slices/resumeSlice"


export default function MyResume ({item}){
    const dispatch =useDispatch()
    return(
        <div  className="card mtb4">

            <Link className="h3 link" href={`/resumes/${item.id}`}>{item.position} </Link>
            <p>Создан: {item.createdAt}</p>
            
            <h3>Статистика</h3>
            <div className="flex">
                <a className="p3">{0}</a>
                <a className="p3">{0}</a>
                <a className="p3">{0}</a>
            </div>
            <span onClick={()=>dispatch(deleteResume(item.id)) } className="deleteResume">Удалить</span>


        </div>
    )
}