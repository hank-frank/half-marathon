import React, { useState, useEffect } from 'react';
import { useInput } from '../../../hooks/useInput.jsx';
import { Redirect } from 'react-router-dom';

function NewStart (props) {
    let _isMounted = false;
    const { value:day, bind:bindDay, reset:resetDay } = useInput('');
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2020);
    const [dates, setDates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
    const [redirect, setRedirect] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const handleSubmit = async (evt) =>  {
        
        evt.preventDefault();

        let cookies = document.cookie.split(' ');
        let userToken;
        for (let cookie of cookies) {
            cookie = cookie.split("=");
            if (cookie[0] == 'token') {
                userToken = cookie[1];
            }
        }
        //rewrite as try/catch async/await
        //figure out why updating new date doens't work. 
        fetch('/newStart', {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userToken, year, month, day })
        })
        .then(res=> res.json())
        .then(data => {
            console.log(`new start data: `, data.nModified);
            if (data.nModified == 1) {
                setSuccessMessage("New date added, redirecting you in 5 seconds...")
                setTimeout(() => {
                    setRedirect(true);
                }, 5000)
            }
        })
        .catch((error) => {
            console.log(`Error: `, error);
        })

    };

    const tester = () => {
        console.log(`month: `, month);
    }

    useEffect (() => {
        _isMounted = true;

        if (_isMounted){
            if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7|| month == 9 || month == 11) {
                setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
            } else if (month == 3 || month == 5 || month == 8 || month == 10) {
                setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
            } else if (year == 2020 && month == 1) {
                setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            } else if (year !== 2020 && month == 1) {
                setDates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
            }
        }

        return () => {
            _isMounted = false;
        }
    }, [year, month]);

    return (
        <>
            <button onClick={ tester }>Testing form newstart</button>
            <form className="login-group" onSubmit={ handleSubmit }>
                <div className="center-inputs">
                    <label> Select your new start date: <br></br>
                        <label>Year:
                            <select className="login-input" onChange={ event => setYear(event.target.value) }>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
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
                    <input type="submit" value="Submit" className="login-submit"/>
                </div>
            </form>
            <div className="centered-horizontal">
                <h6 className="">{ successMessage }</h6>
            </div>
            { redirect ? <Redirect to='/Main'/> : '' }
        </>
    )
};

export default NewStart;
