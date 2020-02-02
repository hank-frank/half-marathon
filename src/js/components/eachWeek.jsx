import React, { useState, useEffect } from 'react';


function EachWeek(props) {
    const [thisWeek, setThisWeek] = useState(1);
    const [schedule, setSchedule] = useState(props.trainingInfo);

    useEffect(() => {
        setThisWeek(props.week);
        setSchedule(props.trainingInfo)        
    }, [props]);

    const testing = () => {
        console.log(schedule);
    }

    return (
        <>
        <div className="runs-center">
            <div className="runs-wrapper">
                {   
                    schedule[thisWeek-1]?.runs.map((run) => {
                        if (run.complete == true) {
                            return (
                                <div className="run-border-complete" key={ run.runId }>
                                    <div className='center-run-text'>
                                        <div className="switch-spacer">
                                            <label className="toggle-switch">
                                                <input type="checkbox"  onChange={ () => props.checkToggle(run.runId) } checked={ run.complete }/>
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
                                                <input type="checkbox"  onChange={ () => props.checkToggle(run.runId) } checked={ run.complete }/>
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
                <div className="runs-progress" style={{width: `${schedule[thisWeek-1]?.runsProgress}%`}}></div>
            </div>
        </div>
        <div className="progress-wrapper">
            <div className="miles-bar">
                <div className="miles-progress" style={{width: `${schedule[thisWeek-1]?.milesProgress}%`}}></div>
            </div>
        </div>
        <button onClick={ testing }>each week Testing</button>
        </>
    )
};

export default EachWeek;
