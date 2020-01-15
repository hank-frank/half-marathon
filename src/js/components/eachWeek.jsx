import React, { useState, useEffect } from 'react';


function EachWeek(props) {
    const [thisWeek, setThisWeek] = useState(1);
    const [schedule, setSchedule] = useState(props.trainingInfo);
    const [testState, setTestState] = useState(false);
    const [milesProgress, setMilesProgress] = useState(0);
    const [runsProgress, setRunsProgress] = useState(0);

    useEffect(() => {
        setThisWeek(props.week);        
    }, [props])

    const checkToggle = (id) => {
        
        let temp = schedule;
        let milesPossible = 0;
        let milesDone = 0;
        let runsPossible = temp[thisWeek-1].runs.length;
        let runsDone = 0;

        temp[thisWeek-1].runs.forEach((run) => {
            milesPossible += run.miles;
            
            if (id === run.runId) {
                run.complete = !run.complete
            }
            if (run.complete === true) {
                runsDone++
                milesDone+= run.miles;
            }

        })
        setSchedule(temp);
        let runsPercent = (runsDone / runsPossible).toFixed(2) * 100;
        let milesPercent = (milesDone / milesPossible).toFixed(2) * 100;

        setMilesProgress(milesPercent);
        setRunsProgress(runsPercent);
        
    };

    const testing = () => {
        
        setTestState(!testState);
    }

    return (
        <>
        <div className="runs-center">
            <div className="runs-wrapper">
                {   
                    schedule[thisWeek-1].runs.map((run) => {
                        if (run.complete == true) {
                            return (
                                <div className="run-border-complete" key={ run.runId }>
                                    <div className='center-run-text'>
                                        <div className="switch-spacer">
                                            <label className="toggle-switch">
                                                <input type="checkbox"  onChange={ () => checkToggle(run.runId) } checked={ run.complete }/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <p className="miles-text">{ run.miles } mi</p>
                                    </div>
                                </div>
                            )
                        } else if (run.complete == false) {
                            return (
                                <div className="run-border-not" key={ run.runId }>
                                    <div className='center-run-text'>
                                        <div className="switch-spacer">
                                            <label className="toggle-switch">
                                                <input type="checkbox"  onChange={ () => checkToggle(run.runId) } checked={ run.complete }/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <p className="miles-text">{ run.miles } mi</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
        <div className="progress-wrapper">
            <div className="runs-bar">
                <div className="runs-progress" style={{width: `${runsProgress}%`}}></div>
            </div>
        </div>
        <div className="progress-wrapper">
            <div className="miles-bar">
                <div className="miles-progress" style={{width: `${milesProgress}%`}}></div>
            </div>
        </div>
        <button onClick={ () => testing() }>Testing</button>
        </>
    )
};

export default EachWeek;
