import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import logo from '../../../public/logo.png'
import useClass from '../../Hooks/useClass';

const NavBar = () => {
    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);
    const [classes] = useClass();

    console.log(user);

    const handleLogOut = () => {
        logOut().then(() => {

        }).catch((error) => {

        });
    };

    const getNavLinkClass = (path) => {
        return classNames('mr-4', {
            'nav-btn': location.pathname === path,
            'nav-btn-2': location.pathname !== path,
        });
    };

    return (
        <div className="navbar bg-base-100 w-full lg:w-4/5 mx-auto mt-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <div tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <NavLink exact="true" to="/" className={getNavLinkClass('/')}>
                            Home
                        </NavLink>
                        <NavLink to="/instructors" className={getNavLinkClass('/instructors')}>
                            Instructors
                        </NavLink>
                        <NavLink to="/classes" className={getNavLinkClass('/classes')}>
                            Classes
                        </NavLink>
                        <NavLink to="/dashboard" className={getNavLinkClass('/dashboard')}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/dashboard/myClasses" className={getNavLinkClass('/dashboard/myClasses')}>
                        <span className="indicator-item badge badge-secondary">{classes?.length}</span>
                        </NavLink>
                    </div>
                </div>
                <Link to="/" className="flex items-center text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <img src={logo} alt="Logo" className="lg:h-52 lg:w-52" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <NavLink exact="true" to="/" className={getNavLinkClass('/')}>
                    Home
                </NavLink>
                <NavLink to="/instructors" className={getNavLinkClass('/instructors')}>
                    Instructors
                </NavLink>
                <NavLink to="/classes" className={getNavLinkClass('/classes')}>
                    Classes
                </NavLink>
                <NavLink to="/dashboard" className={getNavLinkClass('/dashboard')}>
                    Dashboard
                </NavLink>
                <NavLink to="/dashboard/selectedClasses" className={getNavLinkClass('/dashboard/myClasses')}>
                    <span className="indicator-item badge badge-secondary">{classes?.length}</span>
                </NavLink>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <div className="avatar mr-4 tooltip" data-tip={user.displayName}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center ring-2 ring-purple-500 transition-transform hover:scale-125">
                                <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                            </div>
                        </div>
                        <button onClick={handleLogOut} className="header-btn-2 mr-4 bg-slate-700 p-2">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={getNavLinkClass('/login')}>
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default NavBar;
