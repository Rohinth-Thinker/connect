import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { DEFAULT_AVATAR_URL } from "../../../App";

function Footer() {

  const {authUser} = useAuthContext();

    return (
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 w-full flex justify-around fixed bottom-0 border-t border-dotted border-primary">
          <li>
            <NavLink to={"/"} className={({ isActive }) => `tooltip ${isActive ? "text-primary" : "text-gray-700"}`} data-tip="Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </NavLink>
          </li>

          <li className="mr-25">
            <NavLink to={"/chat/inbox"} className={({ isActive }) => `tooltip ${isActive ? "text-primary" : "text-gray-700"}`} data-tip="message">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
            </NavLink>
          </li>

          <li className="absolute -top-9">
              <Link to={"/create"} className={"tooltip p-0 rounded-full"} data-tip="post">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#570DF8" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="size-20 bg-base-200 shadow-sm rounded-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </Link>
          </li>

          <li>
            {/* <a className="tooltip" data-tip="Classroom"> */}
            <NavLink to={"/classroom"} className={({ isActive }) => `tooltip ${isActive ? "text-primary" : "text-gray-700"}`} data-tip="classroom">
              {/* <img src="/google-classroom-svgrepo-com.svg" className="size-6" /> */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><path d="M3 5v14a1 1 45 0 0 1 1h16a1 1 135 0 0 1-1V5a1 1 45 0 0-1-1H4a1 1 135 0 0-1 1Z" stroke="currentColor" strokeWidth={2} strokeLinecap="butt" strokeLinejoin="miter"/><path d="M14 18h4v2h-4z" fill="currentColor"/><path d="M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 .75c-1.001 0-3 .502-3 1.5V15h6v-.75c0-.998-1.999-1.5-3-1.5z" fill="currentColor"/><path d="M15.75 10.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm0 2.813c-.17 0-.38.02-.602.058.203.235.352.537.352.879V15H18v-.563c0-.748-1.5-1.124-2.25-1.124zm-1.73.435c-.307.176-.52.407-.52.69v.062h1v-.25c0-.082-.032-.162-.168-.287a1.68 1.68 0 0 0-.312-.215zM8.25 10.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zm0 2.813c-.75 0-2.25.376-2.25 1.124V15h2.5v-.75c0-.342.15-.644.352-.879a3.603 3.603 0 0 0-.602-.059zm1.73.435a1.68 1.68 0 0 0-.312.215c-.136.125-.168.205-.168.287v.25h1v-.063c0-.282-.213-.513-.52-.689z" fill="currentColor"/></svg>
            </NavLink>
          </li>

          <li>
            <Link to={authUser?.userID ? `/profile/${authUser?.username}` : '/signup'} className="tooltip" data-tip="Profile">
            {/* <NavLink to={authUser?.userID ? `/profile/${authUser?.username}` : '/signup'} className={({ isActive }) => `tooltip ${isActive && "border border-amber-500"}`} data-tip="Profile"> */}
              <div tabIndex={0} role="button" className="btn-circle avatar">
                <div className="w-6 rounded-full border bg-base-300 flex justify-center items-center">
                  <img
                      alt="Tailwind CSS Navbar component"
                      src={authUser?.avatar || DEFAULT_AVATAR_URL} />
                </div>
              </div>
            </Link>
          </li>
        </ul>
    )
}

export default Footer;