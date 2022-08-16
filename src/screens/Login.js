import React, { useState } from 'react'
import axios from 'axios';
import { config } from './../config';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import Loader1 from '../components/Loader1';
function Login() {
    // const navigate=useNavigate();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [error,seterror] = useState(false);
    const [loading, setloading] = useState(false);
    
    async function login(){
            const user={
                
                email,
                password
               
            }
            console.log(user);
            try {
                setloading(true);
                const result=await axios.post(`${config.api}/api/users/login`,user);
                const logdata=result.data;
                setloading(false);
                localStorage.setItem('user',JSON.stringify(logdata));
                // navigate('/home');
                window.location.href='/home'
            } catch (error) {
                setloading(false);
                seterror(true);
                console.log(error);
            }
        }
  return (
    <div>
        {loading && (<Loader1/>)}
        <div className='row justify-content-center pt-5 login-background'>
            <div className='col-md-5 mt-5'>
            {error && (<Error message="Invalid Credentials"/>)}
                <div className='box-shadow p-4 login'>
                    <h2 className='pad-10'>Login</h2>
                    
                    <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                    <input type='text' className='form-control' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                    
                <button className='btn btn-log mt-3' onClick={login}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
  
}

export default Login