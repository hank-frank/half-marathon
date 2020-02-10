import React, { useState, useEffect } from 'react';

import EachWeek from './eachWeek.jsx';
import Now from './Now.jsx';
import Grid from './Grid.jsx';

let novice2 = require('../../../training/novice2-front.json');
let mockData = {
    "_id": "test Id",
    "name": "Thomas Buttcheeks",
    "schedule": novice2
}

function Main(props) {
    const [startDate, setStartDate] = useState(new Date('January 01, 2020 00:01:00'));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(mockData);
    const [milesProgress, setMilesProgress] = useState(0);
    const [runsProgress, setRunsProgress] = useState(0);
    const [saveMessage, setSaveMessage] = useState("");

    useEffect(() => {
        findWeek();

        fetch('/getSchedule')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTrainingInfo(data);
                console.log("info from fetch in useEffect: ", data);
            })
            .catch((err) => {
                console.log(`Error: `, err)
            })

            // return () => {
            //     console.log("calling cleanup");
                
            // }
            console.log(`user: `, props);
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

    const save = () => {
        fetch('/save', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trainingInfo })
        })
        .then(res=>res.json())
        .then((res) => {
            if (res.nModified === 0) {
                setSaveMessage("No changes made, no need to save");
                setTimeout(()=>{
                    setSaveMessage("");
                }, 5000);
            } else if (res.nModified === 1) {
                setSaveMessage("Saved!");
                setTimeout(()=>{
                    setSaveMessage("");
                }, 5000);
            }
            console.log(`response from Post on front: `, res)
        });
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
                <button id="save" onClick={ save }>Save</button>
                <button id="next-week" onClick={ nextWeek }>Next</button>
            </div>
            <div className="centered-horizontal">
                <h4 className="save-message">{ saveMessage }</h4>
            </div>
            <EachWeek 
                trainingInfo = { trainingInfo.schedule }
                week = { viewWeek }
                checkToggle = { checkToggle }
            />
            <Grid 
                trainingInfo = { trainingInfo.schedule }
            />
        </>
    )
};

export default Main;
