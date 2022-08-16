import axios from 'axios'
import 'antd/dist/antd.css';
import moment from 'moment';
import { config } from './../config';
import React, { useEffect, useState } from 'react'
import Error from '../components/Error';
import Loader1 from '../components/Loader1';
import Room from '../components/Room';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState()
  const [hotels, sethotels] = useState([]);
  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('')
  let fetchdata = async () => {
    try {
      setloading(true);
      let getdata = (await axios.get(`${config.api}/api/rooms/getallrooms`)).data;
      setrooms(getdata);
      setduplicaterooms(getdata);
      setloading(false);
    }
    catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  }
  useEffect(() => {
    fetchdata()
  }, []);


  //date filter..............................................//

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))

    var temp = []
    for (var room of duplicaterooms) {
      var availability = false;

      for (var booking of room.currentbookings) {

        if (room.currentbookings.length) {
          if (
            !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
            !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {
            if (
              moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true;
            }
          }
        }


      }
      if (availability || room.currentbookings.length == 0) {
        temp.push(room)
      }
      setrooms(temp)
    }

  }

  //..........................................................................................//
  //search filter.............................................//
  function filterBysearch() {
    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
    setrooms(temprooms)

  }
  //.........................................................../
  //type filter.........................................................../
function filterByType(e){
  settype(e)
if(e!=='all'){
  const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase());
setrooms(temprooms);
}else{
  setrooms(duplicaterooms);
}
}


  return (
    <div className='container homescreen'>
      <div className='row mt-3 box-shadow py-3 bars'>
        <div className='col-md-4'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} className='range' />
        </div>
        <div className='col-md-6'>
          <input type='text' className='form-control' placeholder='Search Room' value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBysearch} />
        </div>
        <div className='col-md-2 '>
          <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className='row justify-content-center mt-3 '>
        {loading ? (<Loader1 />) : (rooms.map((room) => {
          return (<div className='col-md-11'>
            <Room room={room} fromdate={fromdate} todate={todate} />
          </div>)
        }))
        }
      </div>
    </div>
  )
}

export default Homescreen
