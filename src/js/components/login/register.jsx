import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';
import { Redirect } from 'react-router-dom';

function Register(props) {
    const { value:userName, bind:binduserName, reset:resetuserName } = useInput('');
    const { value:password, bind:bindpassword, reset:resetpassword } = useInput('');
    const { value:password2, bind:bindpassword2, reset:resetpassword2 } = useInput('');
    const { value:trainingPlan, bind:bindTrainingPlan, reset:resetTrainingPlan } = useInput('novice2');
    const { value:day, bind:bindDay, reset:resetDay } = useInput('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2020);
    const [dates, setDates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    // const [trainingPlan, setTrainingPlan] = useState("novice2");

    useEffect(() => {
        // console.log(`from login: `);
    }, [])

    const handleSubmit = (evt) =>  {
        // let startDate = new Date(year, month, day, 1);
        evt.preventDefault();
        let dateMonth;
        console.log(`submit month: `, month);
        switch(month) {
            case "January":
                dateMonth = 0;
                break
            case "February":
                dateMonth = 1;
                break
            case "March":
                dateMonth = 2;
                break
            case "April":
                dateMonth = 3;
                break
            case "May":
                dateMonth = 4;
                break
            case "June":
                dateMonth = 5;
                break
            case "July":
                dateMonth = 6;
                break
            case "August":
                dateMonth = 7;
                break
            case "September":
                dateMonth = 8;
                break
            case "October":
                dateMonth = 9;
                break
            case "November":
                dateMonth = 10;
                break
            case "December":
                dateMonth = 11;
                break
            default: 
                dateMonth = 1;
        }

        if (password === password2) {
            fetch('/register', {
                method: 'post',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password, trainingPlan, year, month, day })
            })
            .then(res=> res.json())
            .then(data => {
                props.storeUser(data[0]);
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

    const tester = () => {
        console.log(`Month, `, month);
    }

    useEffect (() => {
        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7|| month == 9 || month == 11) {
            setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        } else if (month == 3 || month == 5 || month == 8 || month == 10) {
            setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
        } else if (year == 2020 && month == 1) {
            setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
        } else if (year !== 2020 && month == 1) {
            setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
        }
    }, [year, month]);

    return (
        <>
            <button onClick={ tester }>Testing form register</button>
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
                            <input type="password" className="login-input" {...bindpassword} />
                        </label>
                    </div>
                    <div className="input-label">
                        <label>
                            Input Password again:
                            <input type="password" className="login-input" {...bindpassword2} />
                        </label>
                    </div>
                    <div className="input-label">
                        <label>
                            Select training plan:
                            <select {...bindTrainingPlan} className="login-input">
                                <option value="novice2">Novice 2</option>
                                <option value="novice1">Novice 1</option>
                                <option value="intermediate1">Intermediate 1</option>
                            </select>
                        </label>
                        <label> Select your start date: <br></br>
                            <label>Year:
                                <select className="login-input" onChange={ event => setYear(event.target.value) }>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </select>
                            </label>
                        </label>
                        <label>Month: 
                            <select className="login-input" onChange={ event => setMonth(event.target.value) } >
                                <option defaultValue="0">January</option>
                                <option value="1">February</option>
                                <option value="2">March</option>
                                <option value="3">April</option>
                                <option value="4">May</option>
                                <option value="5">June</option>
                                <option value="6">July</option>
                                <option value="7">August</option>
                                <option value="8">September</option>
                                <option value="9">October</option>
                                <option value="10">November</option>
                                <option value="11">December</option>
                            </select>
                        </label>
                        <label>Date:
                            <select {...bindDay } className="login-input">
                                { dates.map((date, key) => {
                                    return (
                                        <option key={key} value={ date }>{ date }</option>
                                    )
                                })}
                            </select>
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
