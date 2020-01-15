import React, { useState, useEffect } from 'react';

import EachWeek from './eachWeek.jsx';
import Now from './Now.jsx';

let novice2 = require('../../training/novice2.json');

function Main() {
    const [startDate, setStartDate] = useState(new Date('January 01, 2020 00:01:00'));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(novice2);

    useEffect(() => {
        findWeek();
    }, [])

    let findWeek = () => {
        let now = new Date();
        var diff = (now - startDate) / 1000;
        diff /= (60 * 60 * 24 * 7);
        let weekAfterStart = Math.abs(Math.round(diff));
        setCurrentWeek(weekAfterStart);
    };

    const lastWeek = () => {
        console.log(`viewWeek: `, viewWeek)
        if (viewWeek > 1) {
            setViewWeek(viewWeek-1)
        }
    }

    const nextWeek = () => {
        console.log(`viewWeek: `, viewWeek);
        let numberOfWeeks = trainingInfo.length;
        if (viewWeek < numberOfWeeks) {
            setViewWeek(viewWeek+1)
        }
    }

    return (
        <>
            <Now />
            <div className='centered-horizontal'> 
                <h6 className="time-label">It is week: { currentWeek }</h6>
            </div>
            <div className='centered-horizontal'> 
                <h6 className="time-label">Currently viewing week: { viewWeek }</h6>
            </div>
            <div className="button-container">
                <button id="last-week" onClick={ lastWeek }>Last</button>
                <button id="next-week" onClick={ nextWeek }>Next</button>
            </div>
            <EachWeek 
                trainingInfo = { trainingInfo }
                week = { viewWeek }
            />
        </>
    )
};

export default Main;
