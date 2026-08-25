import { userAuth } from "../context/UserContext"
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";

const StudentDasboard = () => {
  const {user} = userAuth();

  return (
    <div className="w-full min-h-[90vh] bg-gray-100 mx-auto p-10">
     <h1 className="text-2xl md:text-3xl text-gray-800 mb-2">Student Dashboard</h1>
     <p className="text-gray-500">Academic Year 2025-2026 - 1st Semester</p>

<div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl text-gray-800 mb-2 mt-4">{user?.firstName} {user?.lastName}</h1>
    <p className="text-gray-500 mb-[10rem]">Matriculation No: CS3452290</p>



      <h1 className="text-2xl md:text-3xl text-gray-800 my-4">Quick Actions</h1>
         <div className="flex flex-col md:flex-row w-full mt-5 gap-5">
            <Link to={'/view_grades'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
            <h3 className="text-1xl mb-2">View grades</h3>
            <CiViewTable className="w-full text-2xl mb-5"/>
            <hr className="border border-gray-100 w-full"/>
            <hr className="border border-gray-100 w-full"/>
            </Link>
            <Link to={'/enroll_course'} className="flex flex-col gap-1 bg-gray-900 hover:bg-gray-800 text-white w-1/2 md:w-1/5 py-3 px-4 justify-center items-center rounded-lg transition-all ease-in duration-1000s">
            <h3 className="text-1xl mb-2">Enroll Course</h3>
            <IoCreateOutline className="w-full text-2xl mb-5"/>
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
    </div>
  )
}

export default StudentDasboard
