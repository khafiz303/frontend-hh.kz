'use client'

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import vacancyReducer from './slices/vacancySlice'
import resumeReducer from './slices/resumeSlice'
import applyReducer from './slices/applySlice'
export default configureStore({
  reducer: {
    auth : authReducer,
    resume : resumeReducer,
    vacancy : vacancyReducer,
    apply : applyReducer
  },
}) 