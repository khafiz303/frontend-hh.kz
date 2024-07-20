import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { END_POINT } from '@/config/end-point';
import { handleClientScriptLoad } from 'next/script';


export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState :{
    vacancies : [] ,
    vacancy :{},
    specializations:[],
    cities : [],
    experiences:[],
    skills :[],
    employmentTypes : []
  },
  reducers: {
    setVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies
    },
    // uppendVacancy : (state , action)=>{
    //   state.vacancies=[...state.vacancies, action.payload.newvacancy]
    // },
    setVacancy : (state , action)=>{
      state.vacancy =action.payload.vacancy
    } , 
    handleDeleteVacancy: (state , action)=>{
      let vacancies = [...state.vacancies]
      vacancies = vacancies.filter(item => item.id !== action.payload)
      state.vacancies = vacancies
    },
    setSpecializations : (state , action)=>{
      state.specializations =action.payload
    },
    setCities : (state , action)=>{
      state.cities =action.payload
    },
    setExps : (state , action)=>{
      state.experiences = action.payload
    },
    setSkills: (state , action)=>{
      state.skills = action.payload
    },
    setEmpTypes : (state , action)=>{
      state.employmentTypes = action.payload
    }
    
  },
});

export const { setVacancies  , setVacancy , handleDeleteVacancy , setSpecializations  ,
   setCities  , setExps , setSkills , setEmpTypes} = vacancySlice.actions;

export const getMyVacancies = () => async (dispatch) => {
    try{
        const res = await axios.get(`${END_POINT}/api/vacancy`);
        dispatch(setVacancies({vacancies : res.data}))

    }catch(e){
      console.log(e);
        alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
    }
};


export const getSpecializations = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/specializations`);
      dispatch(setSpecializations(res.data))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};

export const getCities = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/region/cities`);
      dispatch(setCities(res.data))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};

export const getExperiences = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/experiences`);
      dispatch(setExps(res.data))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};

export const getSkills = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/skills`);
      dispatch(setSkills(res.data))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};

export const getEmpType = () => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/employment-types`);
      dispatch(setEmpTypes(res.data))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};





export const createVacancy = (sendData , router) => async (dispatch) => {
  
  try{
      const res = await axios.post(`${END_POINT}/api/vacancy` , sendData);
      router.push('/vacancy')

      // dispatch(uppendVacancy({newvacancy : res.data}))

  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }
};

export const getVacancyById = (id) => async (dispatch) => {
  try{
      const res = await axios.get(`${END_POINT}/api/vacancy/${id}`);
      dispatch(setVacancy({vacancy : res.data}))

  }catch(e){
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }


};

// export const editResume = (sendData , router) => async (dispatch) => {
//   try{
//       const res = await axios.put(`${END_POINT}/api/resume` , sendData);
//       router.push('/resumes')

//   }catch(e){
//     console.log(e);
//       alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
//   }


// };

export const deleteVacancy = (id) => async (dispatch) => {
  try{
      const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`);
      dispatch(handleDeleteVacancy(id))
  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }


};

export const getSearchedVacancies = (params , router) => async (dispatch) => {
  try{
      const{
        q,
        specializationId,
        cityId,
        salary, 
        salary_type,
        experienceId,
        employmentTypeId
      } = params

      let queryString = "?"
        
      if(q) queryString +=`q=${q}&`
      if(specializationId) queryString +=`specializationId=${specializationId}&`
      if(cityId) queryString +=`cityId=${cityId}&`
      if(salary) queryString +=`salary=${salary}&`
      if(salary_type) queryString +=`salary_type=${salary_type}&`
      if(experienceId) queryString +=`experienceId=${experienceId}&`
      if(employmentTypeId) queryString +=`employmentTypeId=${employmentTypeId}&`
      router.push(`/search/vacancy${queryString}`)
      const res = await axios.get(`${END_POINT}/api/vacancy/search${queryString}`);
      dispatch(setVacancies({vacancies : res.data}))
  }catch(e){
    console.log(e);
      alert('Что то пошло не так , сообщите о ошибке Тех спецам сайта!')
  }


};





export default vacancySlice.reducer;
