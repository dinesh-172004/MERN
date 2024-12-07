const express =require('express')
const mongoose=require('mongoose')
const dotenv=require("dotenv")
const cors =require('cors')
const bodyParser =require("body-parser")
const session = require('express-session');

 
const EmpModel = require('./models/employee')
const AdminModel=require('./models/admin')



const app=express()
 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
app.use(express.json());

const PORT=8000

mongoose.connect("mongodb://localhost:27017/project1").then(( )=>{
    
    console.log("db connected successfully")
    app.listen(PORT,()=>{
        console.log('server is running on port  %d',PORT);
    });

}).catch((error)=>{
    console.log(error)
});
/////////////////image upload code
const multer=require('multer')
const path=require('path')
// const upload=multer({dest:'uploads/'})

const storage =multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname, 'uploads'))
    },
    filename:function(req,file,cb){
        const uniquesuffix =Date.now()+ "-" + Math.round(Math.random() * 1e9);;
        cb(null,uniquesuffix + path.extname(file.originalname));
    },
});
const upload=multer({storage:storage});
 

app.post("/CreateEmp",upload.single( "image"), async (req, res) => {
    try {
        const now = new Date();
        const fileName = path.basename(req.file.path);

    // Format the date to dd-MMM-yy
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${now.toLocaleString('default', { month: 'short' })}-${String(now.getFullYear()).slice(-2)}`;

        // const employee = await EmpModel.create({
            var employee = new EmpModel({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender:req.body.gender,
            subjects:req.body.subjects,
            image:fileName,
            createat:formattedDate,
            // profileImage: req.file.path, // Save the file path
          });
          await employee.save();
          if (employee) {
              console.log("Registration successful!");
            //   console.log("Response",employee.image);
            } else {
                console.error(`Error:`);
            }

        console.log("Employee saved:", employee); 
        res.json(employee);
    } catch (err) {
        console.error("Error saving employee:", err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/Getemp/:id", async (req, res) => {
    try {
      // Fetch all employees from the database
      const id=req.params.id;
      const employees = await EmpModel.findById({_id:id})  
      res.status(200).json({ employees });
    } catch (err) {
      console.error("Error fetching employee:", err);
      res.status(500).json({ error: "An error occurred while fetching employees" });
    }
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/ListEmp", async (req, res) => {
    try {
      // Fetch all employees from the database
      const employees = await EmpModel.find();
      
      if (employees.length === 0) {
        return res.status(404).json({ message: "No employees found" });
      }
  
      res.status(200).json({ employees });
    } catch (err) {
      console.error("Error fetching employees:", err);
      res.status(500).json({ error: "An error occurred while fetching employees" });
    }
  });
  

  app.put("/UpdateEmp/:id", upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the employee by ID
      const existingEmployee = await EmpModel.findById(id);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Prepare updated fields
      const updates = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        subjects: req.body.subjects ? JSON.parse(req.body.subjects) : existingEmployee.subjects, // Ensure subjects are parsed
      };
  
      // Handle image update if a new image is uploaded
      if (req.file) {
        updates.image = req.file.filename; // Save only the new file name
      } else {
        updates.image = existingEmployee.image; // Retain the old image
      }
  
      // Update the employee record
      const updatedEmployee = await EmpModel.findByIdAndUpdate(id, updates, { new: true });
  
      console.log("Employee updated successfully:", updatedEmployee);
      res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: "Failed to update employee" });
    }
  });

  app.delete("/DeleteEmp/:id", async (req, res) => {
    try {
      const { id } = req.params;
    //   console.log(id);
      const deletedEmployee = await EmpModel.findByIdAndDelete({_id:id});
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Employee deleted successfully", deletedEmployee });
    } catch (err) {
      console.error("Error deleting employee:", err);
      res.status(500).json({ error: "An error occurred while deleting the employee" });
    }
  });


  app.post("/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
         

        // Find the admin with matching username and password
        const admin = await AdminModel.findOne({ username, password });
        
        if (admin) {
             
            res.json({ message: "Login successful", username: admin.username });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
            
        }
    } catch (err) {
        // alert("Invalid credentials");
        console.error("Error logging in:", err);
        res.status(500).json({ error: err.message });
    }
});