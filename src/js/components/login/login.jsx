import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';
import { Redirect } from 'react-router-dom';

function Login(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const tester = () => {
        // console.log(`cookie: `, document.cookie);
        console.log(`errormessage: `, errorMessage);
    }

    const handleSubmit = (evt) =>  {
        
        evt.preventDefault();
        // setErrorMessage("Invalid User Name or Password please try again");
        // props.loginSubmit(userName, password);
        fetch('/auth', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        })
        .then(checkStatus)
        .then(res => res.json())
        .then((data) => {
            props.storeUser(data);
            if (data.name === userName) {
                setRedirect(true);
            }
        })
        .catch((err) => {
            console.log(err);
        });
        resetuserName();
        resetpassword();
    };

    const checkStatus = (res) => {
        if (res.status >= 200 && res.status < 300) {
            
            return res;
        } else {
            let err = new Error(res.statusText)
            err.response = res;
            setErrorMessage("Login Failed, try again.");
            throw err;
        }
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
                            <input type="password" className="login-input" {...bindpassword} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" className="login-submit"/>
                </div>
            </form>
            <div className="centered-horizontal">
                <h4 className="login-error">{ errorMessage }</h4>
            </div>
            { redirect ? <Redirect to="/main" /> : "" }
        </>
    )
};

export default Login;
