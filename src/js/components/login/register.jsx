import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';
import { Redirect } from 'react-router-dom';

function Register(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');
    const { value:password2, bind:bindpassword2, reset:resetpassword2 } = useInput('');
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const handleSubmit = (evt) =>  {
        evt.preventDefault();
        if (password === password2) {
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
                    setSuccessMessage("Register successful, redirecting you to login in 5 seconds...")
                    setTimeout(() => {
                        setRedirect(true);
                    }, 5000)
                    
                }
            })
            .catch((error) => {
                console.log(`Error: `, error);
            })
        } else {
            setSuccessMessage("Passwords don't match, please try again...");
            
        }
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
                    <div className="input-label">
                        <label>
                            Input Password again:
                            <input type="text" className="login-input" {...bindpassword2} />
                        </label>
                    </div>
                    <input type="submit" value="Submit" className="login-submit"/>
                </div>
            </form>
            <div className="centered-horizontal">
                <h4 className="login-error">{ successMessage }</h4>
            </div>
            { redirect ? <Redirect to="/login" /> : "" }
        </>
    )
};

export default Register;
