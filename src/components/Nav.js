import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { FaStaylinked } from 'react-icons/fa';
function Nav() {
  // const navigate=useNavigate();
  const loguser = JSON.parse(localStorage.getItem("user"));
  function logout(){
    localStorage.clear();
    // navigate('/login')
    window.location.href='/login'
  }
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand px-3" href="/home" style={{fontSize:"25px"}}><FaStaylinked style={{color:"white",fontSize:"40px"}}/>{` Pixel Rooms`}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{color:"white"}}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav px-4">
            {loguser ? (<>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <i className='fa fa-user'/> {loguser.name}
                </button>
                <ul class="dropdown-menu ">
                <li><a class="dropdown-item" href="/home">Home</a></li>
                  <li><a class="dropdown-item" href="/profile">Profile</a></li>
                  <li><a class="dropdown-item" href="/admin">Admin</a></li>
                  <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                </ul>
              </div>
            </>) : (<>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/register" style={{fontSize:"20px"}}>Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" style={{fontSize:"20px"}}>Login</a>
              </li>
            </>)}


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
