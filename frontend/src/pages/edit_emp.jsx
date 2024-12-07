import {React,useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Navigation from './navigation.jsx'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";
// import Navigation from "./navigation";
import Row from 'react-bootstrap/Row';
import '../styles/login.css'

const EditEmployee=()=>{
    const {id}=useParams()
    // const [employees,setEmployees]=useState([]); 
    // const navigate = useNavigate();

    const [designation, setDesignation] = useState("");
    const [name,setName]=useState("");
    const [mobile,setMobile]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [image,setImage]=useState();
    const navigate = useNavigate();
    const validateEmail = (email) => {
        // Simple email format regex for validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      };
      const handleGenderChange = (e) => {
        setGender(e.target.value);
      };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, value]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== value));
    }
  };
  useEffect(() => {
    axios.get("http://localhost:8000/Getemp/"+id)
        .then(response => {console.log(response)
            const dataa = response.data.employees;
            setName(dataa.name)
            setEmail(dataa.email)
            setDesignation(dataa.designation)
            setMobile(dataa.mobile)
            setGender(dataa.gender)
            setSelectedSubjects(dataa.subjects || []);
            setImage(dataa.image)
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("designation", designation);
        formData.append("gender", gender);
        formData.append("subjects", JSON.stringify(selectedSubjects));
        if (image instanceof File) formData.append("image", image); // Add image only if it's updated
        if (!name || !email || !designation || !mobile ) {
            alert("Error:all fiends are required");
           return;
         }
         if (!validateEmail(email)) {
           alert("Error:enter a valid email")
           return;
         }
        try {
            const response = await axios.put(`http://localhost:8000/UpdateEmp/${id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Employee updated successfully!");
            navigate("/list_emp");
            console.log(response.data);
          } 
          catch (error) {
            console.error("Error updating employee:", error);
            if (error.response) {
              console.error("Server response:", error.response.data);
              alert(`Failed to update employee: ${error.response.data.message || "Server error"}`);
            } else {
              alert("Failed to update employee: Network error");
            }
          }
        };

//   useEffect(() => {
//       try {
//         const response = await axios.get("http://localhost:8000/Getemp/"+id)
//         .then(response => {console.log(response)
//             setName(response.data.name)
//             setEmail(response.data.email)
//             setDesignation(response.data.designation)
//             setMobile(response.data.mobile)
//             setGender(response.data.gender)
//         })
         
// //       } 
//       catch (error) 
//         console.error("Error fetching employees:", error));
//       },[])
    

  
    return(
        <>
        <Navigation/>
        <div className="form">
        <Form>
            <h2 style={{textAlign:'center', marginBottom:'40px'}}>Edit Employee</h2>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
        <Form.Label column sm={2}>
          Employee Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} className='inp_field'  placeholder="Enter Name" />
        </Col>
      </Form.Group>        
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='inp_field' placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
        <Form.Label column sm={2}>
          Mobile Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" className='inp_field' value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Number" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalDropdown">
          <Form.Label  column sm={2}>Designation</Form.Label>
          <Col sm={10}>
          <Form.Select value={designation}   onChange={(e) => setDesignation(e.target.value)} className="inp_field"  defaultValue='choose' >
          {/* <option value="Choose..." disabled>Choose...</option> */}
            <option>HR</option>
             <option>Manager</option>
            <option>Sales</option>
          </Form.Select>
          </Col>
        </Form.Group>

       
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label   column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10} className="d-flex align-items-center">
            <Form.Check
              type="radio"
              label="M"
              value="M"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              checked={gender === "M"}
              // checked={setGender === 'M'}
            onChange={handleGenderChange}
              inline
            />
            <Form.Check
              type="radio"
              label="F"
              value="F"
              checked={gender === "F"}
              // checked={setGender === 'F'}
            onChange={handleGenderChange}
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              inline
            />
          </Col>
        </Form.Group>
      </fieldset>  

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col className="d-flex align-items-center">
        <Form.Label as="legend" column sm={3}>
            Course
          </Form.Label>
          <Form.Check label="MCA" value="MCA" onChange={handleCheckboxChange} checked={selectedSubjects.includes("MCA")}/>
          <Form.Check label="BCA" value="BCA" onChange={handleCheckboxChange} checked={selectedSubjects.includes("BCA")}/>
          <Form.Check label="BSC" value="BSC" onChange={handleCheckboxChange} checked={selectedSubjects.includes("BSC")}/>
 
        </Col>
      </Form.Group>
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Profile Image</Form.Label> */}
        {/* {image && (
  <div>
    <img
      src={`http://localhost:8000/uploads/${dataa.image}`}
      alt="Profile"
      style={{ width: "100px", height: "100px", objectFit: "cover" }}
    />
  </div>
)} */}
        {/* <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Group> */}

      <Form.Group controlId="formFile" className="mb-3">
  <Form.Label>Upload Profile Image</Form.Label>
  <Form.Control
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />
  {image && (
    <Form.Text muted>
      Current File: {typeof image === "string" ? image.split("\\").pop() : image.name}
    </Form.Text>
  )}
</Form.Group>


      <div className="d-flex align-items-center justify-content-center"><Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 20, offset: 2 }}>
          <Button type="submit" onClick={handleSubmit}>Update Employee</Button>  
          {/* onClick={handleSubmit} */}
        </Col>
      </Form.Group>
      </div>
    </Form>
    </div>
        
        </>
        
    );
}
export default EditEmployee;