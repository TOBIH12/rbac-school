import Unauthorized from "./Unauthorized"
import { FaPlus } from "react-icons/fa";

const CreateUser = () => {
  const currentUserRole = Number(localStorage.getItem('userRoleId'))
  

  
  return (
    <div>
      {
         !currentUserRole &&
        <Unauthorized />
      }
      {
        currentUserRole !== 10 &&
        <Unauthorized />
      }
      {
       currentUserRole === 10 &&
        <div className="w-full min-h-[90vh] bg-gray-100 mx-auto p-10">
           <h1 className="text-2xl md:text-3xl text-gray-800 mb-2">Create User</h1>
           <p>click the add button to create user</p>
                <FaPlus />
        </div>
      }
    </div>
  )
}

export default CreateUser
