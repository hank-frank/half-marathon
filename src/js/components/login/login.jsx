import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';

function Login(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const tester = () => {
        // console.log(`login-testing: `, props);
        // fetch('/checkToken')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(`res to check token test: `, data);
        //     })
        //     .catch(err => {
        //         console.log(`error checkToken: `, err);
        //     })
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
            // res.authorized ? setIsAuthenticated(true) : setIsAuthenticated(false);
        });
    };

    // const loginSubmit = (user, pass) => {
    //     console.log(`user from app: `, user);
    //     console.log(`pass from app: `, pass);
    //     // setUsername(user);
    //     // setPassword(pass);
    //     fetch('/auth', {
    //         method: 'post',
    //         headers: {
    //           'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ user, pass })
    //     })
    //     .then(res=>res.json())
    //     .then(res => {
    //         console.log(`response from Post on front: `, res);
    //         // res.authorized ? setIsAuthenticated(true) : setIsAuthenticated(false);
    //     });
    // };


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
