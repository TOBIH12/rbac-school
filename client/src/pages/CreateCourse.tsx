import Unauthorized from "./Unauthorized"

const CreateCourse = () => {
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
        <Unauthorized />
      }
    </div>
  )
}

export default CreateCourse
