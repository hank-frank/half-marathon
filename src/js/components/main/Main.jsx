import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

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
    const [stDt, setStDt] = useState(new Date(2025, 1, 1, 1));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(mockData);
    const [milesProgress, setMilesProgress] = useState(0);
    const [runsProgress, setRunsProgress] = useState(0);
    const [saveMessage, setSaveMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [startRedirect, setStartRedirect] = useState(false);
    const[saveVisible, setSaveVisible] = useState(false);
    const [started, setStarted] = useState(true);
    const [color2, setColor2] = useState(false);



    useEffect(() => {
        setRedirect(false);
        setStartRedirect(false);

        let userToken = document.cookie.split(' ')[1].split("=")[1];

        fetch('/getUserInfo', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userToken })
        }) 
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTrainingInfo(data);
                if (data.colorScheme === 1) {
                    setColor2(true);
                }
                const {startYear, startMonth, startDay} = data;
                let userStart = new Date(startYear, startMonth, startDay);
                if (typeof userStart == "object") {
                    setStDt(userStart);
                }
            })
            .catch((err) => {
                console.log(`Error: `, err)
        })
        
    }, [])

    useEffect(() => {
        findWeek();
    }, [stDt]);

    let findWeek = () => {
        let now = new Date();
        let diff = (now - stDt) / 1000;
        diff /= (60 * 60 * 24 * 7);
        if (diff <= 0) {
            setCurrentWeek(1);
            setViewWeek(1);
            setStarted(false);
        } else {
            let weekAfterStart = Math.abs(Math.round(diff));
            setCurrentWeek(weekAfterStart);
            setViewWeek(weekAfterStart);
            setStarted(true);
        }
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
            body: JSON.stringify({ trainingInfo, color2 })
        })
        .then(res=>res.json())
        .then((res) => {
            if (res.nModified === 0) {
                setSaveMessage("No changes made, no need to save");
                setSaveVisible(true);
                setTimeout(()=>{
                    setSaveMessage("");
                    setSaveVisible(false);
                }, 5000);
            } else if (res.nModified === 1) {
                setSaveMessage("Saved!");
                setSaveVisible(true);
                setTimeout(()=>{
                    setSaveMessage("");
                    setSaveVisible(false);
                }, 5000);
            }
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

    const logout = () => {
        fetch('/save', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trainingInfo, color2 })
        })
        .then(res=>res.json())
        .then((res) => {
            if (res.nModified === 0) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                setRedirect(true);
            } else if (res.nModified === 1) {
                setSaveMessage("Saved!");
                setSaveVisible(true);
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                setRedirect(true);
            }
            console.log(`response from Post on front: `, res)
        });
    }

    const newStartDate = () => {
        setStartRedirect(true);
    };
    
    const isVisible = () => {
        if (saveVisible) {
            return "block"
        } else {
            return "none"
        }
    }

    const gridWeek = (week) => {
        setViewWeek(week);
    };

    const colorSwap = () => {
        setColor2(!color2);
        console.log(`color2: `, color2);
    };

    return (
        <>
            <div className="color-switch-spacer">
                <label className="color-toggle-switch">
                    <input type="checkbox"  onChange={ colorSwap } checked={ color2 }/>
                    <span className="color-slider color-round"></span>
                </label>
                <h4>Color Scheme toggle</h4>
            </div>
            <button id="logout" onClick={ logout }>Logout</button>
            <button id="new-start" onClick={ newStartDate }>Set New Start Date</button>
            <Now 
                start = { startDate }
                strt = { stDt }
                currentWeek = { currentWeek }
                viewWeek = { viewWeek }
            />
            <div className="button-container">
                <button id="last-week" onClick={ lastWeek }>Last</button>
                <button id="save" onClick={ save }>Save</button>
                <button id="next-week" onClick={ nextWeek }>Next</button>
            </div>
            <div className="centered-horizontal">
                <h4 className="save-message" style={{display: `${isVisible()}`}}>{ saveMessage }</h4>
            </div>
            <EachWeek 
                trainingInfo = { trainingInfo.schedule }
                week = { viewWeek }
                checkToggle = { checkToggle }
                color2={ color2 }
            />
            <Grid 
                trainingInfo = { trainingInfo.schedule }
                gridWeek = { gridWeek }
                color2={ color2 }
            />
            { redirect ? <Redirect to="/Login" /> : "" }
            { startRedirect ? <Redirect to="/NewStart" /> : ""};
        </>
    )
};

export default Main;
