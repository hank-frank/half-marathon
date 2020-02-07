import React, { useState, useEffect } from 'react';

function Login() {

    useEffect(() => {
        
    }, [])

    const tester = () => {
        console.log(`login-testing: `);
    }

    return (
        <>
            <button onClick={ tester }>Testing</button>

        </>
    )
};

export default Login;
