import {React,useState} from "react";
import { Button,Form, Navbar,Container } from "react-bootstrap";
import '../styles/login.css'
import axios from "axios";
 
import { useNavigate } from "react-router-dom"; 

const Login=()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitt = (e) => {
    e.preventDefault();
    
   
    const validUsername = "adminUser";
    const validPassword = "adminPassword";
    
    
    if (username === validUsername && password === validPassword) {
       
      navigate("/admin", { state: { username } });
    } else {
      alert("Invalid credentials!");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password){
      alert("both fields are required")
    }
    
    try {
        
      const response = await axios.post("http://localhost:8000/admin/login", { username, password });
        if (response.data.message === "Login successful") {
            alert(`Welcome, ${response.data.username}`);
            localStorage.setItem('admin', JSON.stringify({ username: response.data.username }));
             
        }
        else{
          alert("Invalid credentials");
        }navigate("/admin");
    } 
    catch (error) { 
      alert("Invalid credentials");
      console.log(error);
      navigate("/");
       
    }
};

    return(
        <>
        <Navbar bg='dark' expand='lg' className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>

        </Container> </Navbar>
        <div className="form">
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="email"  onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" className=" inp_field"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className=" inp_field" />
      </Form.Group>
       
      <div className="d-flex align-item-center justify-content-center">
        <Button variant="primary" type="submit" onClick={handleSubmit} >
        Login
      </Button>

      
      </div>
      
    </Form></div>
    </>

    );
}
export default Login;