import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';


function App() {
    return (
        <>
            <Router>
            <Header />
                <Route exact path="/">
                    {/* <Input /> ROute goes here */}
                </Route>
            </Router>
        </>
    )
};

export default App;
