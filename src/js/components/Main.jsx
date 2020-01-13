import React, { useState, useEffect } from 'react';

function Main() {
    let [currentDate, setCurrentDate] = useState();
    let [currentDateString, setCurrentDateString] = useState();

    // let date = new Date();

    useEffect(() => {
        setInterval(() => tick(), 1000);
    }, [])

    let tick = () => {
        let date = new Date();
        setCurrentDate(date);
        setCurrentDateString(date.toString());
    }

    return (
        <>
            <div className='centered-horizontal'> 
                <h6 className="current-time">{ currentDateString }</h6>
            </div>
        </>
    )
};

export default Main;
