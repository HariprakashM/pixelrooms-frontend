import { Tabs } from 'antd';
import axios from 'axios';
import { config } from './../config';
import { Divider, Tag } from 'antd';
import Loader1 from "../components/Loader1";
import Error from "../components/Error";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
const { TabPane } = Tabs;

function Profilescreen() {
    const loguser = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (!loguser) {
            // Swal.fire('Oops','Please Login','error')
            window.location.href = '/login';
        }


    }, [])



    return (
        <div className='mx-4 my-1 '>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1 ><MyProfile /></h1>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <h1 ><MyBookings /></h1>
                </TabPane>

            </Tabs>
        </div>
    )
}

export default Profilescreen;


export function MyProfile() {
    const loguser = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            {/* <h1>Name:{loguser.name}</h1>
            <h1>Email:{loguser.email}</h1>
            <h1>isAdmin:{loguser.isAdmin ? "YES" : "NO"}</h1> */}
 <section class="vh-100" style={{backgroundColor: "#f4f5f7"}}>
  <div class="container py-1 h-100">
    <div class="row d-flex justify-content-center align-items-center h-80">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card mb-3 mt-2" style={{borderRadius: ".5rem"}}>
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white"
              style={{borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="Avatar" class="img-fluid my-5 pt-2" style={{width: "160px",height:"200px"}} />
              <h5>{loguser.name}</h5>
              <p>Web Designer</p>
              <i class="far fa-edit "></i>
            </div>
            <div class="col-md-8 py-2">
              <div class="card-body px-4 ">
                <h6>Information</h6>
                <hr class="mt-0 mb-1"/>
                <div class="row pt-1">
                  <div class="col-8 mb-2">
                    <h6>Email:</h6>
                    <p class="text-muted">{loguser.email}</p>
                  </div>
                  <div class="row ">
                  <div class="col-8 mb-2">
                    <h6>Phone:</h6>
                    <p class="text-muted">{loguser.phonenumber}</p>
                  </div>
                  </div>
                  
                </div>
                <h6>Admin Status</h6>
                <hr class="mt-0 mb-1"/>
                <div class="row pt-1">
                  <div class="col-8 ">
                    <h6>Is Admin:</h6>
                    <p class="text-muted">{loguser.isAdmin ? "YES" : "NO"}</p>
                  </div>
                  
                </div>
                {/* <div class="d-flex justify-content-start">
                  <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
    )
}


export function MyBookings() {
    const loguser = JSON.parse(localStorage.getItem('user'));
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const booking = await (await axios.post(`${config.api}/api/bookings/getbookingsbyuserid`, { userid: loguser._id })).data;
                setbookings(booking)
                console.log(booking)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(error)
            }
        }
        fetchData()


    }, [])

    async function cancelBooking(bookingid,roomid){
        try {
            setloading(true);
            const result=await axios.post(`${config.api}/api/bookings/cancelbooking`,{bookingid,roomid});
            const res=await result.data;
            console.log(res);
            setloading(false);
            Swal.fire('Congurats','Your booking has been cancelled','success').then(result=>{window.location.reload()})
        } catch (error) {
            setloading(false)
            console.log(error);
            Swal.fire('Oops','Cancellation failed, Try again later','error')
        }
    }
    return (
        <div>
            <div className='row'>
            {loading && <Loader1 />}
                <div className='col-md-10'>
                    
                    {bookings && (bookings.map((e) => {
                        return (<div className='box-shadow p-3 b-det'>
                            <h1><b>Room Name:</b>{e.room}</h1>
                            <p><b>BookingId:</b>{e._id}</p>
                            <p><b>Check In:</b>{e.fromdate}</p>
                            <p><b>Check Out:</b>{e.todate}</p>
                            <p><b>Total Amount:</b>{e.totalamount}</p>
                            <p><b>Status:</b>{e.status == 'booked' ? (<Tag color="green">CONFIRMED</Tag>) : (<Tag color="red">CANCELLED</Tag>)}</p>

                            {e.status !== 'cancelled' && (
                                <div className='cancel-btn'>
                                <button className='btn btn-warning ' onClick={()=>{cancelBooking(e._id , e.roomid)}}>Cancel Booking</button>
                            </div>
                            )}

                        </div>)
                    }))}
                </div>
            </div>
        </div>
       
    )
}

