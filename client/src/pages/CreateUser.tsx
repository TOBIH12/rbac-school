import Unauthorized from "./Unauthorized"

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
        </div>
      }
    </div>
  )
}

export default CreateUser
