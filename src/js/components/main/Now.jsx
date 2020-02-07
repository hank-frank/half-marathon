import React, { useState, useEffect } from 'react';

function Now() {
    let [currentDate, setCurrentDate] = useState();
    let [currentDateString, setCurrentDateString] = useState();

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
                <h6 className="time-label">The current date and time is:</h6>
            </div>
            <div className='centered-horizontal'> 
                <h6 className="current-time">{ currentDateString }</h6>
            </div>
        </>
    )
};

export default Now;
