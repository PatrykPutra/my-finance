import '../App.css'
export default function Header({setToken}) {
    const handleLogout = () => {
        setToken(null);
    };

    return(
        <div className='header'>
            <div className='logo'>MyFinance</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}