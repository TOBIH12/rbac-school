import {useNavigate} from 'react-router-dom'
import { userAuth } from '../context/UserContext.jsx'
import { useEffect } from 'react';

const Logout = () => {
  const {logout} = userAuth();
  const navigate = useNavigate();
 
  useEffect(() => {
     logout();
     navigate("/login");
    }, []);
  
  return (
    <>
    
    </>
  )
}

export default Logout;