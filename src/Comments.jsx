import React, {useState, useContext} from "react";
import { ThemeStore } from "./utils/ThemeController";

const Comments = ({commentData,index,showIdx,setShowIdx}) =>{

    let {theme, setTheme} = useContext(ThemeStore)

    let darkTheme = "titlebox h-full w-[60vw] bg-base-100  rounded-lg mt-1 p-1 px-2 flex justify-between font-semibold text-base"
    let lightTheme = "titlebox h-full w-[60vw] bg-gray-100  rounded-lg mt-1 p-1 px-2 flex justify-between font-semibold text-gray-900"


    return (
        <div className="min-h-1/4 p-1">
            <div className={theme == 'light' ? lightTheme : darkTheme}>
              <p>{commentData[0]}</p>
              <button onClick={()=>setShowIdx(showIdx == index ? null : index)}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block align-top h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              </button>
            </div>
            {showIdx == index ? <div className="commentbox h-full w-[60vw] bg-gray-500  rounded-lg  p-2 px-6 flex justify-between text-black text-lg ">
              <p>{commentData[1]}</p>
            </div> : <></>}
          </div>
    )
}

export default Comments