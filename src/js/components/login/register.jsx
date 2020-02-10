import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';
import { Redirect } from 'react-router-dom';

function Register(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const handleSubmit = (evt) =>  {
        evt.preventDefault();

        fetch('/register', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        })
        .then(res=> res.json())
        .then(data => {
            props.storeUser(data[0]);
            console.log(data[0]);
            if (data[0].name === userName) {
                setRedirect(true);
            }
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

            { redirect ? <Redirect to="/login" /> : "" }
        </>
    )
};

export default Register;
