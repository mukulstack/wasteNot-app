import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import PrivateRoute from './routes/PrivateRoute';

import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import ManageUsers from './pages/Admin/ManageUsers';
import CreateTask from './pages/Admin/CreateTask';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import UserProvider from './context/userContext';
import { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <UserProvider>

    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Admin routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/tasks' element={<ManageTasks />} />
            <Route path='/admin/create-task' element={<CreateTask />} />
            <Route path='/admin/users' element={<ManageUsers />} />
          </Route>

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={["member", "admin"]} />}>
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/my-tasks' element={<MyTasks />} />
            <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
          </Route>

          {/* default routes */}
          <Route path='/' element={<Root />} />

        </Routes>
      </Router>
    </div>

    <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px", 
        },
      }}
    />

    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if(loading) return <Outlet />

  if (!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
};