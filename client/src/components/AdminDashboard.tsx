import { Link } from "react-router-dom"
import { IoCreateOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiViewList } from "react-icons/ci";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import axiosInstance from "../config/axiosInstance";


const AdminDashboard = () => {
  const [studentsCount, setStudentsCount] = useState<number>(0)
  const [lecturersCount, setLecturersCount] = useState<number>(0)
  const [coursesCount, setCoursesCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      await axiosInstance
      .get(`/users/admin/view_users/1`)
      .then((res) => {
        setStudentsCount(res.data.data.totalStudents)
        setLecturersCount(res.data.data.totalLecturers);
        setCoursesCount(5);
         if(!res.data){
          setIsLoading(false)
        return setError("failed to fetch academic information from the server.")
       }
      })
    } catch (err: any) {
      if(err.response){
        console.log(err.response.data.error);
        setError(err.response.data.error);
      }else if(err.request){
        console.log("No response from server. Check network connection.");
        setError("No response from server. Check network connection.");
      }else {
      console.log("Error:", err.message);
      setError(`Error: ${err.message}`);
    }
    }
    setIsLoading(false)
  }
  
  useEffect(() =>{
      fetchStats();
      }, []);

if(isLoading){
    return <div className="loader">
      <Loader />
    </div>
  }

  return (
    <div className="w-full min-h-[90vh] bg-gray-100 mx-auto p-10">
      <h1 className="text-2xl md:text-3xl text-gray-800 mb-2">Overview</h1>
      <p className="text-gray-500">Academic Year 2025-2026 - 1st Semester</p>
      {error && <p className="bg-red-500 text-white p-4 my-3">{error}</p>}

      <div className="w-full flex flex-col md:flex-row flex-wrap my-10 gap-4">
        <div className="flex flex-col gap-5 w-full md:w-1/3 bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p>TOTAL STUDENTS</p>
            <h1>{studentsCount}</h1>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-1/3 bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p>ACTIVE COURSES</p>
            <h1>{coursesCount}</h1>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-1/3 bg-white p-4 border border-gray-200 rounded-md shadow-sm">
            <p>TEACHING STAFF</p>
            <h1>{lecturersCount}</h1>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl text-gray-800 my-4">Quick Actions</h1>
     <div className="flex flex-col md:flex-row w-full mt-5 gap-5">
        <Link to={'/create_user'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
        <h3 className="text-1xl mb-2">Manage Users</h3>
        <FaRegUser className="w-full text-2xl mb-5"/>
        <hr className="border border-gray-100 w-full"/>
        <hr className="border border-gray-100 w-full"/>
        </Link>
        <Link to={'/create_course'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
        <h3 className="text-1xl mb-2">Create new Course</h3>
        <IoCreateOutline className="w-full text-2xl mb-5"/>
        <hr className="border border-gray-100 w-full"/>
        <hr className="border border-gray-100 w-full"/>
        </Link>
        <Link to={'/create_announcement'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
        <h3 className="text-1xl mb-2">Create Announcements</h3>
        <TfiAnnouncement className="w-full text-2xl mb-5"/>
        <hr className="border border-gray-100 w-full"/>
        <hr className="border border-gray-100 w-full"/>
        </Link>
        <Link to={'/announcements'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
        <h3 className="text-1xl mb-2">View Announcements</h3>
        <CiViewList className="w-full text-2xl mb-5"/>
        <hr className="border border-gray-100 w-full"/>
        <hr className="border border-gray-100 w-full"/>
        </Link>
      </div>
    </div>
  )
}

export default AdminDashboard
