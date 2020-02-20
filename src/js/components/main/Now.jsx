import React, { useState, useEffect } from 'react';

function Now(props) {
    let [currentDate, setCurrentDate] = useState();
    let [currentDateString, setCurrentDateString] = useState();

    useEffect(() => {
        setInterval(() => tick(), 1000);
        console.log(typeof props.strt )
    }, [])

    let tick = () => {
        let date = new Date();
        setCurrentDate(date);
        setCurrentDateString(date.toString());
        
    }

    return (
        <>
            <div className="top-bar">
                <div className="top-info">
                    <h6 className="time-label">Start date: { props.start.toDateString() }</h6>
                    <h6 className="time-label">New Start date: { props.strt.toDateString() }</h6>
                    <h6 className="time-label">Today: { currentDateString }</h6>
                    <h6 className="time-label">It is week: { props.currentWeek }</h6>
                    <h6 className="time-label">Viewing week: { props.viewWeek }</h6>
                </div>
            </div>
        </>
    )
};

export default Now;
