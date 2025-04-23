import { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import BinderDetails from './components/BinderDetails/BinderDetails';
import BinderList from './components/BinderList/BinderList';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import BinderForm from './components/BinderForm/BinderForm';
import * as binderService from './services/binderService';



const App = () => {
  const { user } = useContext(UserContext);
  const [binders, setBinders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBinders = async () => {
      const bindersData = await binderService.index();

      setBinders(bindersData);
    };
    if (user) fetchAllBinders();
  }, [user]);

  const handleAddBinder = async (binderFormData) => {
    const newBinder = await binderService.create(binderFormData);
    setBinders([newBinder, ...binders]);
    navigate('/binders');
  };
  
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
            <Route path='/binders/new-binder' element={<BinderForm handleAddBinder={handleAddBinder} />} />
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
