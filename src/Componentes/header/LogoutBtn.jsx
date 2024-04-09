import React from 'react'
import { logout } from '../../store/authsSilce';
import AuthService  from '../../appwrite/authen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function LogoutBtn() {
    const dispatch =  useDispatch();
    const navigate =  useNavigate()


    const userData =  useSelector((state)=>(state.userData))

    const logoutHandler = ()=>{
        AuthService.logOut(userData.$id)
        .then((res)=>{
          if (res) {
            navigate("/")
            dispatch(logout());
          }
        })
        .catch((err)=>{
          console.log("error"+err);

        })
       
        
    }
  


  return <button
  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  onClick={logoutHandler}>
    Logout
  </button>;
}

export default LogoutBtn