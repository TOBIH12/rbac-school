import { useState } from "react";
import type { LoginUserInput } from "../types/dataTypes";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import { userAuth } from "../context/UserContext";


const Login = () => {
  const {login} = userAuth();
  const [userCred, setUserCred] = useState<LoginUserInput>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const changeInputHandler = (e: any) => {
    setUserCred(prevState => {
      return {...prevState, [e.target.name]: e.target.value }
    })
  };

  const loginUser = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance
      .post(`/users/login`, userCred)
      .then((res) => {
        console.log('User Logged In', res.data)
        login(res.data.data)
        navigate("/");
       if(!res.data){
      return setError("Couldn't login user. please try again")
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
      setError(`Error: ${err.message}`)
    }
    }
  }


  return (
    <div className="flex w-full h-[100vh] items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full items-center ">
        <h1 className="text-3xl text-gray-800 text-center font-bold">Sign In</h1>
        <form className="w-2/3 md:w-1/2 bg-white py-10 px-5 shadow-md rounded-md flex flex-col my-10 gap-5" onSubmit={loginUser}>
       { error && <p className="flex text-center justify-center bg-red-400 px-5 w-[fit-content]">{error}</p>}
        <input type="text" placeholder='Email' name='email' value={userCred.email} onChange={changeInputHandler} className="bg-gray-100 border-none px-3 py-1 rounded-md outline-none" autoFocus required/>
        <input type="password" placeholder='Password' name='password' value={userCred.password} onChange={changeInputHandler} className="bg-gray-100 border-none px-3 py-1 rounded-md outline-none"required/>
        <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-white cursor-pointer text-left w-[fit-content] py-1 px-4 rounded-md">Login</button>
      </form>
      <small>Don't have an account? Contact an Admin for further instruction.</small>
      </div>
    </div>
  )
}

export default Login
