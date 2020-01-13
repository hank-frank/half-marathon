import React, { useState, useEffect } from 'react';

let novice2 = require('../../training/novice2.json')

function EachWeek(props) {
    const [thisWeek, setThisWeek] = useState(5);

    useEffect(() => {
        setThisWeek(props.weekIndex);
    }, [props])

    console.log(`thisWeek: `, thisWeek)
    console.log(`week from eachWeek: `, novice2[thisWeek].runs);

    return (
        <>
            {}
        </>
    )
};

export default EachWeek;
