import { Route, Routes } from 'react-router-dom';
import "./App.css";
import SignUpPage from "./components/ui/SignUpPage";
import SignInPage from "./components/ui/SignInPage";
import { Dashboard } from './components/ui/Dashboard';
import { Properties } from './components/ui/Properties';
import { message } from 'antd';

function App() {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
            duration: 5,
        });
    };
    
    return (
        <>
            {contextHolder}
            <Routes>
                <Route path='/' element={<SignUpPage success={success} />} />
                <Route path='/auth/signup' element={<SignUpPage success={success} />} />
                <Route path='/auth/signin' element={<SignInPage success={success} />} />
                <Route path='/dashboard' element={<Dashboard success={success} />} />
                <Route path='/properties' element={<Properties success={success} />} />
            </Routes>
        </>
    );
}

export default App;
