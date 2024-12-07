
import './App.css'
import CreateEmployee from './pages/create_emp';
import Admin from './pages/admin'
import List from './pages/list_emp';
import Login from './pages/Login';
import EditEmployee from './pages/edit_emp';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route,BrowserRouter } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div> 
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path="/create_emp" element={<CreateEmployee />} />
      <Route path="/list_emp" element={<List/>} />
      <Route path="/edit_emp/:id" element={<EditEmployee/>} />
    </Routes> </BrowserRouter>
    </div>
  )
}

export default App
