import { useEffect } from "react";
import AdminDashboard from "../components/AdminDashboard"
import LecturerDashboard from "../components/LecturerDashboard";
import StudentDasboard from "../components/StudentDasboard";
import Announcements from "./Announcements";
import { useNavigate } from "react-router-dom";

const Home = () => {
 const currentUserRole = Number(localStorage.getItem('userRoleId'))
  const navigate = useNavigate();

   useEffect(() =>{
    if (!currentUserRole){
      navigate('/announcements');
    }  
        }, []);

  return (
    <div>
     {
       !currentUserRole &&
        <Announcements />
    }
      {
        currentUserRole === 11 &&
        <LecturerDashboard />
      }
      {
        currentUserRole === 12 &&
        <StudentDasboard />
      }
      {
        currentUserRole === 10 &&
        <AdminDashboard />
      }
    </div>
  )
}

export default Home
