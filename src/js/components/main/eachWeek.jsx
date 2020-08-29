import React, { useState, useEffect } from 'react';


function EachWeek(props) {
    let _isMounted = false;
    const [thisWeek, setThisWeek] = useState(1);
    const [schedule, setSchedule] = useState(props.trainingInfo);

    useEffect(() => {
        _isMounted = true;

        if(_isMounted) {
            setThisWeek(props.week);
            setSchedule(props.trainingInfo)  
        }
        
        return () => {
            _isMounted = false;
        }
    }, [props]);

    const add2 = () => {
        if (props.color2) {
            return "2"
        } else {
            return "";
        }
    };

    return (
        <>
        <div className="runs-center">
            <div className="runs-wrapper">
                {   
                    schedule[thisWeek-1]?.runs.map((run) => {
                        if (run.complete == true) {
                            return (
                                <div className={`run-border-complete${add2()}`} key={ run.runId }>
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
                                <div className={`run-border-not${add2()}`} key={ run.runId }>
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
            <div className={ schedule[thisWeek-1]?.runsProgress === 100 ? `bar-done${add2()}` : `runs-bar${add2()}` }>
                <div className={ schedule[thisWeek-1]?.runsProgress === 100 ? `progress-done${add2()}` : `runs-progress${add2()}` } style={{width: `${schedule[thisWeek-1]?.runsProgress}%`}}>
                    <p className={ schedule[thisWeek-1]?.runsProgress > 15 ? "progress-text" : "no-show" }>Runs done</p>
                </div>
            </div>
        </div>
        <div className="progress-wrapper">
            <div className={ schedule[thisWeek-1]?.runsProgress === 100 ? `bar-done${add2()}` : `runs-bar${add2()}` }>
                <div className={ schedule[thisWeek-1]?.runsProgress === 100 ? `progress-done${add2()}` : `miles-progress${add2()}` } style={{width: `${schedule[thisWeek-1]?.milesProgress}%`}}>
                <p className={ schedule[thisWeek-1]?.runsProgress > 15 ? "progress-text" : "no-show" }>Miles done</p>
                </div>
            </div>
        </div>
        {/* <button onClick={ testing }>each week Testing</button> */}
        </>
    )
};

export default EachWeek;
