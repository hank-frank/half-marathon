import React, { useState, useEffect } from 'react';

import EachWeek from './eachWeek.jsx';
import Now from './Now.jsx';

let novice2 = require('../../training/novice2.json');

function Main() {
    let [startDate, setStartDate] = useState(new Date('January 08, 2020 00:01:00'));
    let [currentWeek, setCurrentWeek] = useState(0);

    useEffect(() => {
        findWeek();
    }, [])

    let findWeek = () => {
        let now = new Date();
        var diff = (now - startDate) / 1000;
        diff /= (60 * 60 * 24 * 7);
        let weekAfterStart = Math.abs(Math.round(diff));
        setCurrentWeek(weekAfterStart);
        console.log(`week from findWeek: `, weekAfterStart);
    };

    return (
        <>
            <Now />
            <div className='centered-horizontal'> 
                <h6 className="time-label">It is week: {currentWeek}</h6>
            </div>
            <EachWeek 
                weekIndex = { currentWeek }
            />
        </>
    )
};

export default Main;
