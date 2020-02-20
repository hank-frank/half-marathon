import React, { useState, useEffect } from 'react';

function Grid(props) {
    const [sched, setSched] = useState(props.trainingInfo);

    useEffect(() => {
        setSched(props.trainingInfo)
    }, [props]);

    const renderColor = (complete) => {
        if (complete) {
            return '#8ECC69'
        } else {
            return "#FF9C91"
        }
    }

    return (
        <>
        <div className="centered-horizontal">
            <h6 className="grid-label">Full schedule grid:</h6>
        </div>
        <div className="grid-container">
            <div className="row1">
                <div id="week-1-1" style={{backgroundColor: renderColor(sched[0].runs[0].complete)}}></div>
                <div id="week-1-2" style={{backgroundColor: renderColor(sched[0].runs[1].complete)}}></div>
                <div id="week-1-3" style={{backgroundColor: renderColor(sched[0].runs[2].complete)}}></div>
                <div id="week-1-4" style={{backgroundColor: renderColor(sched[0].runs[3].complete)}}></div>
                <div id="week-2-1" style={{backgroundColor: renderColor(sched[1].runs[0].complete)}}></div>
                <div id="week-2-2" style={{backgroundColor: renderColor(sched[1].runs[1].complete)}}></div>
                <div id="week-2-3" style={{backgroundColor: renderColor(sched[1].runs[2].complete)}}></div>
                <div id="week-2-4" style={{backgroundColor: renderColor(sched[1].runs[3].complete)}}></div>
                <div id="week-3-1" style={{backgroundColor: renderColor(sched[2].runs[0].complete)}}></div>
                <div id="week-3-2" style={{backgroundColor: renderColor(sched[2].runs[1].complete)}}></div>
                <div id="week-3-3" style={{backgroundColor: renderColor(sched[2].runs[2].complete)}}></div>
                <div id="week-3-4" style={{backgroundColor: renderColor(sched[2].runs[3].complete)}}></div>
                <div id="week-4-1" style={{backgroundColor: renderColor(sched[3].runs[0].complete)}}></div>
                <div id="week-4-2" style={{backgroundColor: renderColor(sched[3].runs[1].complete)}}></div>
                <div id="week-4-3" style={{backgroundColor: renderColor(sched[3].runs[2].complete)}}></div>
                <div id="week-4-4" style={{backgroundColor: renderColor(sched[3].runs[3].complete)}}></div>
                <div id="week-5-1" style={{backgroundColor: renderColor(sched[4].runs[0].complete)}}></div>
                <div id="week-5-2" style={{backgroundColor: renderColor(sched[4].runs[1].complete)}}></div>
                <div id="week-5-3" style={{backgroundColor: renderColor(sched[4].runs[2].complete)}}></div>
                <div id="week-5-4" style={{backgroundColor: renderColor(sched[4].runs[3].complete)}}></div>
                <div id="week-6-1" style={{backgroundColor: renderColor(sched[5].runs[0].complete)}}></div>
                <div id="week-6-2" style={{backgroundColor: renderColor(sched[5].runs[1].complete)}}></div>
                <div id="week-6-3" style={{backgroundColor: renderColor(sched[5].runs[2].complete)}}></div>
                <div id="week-6-4" style={{backgroundColor: renderColor(sched[5].runs[3].complete)}}></div>
                <div id="week-7-1" style={{backgroundColor: renderColor(sched[6].runs[0].complete)}}></div>
                <div id="week-7-2" style={{backgroundColor: renderColor(sched[6].runs[1].complete)}}></div>
                <div id="week-7-3" style={{backgroundColor: renderColor(sched[6].runs[2].complete)}}></div>
                <div id="week-7-4" style={{backgroundColor: renderColor(sched[6].runs[3].complete)}}></div>
                <div id="week-8-1" style={{backgroundColor: renderColor(sched[7].runs[0].complete)}}></div>
                <div id="week-8-2" style={{backgroundColor: renderColor(sched[7].runs[1].complete)}}></div>
                <div id="week-8-3" style={{backgroundColor: renderColor(sched[7].runs[2].complete)}}></div>
                <div id="week-8-4" style={{backgroundColor: renderColor(sched[7].runs[3].complete)}}></div>
                <div id="week-9-1" style={{backgroundColor: renderColor(sched[8].runs[0].complete)}}></div>
                <div id="week-9-2" style={{backgroundColor: renderColor(sched[8].runs[1].complete)}}></div>
                <div id="week-9-3" style={{backgroundColor: renderColor(sched[8].runs[2].complete)}}></div>
                <div id="week-9-4" style={{backgroundColor: renderColor(sched[8].runs[3].complete)}}></div>
                <div id="week-10-1" style={{backgroundColor: renderColor(sched[9].runs[0].complete)}}></div>
                <div id="week-10-2" style={{backgroundColor: renderColor(sched[9].runs[1].complete)}}></div>
                <div id="week-10-3" style={{backgroundColor: renderColor(sched[9].runs[2].complete)}}></div>
                <div id="week-10-4" style={{backgroundColor: renderColor(sched[9].runs[3].complete)}}></div>
                <div id="week-11-1" style={{backgroundColor: renderColor(sched[10].runs[0].complete)}}></div>
                <div id="week-11-2" style={{backgroundColor: renderColor(sched[10].runs[1].complete)}}></div>
                <div id="week-11-3" style={{backgroundColor: renderColor(sched[10].runs[2].complete)}}></div>
                <div id="week-11-4" style={{backgroundColor: renderColor(sched[10].runs[3].complete)}}></div>
                <div id="week-12-1" style={{backgroundColor: renderColor(sched[11].runs[0].complete)}}></div>
                <div id="week-12-2" style={{backgroundColor: renderColor(sched[11].runs[1].complete)}}></div>
                <div id="week-12-3" style={{backgroundColor: renderColor(sched[11].runs[2].complete)}}></div>
                <div id="week-12-4" style={{backgroundColor: renderColor(sched[11].runs[3].complete)}}></div>
            </div>
        </div>
        </>
    )
};

export default Grid;
