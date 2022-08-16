import { Tabs } from 'antd';
import axios from 'axios';
import { config } from './../config';
import React, { useEffect, useState } from 'react';
import Loader from "../components/Loader";
import Loader1 from "../components/Loader1";
// import Error from "../components/Error";
import Swal from 'sweetalert2';
const { TabPane } = Tabs;

function Adminscreen() {
useEffect(() => {
  if(!JSON.parse(localStorage.getItem('user')).isAdmin){
    Swal.fire('Oops','You Are Not An Admin','error').then(result=>{window.location.href='/home'});
    
  }
}, [])


    return (
        
        <div className='mx-4 my-1 box-shadow p-3'>
            <h2 className='text-center' style={{ fontSize: "30px" }}><b>Admin Pannel</b></h2>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom/>
                </TabPane>
                <TabPane tab="Users" key="4">
                <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

export function Bookings() {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function fetchdata() {
            try {
                setloading(true)
                const data = await (await axios.get(`${config.api}/api/bookings/getallbookings`)).data;
                // const result=await data.data;
                setbookings(data);
                setloading(false)
                console.log(bookings)
            } catch (error) {
                setloading(false)
                console.log(error);
            }
        }
        fetchdata()

    }, [])


    return (<div className='row'>
        {loading && <Loader />}
        <div className='col-md-12'>
            {/* <h1>{bookings.length}</h1> */}
            <table class="table table-bordered table-dark table-striped">
                <thead className='text-center'>
                    <tr>
                        <th scope="col">Booking Id</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Room</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {bookings.length && (bookings.map((e) => {
                        return (<tr>
                            <th scope="row">{e._id}</th>
                            <td>{e.userid}</td>
                            <td>{e.room}</td>
                            <td>{e.fromdate}</td>
                            <td>{e.todate}</td>
                            <td>{e.status}</td>
                        </tr>)
                    }))}

                </tbody>
            </table>

        </div>
    </div>)
}

export function Rooms() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function fetchdata() {
            try {
                setloading(true)
                const data = await (await axios.get(`${config.api}/api/rooms/getallrooms`)).data;
                // const result=await data.data;
                setrooms(data);
                setloading(false)
                console.log(rooms)
            } catch (error) {
                setloading(false)
                console.log(error);
            }
        }
        fetchdata()

    }, [])


    return (<div className='row'>
        {loading && <Loader1 />}
        <div className='col-md-12'>
            {/* <h1>{bookings.length}</h1> */}
            <table class="table table-bordered table-dark table-striped">
                <thead className='text-center'>
                    <tr>
                        <th scope="col">Room Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Rent Per Day</th>
                        <th scope="col">Max Count</th>
                        <th scope="col">Phone Number</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {rooms.length && (rooms.map((e) => {
                        return (<tr>
                            <th scope="row">{e._id}</th>
                            <td>{e.name}</td>
                            <td>{e.type}</td>
                            <td>{e.rentperday}</td>
                            <td>{e.maxcount}</td>
                            <td>{e.phonenumber}</td>
                        </tr>)
                    }))}

                </tbody>
            </table>

        </div>
    </div>)
}


export function Users(){
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        async function fetchdata() {
            try {
                setloading(true)
                const data = await (await axios.get(`${config.api}/api/users/getallusers`)).data;
                // const result=await data.data;
                setusers(data);
                setloading(false)
                console.log(users)
            } catch (error) {
                setloading(false)
                console.log(error);
            }
        }
        fetchdata()

    },[])

    return(
        <div className='row'>
            <div className='col-md-12'>
            <table class="table table-bordered table-dark table-striped">
                <thead className='text-center'>
                    <tr>
                        <th scope="col">User Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Is Admin</th>
                        
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {users.length && (users.map((e) => {
                        return (<tr>
                            <th scope="row">{e._id}</th>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.isAdmin ? "YES" : "NO"}</td>
                           
                        </tr>)
                    }))}

                </tbody>
            </table>
                
            </div>

        </div>
    )
}


export function Addroom(){
    const [loading, setloading] = useState(false);
    const [roomname,setroomname]=useState('');
    const [rentperday,setrentperday]=useState('');
    const [maxcount,setmaxcount]=useState('');
    const [description,setdescription]=useState('');
    const [phonenumber,setphonenumber]=useState('');
    const [type,settype]=useState('');
    const [location,setlocation]=useState('');
    const [rating,setrating]=useState('');
    const [facilities,setfacilities]=useState('');
    const [imageurl1,setimageurl1]=useState('');
    const [imageurl2,setimageurl2]=useState('');
    const [imageurl3,setimageurl3]=useState('');

    async function addroom(){
        // const newroom={
        //     roomname,rentperday,maxcount,description,phonenumber,type,facilities,imageurls:[imageurl1,imageurl2,imageurl3]
        // }
        const newroom={
            roomname,location,rating,rentperday,maxcount,description,phonenumber,type,facilities,imageurl1,imageurl2,imageurl3
        }
        try {
            setloading(true)
            console.log(newroom)
           const result=await axios.post(`${config.api}/api/rooms/addroom`,newroom) ;
           setloading(false)
           Swal.fire('Congratulations' , 'Room Added Successfully' , 'success').then(result=>{
            window.location.href='/home'
           })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Sorry' , 'Something went wrong' , 'error')
        }
    }
    return(
        <>
        <div className='row admin'>
            {loading && <Loader/>}
            {/* <h3 className="text-center" style={{fontSize:"30px"}}>Add Room</h3> */}
            <div className='col-md-6'>
                <input type="text" className="form-control" placeholder="Room Name" value={roomname} onChange={(e)=>{setroomname(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Location" value={location} onChange={(e)=>{setlocation(e.target.value)}}/>
                <input type="number" className="form-control" placeholder="Rent Per Day" value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>
                <input type="number" className="form-control" placeholder="Max Count" value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
                <input type="number" className="form-control" placeholder="Phone Number" value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
                
                
                
            </div>
            <div className='col-md-6'>
            <input type="text" className="form-control" placeholder="Type" value={type} onChange={(e)=>{settype(e.target.value)}}/>
            <input type="number" className="form-control" placeholder="Rating" value={rating} onChange={(e)=>{setrating(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Facilities" value={facilities} onChange={(e)=>{setfacilities(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL-1" value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL-2" value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}/>
                <input type="text" className="form-control" placeholder="Image URL-3" value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}/>
            
            </div>
           
        </div>
        <div className='row'>
             <div className="col-md-12 admin">
            <div className="text-right">
                <button className='btn btn-success mt-4 addroom' onClick={addroom}>Add Room</button>
            </div>
            </div>
        </div>
        </>
    )
}









