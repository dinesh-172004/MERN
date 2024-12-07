import Navigation from './navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const Adminn=()=>{
    const navigate= useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
        navigate('/')
    }
    return(
        <>
        <Navigation/>
        <h5>Admin Panel</h5>
        
        
        </>


    );
}
export default Adminn;
