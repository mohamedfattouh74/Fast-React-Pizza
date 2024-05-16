import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"
export default function ProtectedRoute({children}){
    
    const user = useSelector(state=>state.user.username)
    console.log(user)
    const navigate = useNavigate()

    useEffect(()=>{
        if (!user)
        navigate('/')
    },[user,navigate])
    
    return user? children : null
}