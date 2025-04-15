import { useContext, useState, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import BinderList from './components/BinderList/BinderList';
import BinderDetails from './components/BinderDetails/BinderDetails';
import * as binderService from './services/binderService';


const App = () => {
  const { user } = useContext(UserContext);
  const [binders, setBinders] = useState([]);

  useEffect(() => {
    const fetchAllBinders = async () => {
      const bindersData = await binderService.index();

      setBinders(bindersData);
    };
    if (user) fetchAllBinders();
  }, [user]);
  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/binders' element={<BinderList binders={binders} />} />
            <Route path='/binders/:binderId' element={<BinderDetails />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};


export default App;
