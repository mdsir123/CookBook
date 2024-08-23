import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { ThemeStore } from "./utils/ThemeController";

const SingleProductPage = () => {
  let { id } = useParams();

  let [ingredient, setIngredient] = useState(true);

  let [recipeData, setRecipeData] = useState(null);

  let [user, setUser] = useState("Adm")

  let [comment, setComment] = useState("");

  let [showIdx, setShowIdx] = useState(null)

  let {theme, setTheme} = useContext(ThemeStore)


  let getData = async () => {
    try {
      let data = await fetch(`https://dummyjson.com/recipes/${id}`);
      let obj = await data.json();
      setRecipeData(obj);
    } catch (error) {
      console.log("could not fetch data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  let {
    name = "Recipe",
    image = "",
    rating = 0,
    prepTimeMinutes = 0,
    difficulty = "",
    cookTimeMinutes = 0,
    cuisine = "",
    ingredients = [],
    instructions = [],
    tags = [],
    mealType = "",
    caloriesPerServing = 0,
  } = recipeData;

  let showStyle = "p-12 h-[100%] font-semibold text- overflow-y-auto";
  let hideStyle = "p-12 h-[100%] font-semibold overflow-y-auto hidden";

  let ingredientUI = ingredient ? showStyle : hideStyle;
  let instructionUI = ingredient ? hideStyle : showStyle;

  let currentIngrStyle = ingredient
    ? { backgroundColor: "#ccd8e4", color: "#232020" }
    : { backgroundColor: "#232020", color: "#ccd8e4" };
  let currentInstStyle = ingredient
    ? { backgroundColor: "#232020", color: "#ccd8e4" }
    : { backgroundColor: "#ccd8e4", color: "#232020" };

  let handleAddCommentBtn = ()=>{

    let existingComments = JSON.parse(localStorage.getItem('comments')) || []

    let commentData = [user, comment]

    existingComments.push(commentData)

    localStorage.setItem('comments',JSON.stringify(existingComments))
    setComment("")
  }

  let darkCardTheme = "card bg-base-100  shadow-xl"
  let lightCardTheme = "card bg-[#f0f7ff]  shadow-xl"

  let currentCardTitle = theme == 'light' ? {color:"#1f2937"} : {color:'white'}

  let currentCardTag = theme == 'light' ? {color:"#374151"} : {color:'#9ca3af'}

  let currentContentFont = theme == 'light' ? {color:"#1f2937"} : {color:'#9ca3af'}

  let darkContentTheme = "bg-base-200 h-[75%]"
  let lightContentTheme = "bg-[#e3f1fe] h-[75%]"

  let darkBase = "bg-base-200 h-[12.5%] rounded-b-2xl"
  let lightBase = "bg-[#e3f1fe] h-[12.5%] rounded-b-2xl"


  let darkCommentSection = "comment-section min-h-[10vh] w-[65vw] bg-base-200 rounded-box   mt-4 mx-auto p-4"
  let lightCommentSection = "comment-section min-h-[10vh] w-[65vw] bg-gray-300 rounded-box [&>*]:text-gray-800  mt-4 mx-auto p-4"

  let darkResetBtn = "btn btn-sm btn-outline rounded-full -mx-1"
  let lightResetBtn = "btn btn-sm btn-outline rounded-full border-gray-800 text-gray-800  -mx-1"

  return (
    <div
      className="w-full  h-full pt-28 pb-10"
      style={theme == 'light' ? {backgroundColor: "white"}:{ backgroundColor: "#3A3535" }}
    >
      <div className="flex justify-around w-[70vw] h-[70vh]  mx-auto ">
        {/* product-description-card */}
        <div className={theme == 'light' ? lightCardTheme : darkCardTheme}>
          <figure className="px-10 pt-10 h-64">
            <img src={image} alt={name} className="rounded-xl h-full" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title" style={currentCardTitle}>
              {name}
              <div className="badge badge-secondary text-xs">{difficulty}</div>
            </h2>

            <div className="text-sm">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"
                  ></path>
                </svg>
                <div className="px-1 text-sm" style={currentCardTag}>
                  {" "}
                  Prep: <span className="font-bold">{prepTimeMinutes} m </span>
                </div>{" "}
                {"\u2022"}
                <div className="px-1" style={currentCardTag}>
                  {" "}
                  Cook: <span className="font-bold">{cookTimeMinutes} m </span>
                </div>{" "}
                |
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z"
                  ></path>
                </svg>
                <div className="px-1" style={currentCardTag}>
                  <span className="font-bold">{caloriesPerServing}</span>{" "}
                  Calories
                </div>
              </div>
            </div>

            <div>
              <div className="flex [&>*]:mx-2" >
                <button className="btn">
                  Rating:
                  <div className="badge badge-success">{rating}</div>
                </button>
                <button className="btn">
                  Cuisine:
                  <div className="badge badge-success">{cuisine}</div>
                </button>
              </div>
            </div>

            <div className="card-actions justify-end" style={currentCardTag}>
              <div className="badge badge-outline">{tags[0]}</div>
              <div className="badge badge-outline">{tags[1]}</div>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  // stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.0001 13.9999V16.9999H22.0001V18.9999H18.9991L19.0001 21.9999H17.0001L16.9991 18.9999H14.0001V16.9999H17.0001V13.9999H19.0001ZM20.2426 4.75736C22.4033 6.92253 22.5715 10.3141 20.7498 12.667C19.9261 12.2403 18.9911 12 18 12C14.6863 12 12 14.6863 12 18C12 19.0089 12.249 19.9596 12.6889 20.794L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736Z"
                  ></path>
                </svg>
                Save
              </button>
              <button className="btn btn-primary ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  // stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17ZM11.9998 14.6564L14.8165 16.3769L14.0507 13.1664L16.5574 11.0192L13.2673 10.7554L11.9998 7.70792L10.7323 10.7554L7.44228 11.0192L9.94893 13.1664L9.18311 16.3769L11.9998 14.6564Z"></path>
                </svg>
                Add to Favs
              </button>
            </div>
          </div>
        </div>

        {/* ingredient/instruction - accordian */}

        <div className="w-[50%] bg-base-300 rounded-full">
          <div className="h-[12.5%] rounded-t-2xl flex justify-evenly font-bold text-lg">
            <div
              className="w-[50%] p-4 text-center rounded-tl-2xl cursor-pointer focus:border-2"
              onClick={() => setIngredient(true)}
              style={currentIngrStyle}
            >
              Ingredients
            </div>
            <div
              className="w-[50%] p-4 text-center rounded-tr-2xl cursor-pointer focus:border-2"
              onClick={() => setIngredient(false)}
              style={currentInstStyle}
            >
              Instructions
            </div>
          </div>

          <div className={theme == "light" ? lightContentTheme : darkContentTheme}>
            <div className={ingredientUI} style={currentContentFont}>
              {ingredients.map((ingred, index) => (
                <div className="m-2" key={index}>
                  {index + 1}. {ingred}
                </div>
              ))}
            </div>
            <div className={instructionUI} style={currentContentFont}>
              {instructions.map((instr, index) => (
                <div className="m-2" key={index}>
                  {index + 1}. {instr}
                </div>
              ))}
            </div>
          </div>

          <div className={theme == 'light' ? lightBase:darkBase}></div>
        </div>
      </div>

      <div className={theme == 'light' ? lightCommentSection : darkCommentSection}>

        <div className="comment-sect-head text-2xl p-2 h-[10%] border-gray-500 border-b-2">
          {JSON.parse(localStorage.getItem('comments')) !== null ? JSON.parse(localStorage.getItem('comments')).length : 0}{" "}Comments{" "}
          <button>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" pt-1 border-2 rounded-lg inline-block align-top h-7 w-7"
              style={theme == 'light' ? {borderColor:'#1f2937'} : {borderColor:"white"}}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
            </svg>
          </button>
          <button className="hidden">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" pt-1 border-2 rounded-lg inline-block align-top h-7 w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
            </svg>
          </button>
        </div>

        <div className="add-comment-section h-[15%] bg- flex justify-evenly items-center mx-3 my-6">
          <div className="rounded-full bg-orange-500 p-3 text-black text-xs font-semibold">{user}</div>
          <textarea
            className="h-[6vh] w-[70%] bg-[#3a3a42] rounded-xl p-2 text-white resize-none"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button
            className="btn btn-sm btn-primary rounded-full -mx-1"
            onClick={handleAddCommentBtn}
          >
            Comment
          </button>
          <button
            className={theme=='light'?lightResetBtn:darkResetBtn}
            onClick={()=>setComment("")}
          >
            Reset
          </button>
        </div>

        <div className="comments-from-LS h-[65%] flex flex-col items-end mt-6">
          {JSON.parse(localStorage.getItem('comments')||'[]').map((commentData,index)=>
            <Comments commentData={commentData} index={index} showIdx={showIdx} setShowIdx={setShowIdx} key={index}></Comments>
          )}
        </div>

      </div>
    </div>
  );
};

export default SingleProductPage;
