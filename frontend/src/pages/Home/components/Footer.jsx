import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

function Footer() {

  const {authUser} = useAuthContext();

    return (
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 w-full flex justify-around fixed bottom-0 border-t border-dotted border-primary">
  <li>
    <Link to={"/"} className="tooltip" data-tip="Home">
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
    </Link>
  </li>

    <li className="mr-25">
    <Link to={"/chat/inbox"} className="tooltip" data-tip="message">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>

    </Link>
  </li>

<li className="absolute -top-9">
    <Link to={"/create"} className="tooltip" data-tip="post">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#570DF8" viewBox="0 0 24 24" strokeWidth="1" stroke="white" className="size-20 bg-base-200 shadow-sm rounded-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </Link>
  </li>

  <li>
    <a className="tooltip" data-tip="Classroom">
      <img src="/google-classroom-svgrepo-com.svg" className="size-6" />
    </a>
  </li>
  <li>
    <Link to={`/profile/${authUser?.username}`} className="tooltip" data-tip="Profile">
      <div tabIndex={0} role="button" className="btn-circle avatar">
        <div className="w-6 rounded-full border">
            <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
        </div>
    </Link>
  </li>
</ul>
    )
}

export default Footer;