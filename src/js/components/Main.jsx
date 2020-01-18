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
        fetch('/training')
            .then((response) => {
                // console.log(`response: `, response.json());
                return response.json();
            })
            .then((data) => {
                setTrainingInfo2(data);
                console.log("Done: ", data);
            })
            .catch((err) => {
                console.log(`Error: `, err)
            })


            // return function cleanup(trainingInfo2) {
            //     (async () => {
            //         const rawResponse = await fetch('/cleanup', {
            //             method: 'POST',
            //             headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify({trainingInfo2})
            //         });
            //         const content = await rawResponse.json();
                    
            //         console.log(`response of post: `, content);
            //     })();
            // };

    }, [])

    let findWeek = () => {
        let now = new Date();
        var diff = (now - startDate) / 1000;
        diff /= (60 * 60 * 24 * 7);
        let weekAfterStart = Math.abs(Math.round(diff));
        setCurrentWeek(weekAfterStart);
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
        // let data = trainingInfo2;
        // console.log(`trainingInfo2: `, data);
        // console.log("testing");

        
        fetch('/cleanup', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({trainingInfo2})
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
