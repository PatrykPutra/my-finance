import '../App.css'
import { useAuthentication } from '../context/AuthenticationProvider';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const authenticate = useAuthentication();

    return(
        <div className='header'>
            <div className='logo' onClick={()=>navigate("/")}>MyFinance</div>
            {authenticate.token && 
            <div className='dropdown'>
                <button className='dropbtn'>Menu</button>
                <div className='dropdown-content'>
                    <a onClick={() => navigate('/settings')}>Settings</a>
                    <a onClick={()=> authenticate.logoutAction()}>Logout</a>
                </div>
            </div> 
            }
            
        </div>
    )
}