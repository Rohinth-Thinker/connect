import {Link, useNavigate} from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { DEFAULT_AVATAR_URL } from '../../../App';

function Navbar({ children }) {

    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        localStorage.removeItem('user');
        setAuthUser(null);
        await fetch('/api/auth/logout');
        navigate("/signup");
    }

    return (
    <div className="sticky top-0 z-50 flex flex-col items-center bg-base-100 shadow-sm pl-5 pr-10 border-b border-dotted border-primary">
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl text-primary underline underline-offset-5 ">CONNECT</a>
            </div>

            { !authUser?.userID ? <Link to={"/signup"} className="btn btn-primary h-6">Sign up</Link>
                :
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-base-300 flex justify-center items-center">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={authUser.avatar || DEFAULT_AVATAR_URL} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                    </div>
                </div>
            }

            {/* <div className="btn btn-primary h-6">Login</div> */}
        </div>

        { children }
        
    </div>
    )
}

export default Navbar;