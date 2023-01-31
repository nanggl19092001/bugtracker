import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import { AppContext } from '../Context/AppContext';
import { SERVER_DOMAIN } from '../utils/Constaint'

function Register() {
    const {setNotify} = useContext(AppContext)

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
      };
      const handleLastName = (e) => {
        setLastName(e.target.value);
      };
     
      const handleEmail = (e) => {
        setEmail(e.target.value);
      };
     
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };
      const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //check information
        if(password !== confirmPassword){
            setMessage('Confirm Password not match');
            return;
        }
        try {
            let res = await fetch(`${SERVER_DOMAIN}/auth/signup`, {
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    email:email,
                    firstname: firstName,
                    lastname: lastName,
                    password: password             
                }),
            })
            let resJson = await res.json()
            if(resJson.status === 200){
                setNotify('Register Successfully')
                console.log("Register Successfully");
                navigate('/login')
            }else{
                setMessage(resJson.message)
            }
            console.log(firstName,lastName,email,password,confirmPassword);
        } catch (error) {
            console.log(error);
        }
    
    }
    return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
            <h2 className="text-center font-bold text-3xl py-2 text-blue-600">Register Form</h2>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  value={email ? email : ''}
                  onChange={handleEmail}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="First Name"
                  value={firstName? firstName : ''}
                  onChange={handleFirstName}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last Name"
                  value={lastName? lastName:''}
                  onChange={handleLastName}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  value={password?password:''}
                  onChange={handlePassword}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm password"
                  value={confirmPassword?confirmPassword:''}
                  onChange = {handleConfirmPassword}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Do have an account?
                  <a
                    href="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </a>
                </p>
                {message ? 
                <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">
                {message}
                </div> : ''}
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
