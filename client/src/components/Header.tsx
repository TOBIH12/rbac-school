import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { userAuth } from "../context/UserContext";


const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("")
  const { user } = userAuth()

  const handleMenu = () => {
      setShowMobileMenu((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setShowMobileMenu(false)
  }

  const handleUserRole = () => {
    if(user?.roleId == 10){
      setUserRole("Admin");
    }else if(user?.roleId == 11){
      setUserRole("Lecturer");
    }
    setUserRole("Student");
  }

  useEffect(() => {
    handleUserRole();
  }, []);

  return (
    <div className="w-full items-center mb-15 overflow-hidden">
      <div className="fixed top-0 w-full hidden lg:flex items-center px-10 py-2 justify-between shadow-md bg-white">

    <Link to={'/'} className="flex gap-2">
        <FaGraduationCap className="text-2xl md:text-3xl"/>
        <h1 className="text-2xl md:text-3xl cursor-pointer">Freeton University</h1>
    </Link>


      <ul className="flex font-semibold ">

       { 
       user ? 
       <div className="flex items-center gap-2">
        <h1>{user.lastName + " " + user.firstName}</h1>
        <p>|</p>
        <p>{ userRole }</p>
         <Link to={'/logout'} className="my-3 mx-4 text-red cursor-pointer transition-all ease-in duration-1000s hover:text-red-500">Logout</Link>
       </div> :
        <Link to={'/login'} className="my-3 mx-4 cursor-pointer transition-all ease-in duration-1000s hover:opacity-[0.6]">Login</Link>
        }

      </ul>
      </div>

      {/* MOBILE MENU */}

      <div className={`flex lg:hidden w-full h-16 items-center bg-white justify-between p-5 rounded-sm ${!showMobileMenu && 'shadow-md'} fixed top-0 z-10`}>
      <Link to={'/'} className="flex gap-2">
        <FaGraduationCap className="text-2xl md:text-3xl"/>
        <h1 className="text-2xl md:text-3xl cursor-pointer">Freeton University</h1>
    </Link>

      <div >
        {
          !showMobileMenu ?
          <IoMdMenu className="text-2xl md:text-3xl cursor-pointer" onClick={handleMenu}/>
          : 
          <IoMdClose className="text-2xl md:text-3xl cursor-pointer" onClick={handleMenu}/> 

        }

          {
            <div className={`flex flex-col  ${showMobileMenu ? "top-5" : 'top-[-20rem]'} w-full px-2 py-2 bg-white shadow-md rounded-2xl border-none fixed left-0 transition-all duration-300 ease-in z-[-999]`}>

              <ul className="flex flex-col text-sm font-semibold py-10">
            {
              user ? 
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 mb-4 mx-4">
                <h1>{user.firstName + " " + user.lastName}</h1>
                <p>|</p>
                  <p>{ userRole }</p>
                </div>
                <Link to={'/logout'} onClick={closeMobileMenu} className="mx-4 pt-5 border-t border-gray-200 cursor-pointer">Logout</Link>
              </div> :
                <Link to={'/login'} onClick={closeMobileMenu}className="mx-4 py-4 border-t border-gray-200 cursor-pointer hover:text-red-500">Login</Link>

            }
            </ul>
      
            </div>
          }

      </div>

      </div>

    </div>
  )
}

export default Header
