import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/tasks" element={<TaskList />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
