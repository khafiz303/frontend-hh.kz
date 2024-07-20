export const months = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ];
export const months1 = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];


export function getAgeFromBirthday (b){
   
      const birthday = new Date(b)
    
      let age = 0
    
      age = new Date().getTime() - birthday.getTime()
      age = parseInt(age / (1000 * 60 * 60 * 24 * 365)) 

      return age
}