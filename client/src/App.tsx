import './index.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import Authentication from './components/Authentication';
import { Dashboard } from './components/Dashboard';

const App = (props: any) => {
  return (
    <React.Fragment>
      <AuthProvider {...props}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Authentication {...props} />} />
            <Route path='/dashboard' element={<Dashboard {...props} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
};

export default App;
