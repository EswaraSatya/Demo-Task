import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/LoginPage';
import UsersPage from './Components/UsersPage';
import DashBoard from './Components/DashBoard';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/userlist" element={<UsersPage />} />
    </Routes>
  );
};

export default App;
