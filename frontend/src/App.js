import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Pages
import Home from './components/pages/Home'
import Register from './components/pages/auth/RegisterUser'
import Container from './components/layout/Container';

// hooks
import Message from './components/layout/Message';

//context
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Message/>
    <Container>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path = "/users/register" element={< Register/>} />
      </Routes>

      </Container>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
