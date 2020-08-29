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
    let _isMounted = false;
    const [startDate, setStartDate] = useState(new Date('June 01, 2020 00:01:00'));
    //try to remember why I was starting to convert to a different start date formnat?
    const [stDt, setStDt] = useState(new Date(2025, 1, 1, 1));
    const [currentWeek, setCurrentWeek] = useState(1);
    const [viewWeek, setViewWeek] = useState(1);
    const [trainingInfo, setTrainingInfo] = useState(mockData);
    const [milesProgress, setMilesProgress] = useState(0);
    const [runsProgress, setRunsProgress] = useState(0);
    const [saveMessage, setSaveMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [startRedirect, setStartRedirect] = useState(false);
    const [saveVisible, setSaveVisible] = useState(false);
    const [started, setStarted] = useState(true);
    const [color2, setColor2] = useState(false);


//get userDate on component load
    useEffect(() => {
        _isMounted = true;
        if (_isMounted){
            setRedirect(false);
            setStartRedirect(false);
        }

        let cookies = document.cookie.split(' ');
        let userToken;
        for (let cookie of cookies) {
            cookie = cookie.split("=");
            if (cookie[0] == 'token') {
                userToken = cookie[1];
            }
        };

        if (userToken) {
            const getUserData = async () => {
                try {
                    let userData = await fetch('/getUserInfo', {
                        method: 'post',
                        headers: {
                        'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userToken })
                    });

                    let jsonData = await userData.json();
                    if (_isMounted) {
                        setTrainingInfo(jsonData);

                        if (userData.colorScheme === 1) {
                            setColor2(true);
                        };

                        const {startYear, startMonth, startDay} = jsonData;
                        let userStart = new Date(startYear, startMonth, startDay);
                        if (typeof userStart == "object") {
                            setStDt(userStart);
                            setStartDate(userStart);
                        };
                    };

                } catch (err) {
                    console.log(`Error: `, err);
                };
            }
            if(_isMounted) {
                getUserData();
            }
        } else {
            console.log(`Error loading user data, Token is invalid.`)
        };

        return () => {
            _isMounted = false;
        }
    }, []);

// find correct week on component load or if the start date is updated
    useEffect(() => {
        if (_isMounted){
            findWeek();
        }
    }, [stDt, startDate]);
//TODO set message to tell user that they are viewing week 12 because they are finished. 
    let findWeek = () => {
        let now = new Date();
        let diff = (now - startDate) / 1000;
        diff /= (60 * 60 * 24 * 7);
        if (diff <= 0) {
            setCurrentWeek(1);
            setViewWeek(1);
            setStarted(false);
        } else {
            let weekAfterStart = Math.abs(Math.round(diff));
            console.log(weekAfterStart);
            setCurrentWeek(weekAfterStart);
            weekAfterStart > 12 ? setViewWeek(12) : setViewWeek(weekAfterStart);
            setStarted(true);
        }
    };

    const lastWeek = () => {
        if (viewWeek > 1) {
            setViewWeek(viewWeek-1)
        }
    };

    const nextWeek = () => {
        let numberOfWeeks = trainingInfo.schedule.length;
        if (viewWeek < numberOfWeeks) {
            setViewWeek(viewWeek+1)
        }
    };

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
    };

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
    };

    const newStartDate = () => {
        setStartRedirect(true);
    };
    
    const isVisible = () => {
        if (saveVisible) {
            return "block"
        } else {
            return "none"
        }
    };

    const gridWeek = (week) => {
        setViewWeek(week);
    };

    const colorSwap = () => {
        setColor2(!color2);
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
