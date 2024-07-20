'use client'

const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
export default function WorkingHistory({workingHistory , remove}){
    const startDate = new Date(workingHistory.start_date)
    const endDate = new Date(workingHistory.end_date)
    return(
        <div className="working-history">
            <span>{months[startDate.getMonth()]} {startDate.getFullYear()} - {months[endDate.getMonth()]} {endDate.getFullYear()}  </span>
            <h4>{workingHistory.company_name}</h4>
            <p>{workingHistory.company_description}</p>

            <span className="cp" onClick={()=> remove (workingHistory)}>Удалить</span>
        </div>
    )
}
