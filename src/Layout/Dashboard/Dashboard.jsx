import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaChalkboardTeacher, FaHome } from 'react-icons/fa';
import useClass from '../../Hooks/useClass';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';

const Dashboard = () => {
  const location = useLocation();
  const [classes] = useClass();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  // Function to determine if a NavLink is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/manageClasses" className={isActive('/dashboard/manageClasses') ? 'active-link' : ''}>
                    Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers" className={isActive('/dashboard/manageUsers') ? 'active-link' : ''}>
                    Manage Users
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && (
              <>
                {/* Student Dashboard */}
                <li>
                  <NavLink to="/dashboard/selectedClasses" className={isActive('/dashboard/selectedClasses') ? 'active-link' : ''}>
                    My Selected Classes
                    <span className="indicator-item badge bg-white">{classes?.length}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enrolledClasses" className={isActive('/dashboard/enrolledClasses') ? 'active-link' : ''}>
                    My Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment" className={isActive('/dashboard/payment') ? 'active-link' : ''}>
                    Payment
                  </NavLink>
                </li>
              </>
            )}

            {isInstructor && (
              <>
                {/* Instructor */}
                <li>
                  <NavLink to="/dashboard/addClass" className={isActive('/dashboard/addClass') ? 'active-link' : ''}>
                    Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myClasses" className={isActive('/dashboard/myClasses') ? 'active-link' : ''}>
                    My Classes
                  </NavLink>
                </li>
              </>
            )}


            <div className="divider"></div>
            <li>
              <NavLink exact="true" to="/" className={isActive('/') ? 'active-link' : ''}>
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/instructors" className={isActive('/instructors') ? 'active-link' : ''}>
                <FaChalkboardTeacher /> Instructors
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
