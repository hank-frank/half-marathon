import React, { useState, useEffect } from 'react';

import EachWeek from './eachWeek.jsx';
import Now from './Now.jsx';

let novice2 = require('../../training/novice2-front.json');

function Main() {
    const [startDate, setStartDate] = useState(new Date('January 01, 2020 00:01:00'));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(novice2);
    const [trainingInfo2, setTrainingInfo2] = useState();

    useEffect(() => {
        findWeek();
        fetch('/getSchedule')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTrainingInfo2(data);
                console.log("Done: ", data);
            })
            .catch((err) => {
                console.log(`Error: `, err)
            })

            //cleanup funciton from useeffect, runs as component will unmount
            return () => {
                console.log("calling cleanup from useeffect");
                fetch('/cleanup', {
                    method: 'post',
                    headers: {
                      'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data})
                })
                .then(res=>res.json())
                .then(res => console.log(`response from Post on front: `, res));
            };
    }, [])

    let findWeek = () => {
        let now = new Date();
        var diff = (now - startDate) / 1000;
        diff /= (60 * 60 * 24 * 7);
        let weekAfterStart = Math.abs(Math.round(diff));
        setCurrentWeek(weekAfterStart);
        setViewWeek(weekAfterStart);
    };

    const lastWeek = () => {
        if (viewWeek > 1) {
            setViewWeek(viewWeek-1)
        }
    }

    const nextWeek = () => {
        let numberOfWeeks = trainingInfo.length;
        if (viewWeek < numberOfWeeks) {
            setViewWeek(viewWeek+1)
        }
    }

    const tester = () => {
        let data = trainingInfo2;
        console.log(`trainingInfo2 from tester: `, data);

        fetch('/cleanup', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        })
        .then(res=>res.json())
        .then(res => console.log(`response from Post on front: `, res));
    }

    return (
        <>
            <button onClick={ () => tester() }>Testing</button>
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
