import {React,useEffect} from "react";
import { Navbar, Container,Nav,NavDropdown } from "react-bootstrap";
import {Link} from "react-router-dom"
import Login from './Login';
import CreateEmployee from "./create_emp";
import List from "./list_emp";
import Admin from "./admin";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route, Routes } from "react-router-dom";

const Navigation=()=>{
  const navigate=useNavigate()
  const admin = JSON.parse(localStorage.getItem('admin'));
  useEffect(() => {
    if (!admin) {
        navigate('/');
    }
}, [admin, navigate]);
    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto " style={{marginLeft:'50px'}}>
            
            <Link to="/list_emp" className="link" style={{marginLeft:'18px',  }}>Employee List</Link>
            <Link to="/create_emp"  className="link" style={{marginLeft:'18px'}}>Create Employee</Link>
            </Nav>

            <Nav className="link ms-auto" style={{ marginLeft: '50px' }}>
    {admin ? (
        <Nav.Link disabled>Welcome, {admin.username}</Nav.Link>
    ) : (
        navigate('/')
    )}
    <Link to="/" onClick={() => localStorage.removeItem('admin')}>Logout</Link>
</Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>     
    
        
        
        
        
        </>

    );
}
export default Navigation;
 