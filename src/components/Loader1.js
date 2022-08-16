import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
function Loader1() {
    let [loading, setLoading] = useState(true);

    return (
        <div className='loader1'>
        <div className="sweet-loading  " >


            <HashLoader color='#000' loading={loading} css='' size={116} />
        </div></div>
    )
}

export default Loader1