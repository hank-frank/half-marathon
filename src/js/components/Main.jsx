import React, { useState, useEffect } from 'react';

import EachWeek from './eachWeek.jsx';
import Now from './Now.jsx';

let novice2 = require('../../training/novice2-front.json');
let mockData = {
    "_id": "test Id",
    "name": "Thomas Buttcheeks",
    "schedule": novice2
}

function Main() {
    const [startDate, setStartDate] = useState(new Date('January 01, 2020 00:01:00'));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(mockData);
    const [trainingInfo2, setTrainingInfo2] = useState(mockData);
    const [milesProgress, setMilesProgress] = useState(0);
    const [runsProgress, setRunsProgress] = useState(0);

    useEffect(() => {
        findWeek();
        fetch('/getSchedule')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // setTrainingInfo2(data);
                setTrainingInfo(data);
                console.log("info from fetch in useEffect: ", data);
            })
            .catch((err) => {
                console.log(`Error: `, err)
            })

            //cleanup funciton from useeffect, runs as component will unmount
            // return () => {
            //     console.log("calling cleanup from useeffect");
            //     fetch('/cleanup', {
            //         method: 'post',
            //         headers: {
            //           'Accept': 'application/json, text/plain, */*',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({data})
            //     })
            //     .then(res=>res.json())
            //     .then(res => console.log(`response from Post on front: `, res));
            // };
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
        let numberOfWeeks = trainingInfo.schedule.length;
        if (viewWeek < numberOfWeeks) {
            setViewWeek(viewWeek+1)
        }
    }

    const checkToggle = (id) => {
        let full = trainingInfo;
        let temp = trainingInfo.schedule;
        let milesPossible = 0;
        let milesDone = 0;
        let runsPossible = temp[viewWeek-1].runs.length;
        let runsDone = 0;

        temp[viewWeek-1]?.runs.forEach((run) => {
            milesPossible += run.miles;
            
            if (id === run.runId) {
                run.complete = !run.complete
            }
            if (run.complete === true) {
                runsDone++
                milesDone+= run.miles;
            }

        })
        let runsPercent = (runsDone / runsPossible).toFixed(2) * 100;
        let milesPercent = (milesDone / milesPossible).toFixed(2) * 100;
        
        setMilesProgress(milesPercent);
        setRunsProgress(runsPercent);
        temp[viewWeek-1].runsProgress = runsPercent;
        temp[viewWeek-1].milesProgress = milesPercent;
        full.schedule = temp;
        setTrainingInfo(full);
    };

    const tester = () => {
        console.log(`trainingInfo: `, trainingInfo);
        console.log(`trainingInfo2: `, trainingInfo2);
        // // let data = trainingInfo;
        // console.log(`trainingInfo2 from tester: `, trainingInfo2);

        // fetch('/cleanup', {
        //     method: 'post',
        //     headers: {
        //       'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ trainingInfo2 })
        // })
        // .then(res=>res.json())
        // .then(res => console.log(`response from Post on front: `, res));
    }

    return (
        <>
            <button onClick={ tester }>Testing</button>
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
                trainingInfo = { trainingInfo.schedule }
                week = { viewWeek }
                checkToggle = { checkToggle }
            />
        </>
    )
};

export default Main;
