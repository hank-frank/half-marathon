import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';

function Login(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');

    useEffect(() => {
        console.log(`from login: `);
    }, [])

    const tester = () => {
        console.log(`login-testing: `, props);
    }

    const handleSubmit = (evt) =>  {
        evt.preventDefault();
        console.log(`un from login: `, userName);
        console.log(`pass from login: `, password);
        props.loginSubmit(userName, password);
    };


    return (
        <>
            <button onClick={ tester }>Testing</button>
            <form className="login-group" onSubmit={ handleSubmit }>
                <div className="center-inputs">
                    <div className="input-label">
                        <label>
                            Input Username:
                            <input type="text" className="login-input" {...binduserName} />
                        </label>
                    </div>
                    <div className="input-label">
                        <label>
                            Input Password:
                            <input type="text" className="login-input" {...bindpassword} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" className="login-submit"/>
                </div>
            </form>

        </>
    )
};

export default Login;
