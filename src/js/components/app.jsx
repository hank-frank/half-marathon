import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './Header.jsx'
import Main from './main/Main.jsx';
import Login from './login/login.jsx'

function App() {
    const [helmetTitle, setHelmetTitle] = useState("Half Marathon");
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setHelmetTitle(handleTitle(window.location.hash))
    }, [])

    const loginSubmit = (user, pass) => {
        console.log(`user from app: `, user);
        console.log(`pass from app: `, pass);
        // setUsername(user);
        // setPassword(pass);
        fetch('/auth', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, pass })
        })
        .then(res=>res.json())
        .then(res => {
            console.log(`response from Post on front: `, res.authorized);
            res.authorized ? setIsAuthenticated(true) : setIsAuthenticated(false);
        });
    };

    const handleTitle = (hash) => {
        const path = hash.replace(/^#\//, '');
        console.log(path);
        let newTitle = '';
        switch (path) {
            case 'main':
                newTitle = 'Half Marathon Schedule';
                break;
            case 'login':
                newTitle = 'Login';
                break;
            default:
                newTitle = 'Half Marathon';
        };

        if (helmetTitle != newTitle) {
            setHelmetTitle(newTitle);
        };
    }

    const testbutton = () => {
        console.log(`auth: `, isAuthenticated)
    }

    return (
        <>
            <Router>
                <Helmet>
                    <title>{ helmetTitle }</title>
                </Helmet>
                <Header />
                <button onClick={testbutton}>TestButton from app</button>
                <main id="page-container">
                    <Route path='/Main' component={ Main }/>
                    <Route path='/Login' render={() =>  <Login loginSubmit ={ loginSubmit } />}/>
                </main>
            </Router>
        </>
    )
};

export default App;
