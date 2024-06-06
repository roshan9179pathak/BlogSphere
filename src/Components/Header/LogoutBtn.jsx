import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/AuthProvider'
import authservices from '../../Appwrite/auth'

export default function LogoutBtn({children}) {
    
    const dispatch = useDispatch()

    const handleLogOut = ()=>{
        authservices.authLogout()
        .then(()=>{
            dispatch(logout())
        })
    }

    return (
        <button
        className='inline-bock bg-[#414141] text-white px-6 py-2 duration-200 active:bg-red-500 rounded-full relative top-[-5px]'
        onClick={handleLogOut}
        >
            {children}
        </button>
    )
}
