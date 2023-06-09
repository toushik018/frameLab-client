import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';


const NavBar = () => {
    const location = useLocation();


    const handleLogOut = () => {
        logOut();
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
                        <NavLink exact={true.toString()} to="/" className={getNavLinkClass('/')}>Home</NavLink>
                        <NavLink to='/blog' className={getNavLinkClass('/instructors')}>Instructors</NavLink>
                        <NavLink to='/alltoys' className={getNavLinkClass('/classes')}>Classes</NavLink>
                        <NavLink to='/mytoys' className={getNavLinkClass('/dashboard')}>Dashboard</NavLink>
                    </div>
                </div>
                <Link to="/" className="flex items-center text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <img src='' alt="Logo" className="lg:h-28 lg:w-28" />

                </Link>

            </div>
            <div className="navbar-center hidden lg:flex">
                <NavLink exact={true.toString()} to="/" className={getNavLinkClass('/')}>Home</NavLink>
                <NavLink to='/blog' className={getNavLinkClass('/instructors')}>Instructors</NavLink>
                <NavLink to='/alltoys' className={getNavLinkClass('/classes')}>Classes</NavLink>
                <NavLink to='/mytoys' className={getNavLinkClass('/dashboard')}>Dashboard</NavLink>



            </div>
            <div className="navbar-end">
                <NavLink to='/login' className={getNavLinkClass('/login')}>Login</NavLink>
            </div>

            <>
                <div className="avatar mr-4 tooltip" data-tip=''>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center  ring-2 ring-purple-500 transition-transform hover:scale-125">
                        <img src='' alt="Profile" className="w-10 h-10 rounded-full" />
                    </div>
                </div>

                <button onClick={handleLogOut} className='header-btn-2 mr-4'>Logout</button>
            </>

        </div>
    );
};

export default NavBar;
