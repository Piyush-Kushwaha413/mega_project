import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/authen';
import { login , logout } from './store/authsSilce';
import './App.css'
import { Header, Footer, EditPost, RTE,  Signup} from './Componentes/import';
import { Outlet } from 'react-router-dom';

function App() {
  
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login(userData));
      }else{
        dispatch(logout(userData))
      }

    })
    .catch((error)=>{
      console.log("error in getCurrentUser form dataBase"+error)
      
    }
    )
    .finally(
      setloading((pre)=>(!pre))
    )
  }, [])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          
       <Outlet />
        
        </main>
        {/* <Signup/> */}

        <Footer />
      </div>
    </div>
  ) : null
}

export default App
