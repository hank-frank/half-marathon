import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';

function Register(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const handleSubmit = (evt) =>  {
        evt.preventDefault();
        // props.loginSubmit(userName, password);
        fetch('/register', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        })
        .then(res=>res.text())
        .then(data => {
            console.log(`response from Post on front: `, data);;
        })
        .catch((error) => {
            console.log(`Error: `, error);
        })
    };


    return (
        <>
            {/* <button onClick={ tester }>Testing form login</button> */}
            <div className="centered-horizontal">
                <h5 className="register-text">Register: </h5>
            </div>
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

export default Register;
