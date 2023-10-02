import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/tasks/new" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
                    <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
                    <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;