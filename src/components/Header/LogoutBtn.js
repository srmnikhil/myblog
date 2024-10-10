import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
      localStorage.removeItem('userSession')
      navigate('/login')
    },
  )
  }
  return (
    <button className='inline-block px-6 py-2 bg-red-500 duration-200 hover:bg-red-700 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
