import { useContext } from "react";
import {ThemeStore} from "./utils/ThemeController";
import { Link } from "react-router-dom";
import { useSelector} from 'react-redux'

let Navbar = () => {

  let {theme, setTheme} = useContext(ThemeStore)

  const currentThemeStyle = theme == "light" ? {backgroundColor: "white", color: "#3A3535"} : {backgroundColor: "#232020"}

  let darkDropboxTheme = "bg-base-100 rounded-t-none p-2 w-28"
  let lightDropboxTheme = "bg-gray-100 rounded-t-none p-2 w-28"

  let darkViewcartTheme = "card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
  let lightViewcartTheme = "card card-compact dropdown-content bg-gray-100 z-[1] mt-3 w-52 shadow"

  let wishItems = useSelector((store) => store.wish.items)

  return (
    <div
      className="navbar bg-base-300 font-semibold px-32 p-2.5 fixed z-10 shadow-lg"
      style={currentThemeStyle}
    >
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1 flex-1 items-center ">
          <li>
            <Link
              href="/"
              className="btn btn-ghost text-xl"
              style={{ color: "#F97300" }}
            >
              CookBook
            </Link>
          </li>
          <li>
            <details>
              <summary>City</summary>
              <ul className={theme == "light" ? lightDropboxTheme : darkDropboxTheme}>
                <li>
                  <a>New Delhi</a>
                </li>
                <li>
                  <a>Mumbai</a>
                </li>
                <li>
                  <a>Bangalore</a>
                </li>
                <li>
                  <a>Pune</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* ---------------------------RIGHT-NAV-------------------------------------- */}

      <div className="flex-none *:px-3 [&>*]:px-4" >

      <button className="btn btn-ghost hover:text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.5"
              d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path></svg>
          <a href="">Favorites</a>
        </button>

        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:text-orange-500">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.5"
                  d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                ></path>
              </svg>
              <span className="badge badge-sm indicator-item bg-orange-500 border-0 text-black ">wishItems.length</span>
            </div>
            
          </div>
          <div
            tabIndex={0}
            className = {theme == "light" ? lightViewcartTheme : darkViewcartTheme}
          >
            <div className="card-body">
              <span className="text-lg font-bold"></span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">
                  <Link to="/cart">View Wishlist</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-ghost hover:text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 17C11.355 17 10.7386 16.8779 10.1725 16.6555L7.93604 18.8923C9.12707 19.5961 10.5164 20 12 20C13.4836 20 14.8729 19.5961 16.064 18.8923L13.8275 16.6555C13.2614 16.8779 12.645 17 12 17ZM4 12C4 13.4836 4.40386 14.8729 5.10765 16.064L7.34451 13.8275C7.12213 13.2614 7 12.645 7 12C7 11.355 7.12213 10.7386 7.34451 10.1725L5.10765 7.93604C4.40386 9.12707 4 10.5164 4 12ZM18.8923 7.93604L16.6555 10.1725C16.8779 10.7386 17 11.355 17 12C17 12.645 16.8779 13.2614 16.6555 13.8275L18.8923 16.064C19.5961 14.8729 20 13.4836 20 12C20 10.5164 19.5961 9.12707 18.8923 7.93604ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM12 4C10.5164 4 9.12707 4.40386 7.93604 5.10765L10.1725 7.34451C10.7386 7.12213 11.355 7 12 7C12.645 7 13.2614 7.12213 13.8275 7.34451L16.064 5.10765C14.8729 4.40386 13.4836 4 12 4Z"></path></svg>
          <Link to="/help">Help</Link>
        </button>
        
        <button className="btn btn-ghost hover:text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg>
          <Link to="/profile" className="font-bold text-[1rem]">Sign In</Link>
        </button>


        {/* ------------------------------THEME--CONTROLLER-------------------- */}

        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            checked = {theme === 'dark'}
            value="synthwave"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            onChange={()=>{
              setTheme(theme == "light" ? "dark" : "light");
              localStorage.setItem("theme",theme == 'light' ? 'dark' : 'light');
            }}
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
