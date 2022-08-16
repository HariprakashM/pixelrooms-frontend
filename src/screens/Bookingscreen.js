

import { config } from './../config';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "react-router-dom";

AOS.init({
    duration:'1000'
});

function Bookingscreen({ match }) {
    const params=useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    if(!localStorage.getItem('user')){
        Swal.fire('Oops' , 'Login, before Booking Room' , 'error').then(result=>{
            window.location.href='/login'})
        
    }
    let fetchdata = async () => {
    if(!localStorage.getItem('user')){
      window.location.reload='/login'
    }
    try {
      setloading(true);
      const data = (
        await axios.post(`${config.api}/api/rooms/getroombyid`, {
          roomid: params.roomid,
        })
      ).data;
      settotalamount(data.rentperday * totaldays);
      setroom(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }}
    fetchdata();
  }, []);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("user"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    try {
      setloading(true);
      const result = await axios.post(`${config.api}/api/bookings/bookroom`, bookingDetails);
      setloading(false);
      Swal.fire('Congratulations' , 'Your Room Booked Successfully' , 'success').then(result=>{
       window.location.href='/profile'
      })
    } catch (error) {
        setloading(false);
        console.log(error);
    
    Swal.fire('Sorry' , 'Something went wrong' , 'error')
  }
}

  return (
    <div className="m-5" data-aos="flip-up">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-6 bs-font">
              <div style={{ textAlign: "center" }}>
                <h1>Booking Details</h1>
                <hr />
                <b >
                  <p>
                    Name :
                    {JSON.parse(localStorage.getItem("user")).name}
                  </p>
                  <p>From Date : {params.fromdate} </p>
                  <p>To Date : {params.todate} </p>
                  <p>Max Count : {`${room.maxcount} persons`}</p>
                </b>
              </div>
              <div style={{ textAlign: "center" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {`${totaldays-1} days`} </p>
                  <p>Rent per day : {room.rentperday} </p>
                  <p>Total Amount : {totalamount} /-</p>
                </b>
              </div>
              <div style={{ textAlign: "center" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
                  currency='INR'
                >
                  <button className="btn btn-primary paynow">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;