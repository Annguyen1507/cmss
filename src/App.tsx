import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login';
import Sidebar from './components/SideBar';


export default function App() {
  return (
    <>
    <AuthLayout>
      <Login />
    </AuthLayout>

    <Sidebar />
    </>
  );
}

