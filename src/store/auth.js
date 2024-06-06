import {configureStore} from '@reduxjs/toolkit'
import AuhtSlice from './AuthProvider'

const store = configureStore({
    reducer:{
        auth: AuhtSlice
    }
})

export default store