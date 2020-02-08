import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './Header.jsx';
import Main from './main/Main.jsx';
import Login from './login/login.jsx';
import withAuth from './login/withAuth.jsx';
import Register from './login/register.jsx';

function App() {
    const [helmetTitle, setHelmetTitle] = useState("Half Marathon");
    const [user, setUser] = useState({});

    useEffect(() => {
        // console.log(`calling useeffect`)
        setHelmetTitle(handleTitle(window.location.hash))
    }, []);

    const storeUser = (data) => {
        console.log(`from storeuser: `, data);
        setUser(data);
    };

    const handleTitle = (hash) => {
        const path = hash.replace(/^#\//, '');
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
        console.log(`cookie: `, document.cookie)
    }

    const clearCookie = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

    return (
        <>
            <Router>
                <Helmet>
                    <title>{ helmetTitle }</title>
                </Helmet>
                <Header />
                <button onClick={testbutton}>TestButton from app log cookie</button>
                <button onClick={clearCookie}>Clear COokies</button>
                <main id="page-container">
                    <Route path='/Main' component={ withAuth(Main) }/>
                    <Route path='/Login' render={() =>  <Login storeUser ={ storeUser } />}/>
                    <Route path='/Register' render={() =>  <Register  />}/>
                </main>
            </Router>
        </>
    )
};

export default App;
