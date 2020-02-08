import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';

function Login(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const tester = () => {
        console.log(`cookie: `, document.cookie);
    }

    const handleSubmit = (evt) =>  {
        evt.preventDefault();
        // props.loginSubmit(userName, password);
        fetch('/auth', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        })
        .then(res=>res.json())
        .then(res => {
            console.log(`response from Post on front: `, res);
            props.storeUser(res);
        });
        resetuserName();
        resetpassword();
    };


    return (
        <>
            <button onClick={ tester }>Testing form login</button>
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
