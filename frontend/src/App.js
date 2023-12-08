import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Pages
import Home from './components/pages/Home'
import Register from './components/pages/auth/RegisterUser'
import Login from './components/pages/auth/Login';
import Container from './components/layout/Container';

// hooks
import Message from './components/layout/Message';

//context
import { UserProvider } from './context/UserContext';

// layouts
import NavBar from './components/layout/NavBar';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <NavBar/>
      <Message/>
    <Container>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path = "/users/register" element={< Register/>} />
          <Route path = "/users/login" element={<Login />} />
      </Routes>

      </Container>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
