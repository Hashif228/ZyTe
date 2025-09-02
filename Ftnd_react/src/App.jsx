import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import StaffManagement from "./components/StaffManagement";
import Managers from "./components/Managers";
import Department from "./components/Department";
import AddStaff from "./components/AddStaff";
import AddCustomer from "./components/AddCustomer";
import AddManager from "./components/AddManager";
import AddDepartment from "./components/AddDepartment";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute> <Customers /> </ProtectedRoute>}/>
      <Route path="/staff-management" element={<ProtectedRoute><StaffManagement /></ProtectedRoute>} />
      <Route path="/managers" element={<ProtectedRoute><Managers /></ProtectedRoute>} />
      <Route path="/department" element={<ProtectedRoute><Department /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
