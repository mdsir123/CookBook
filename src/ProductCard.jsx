import { useState, useContext } from "react";
import { ThemeStore } from "./utils/ThemeController";
import { useNavigate } from "react-router-dom";
import { addWish } from "./utils/store/WishSlice";
import { useDispatch } from "react-redux";

let ProductCard = ({ obj }) => {
  let [added, setAdded] = useState(false);

  let { theme } = useContext(ThemeStore);

  let navigate = useNavigate();

  // prop recieved here as Object : {obj : ---} so we can destructure
  let {
    id,
    image,
    name,
    cookTimeMinutes,
    rating,
    tags,
    cuisine,
    caloriesPerServing,
  } = obj;
  // destructuring data from obj

  let dispatch = useDispatch()

  let handleRouting = () => {
    navigate(`/recipe/${id}`);
  };

  let handleWishlistBtn = (event) => {
    event.stopPropagation();
    setAdded(!added);
    dispatch(addWish())
  };

  let darkTheme =
    "card card-compact bg-base-300 w-[20%] relative overflow-hidden shadow-xl m-4";
  let lightTheme =
    "card card-compact bg-gray-200 w-[20%] relative overflow-hidden shadow-xl m-4";

  let addedToWishlist = added ? "h-7 w-7 text-red-600" : "h-7 w-7 text-gray-500";
  let addedIconPath = added
  ? "M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"
  : "M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z";

  let lightBtnTheme = "btn btn-outline text-gray-700 rounded-full p-[14px]";
  let darkBtnTheme = "btn btn-outline rounded-full p-[14px]";

  return (
    <div
      className={theme == "light" ? lightTheme : darkTheme}
      onClick={handleRouting}
    >
      <button
        className="btn btn-circle btn-outline border-0 absolute top-2 left-2 "
        onClick={handleWishlistBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={addedToWishlist}
          fill="currentcolor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d={addedIconPath}
          ></path>
        </svg>
      </button>
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body ">
        <div className="h-[70%]">
          <h2 className="card-title  font-bold">{name}</h2>
          <div className=" font-semibold text-base">
            <div className="rating rating-xs border-2 border-green-700 p-[1px] rounded-full mx-1 pointer-events-none">
              <input
                type="radio"
                name="rating-5"
                className="mask mask-star-2 bg-green-700"
              />
            </div>
            {rating} {"\u2022"} {cookTimeMinutes} mins {"\u2022"}{" "}
            {caloriesPerServing} kcal
          </div>
          <div className="text-base">
            <span>{tags[0]}, </span>
            <span>{tags[1]}, </span>
            <span>{tags[2]} </span>
            <p>{cuisine}</p>
          </div>
        </div>
        <div className="card-actions justify-end">
          {/* <button className={theme == "light" ? lightBtnTheme : darkBtnTheme} onClick={handleAddBtn}>
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
            </button> */}
          <button className="btn btn-primary  rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 1.5C8 0.947715 7.55228 0.5 7 0.5C6.44772 0.5 6 0.947715 6 1.5V2.5C6 2.50686 6.00042 2.51285 6.00081 2.51843C6.00385 2.56193 6.00516 2.58063 5.79289 2.79289L5.77277 2.81298C5.50599 3.07912 5 3.58391 5 4.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V4.5C7 4.49314 6.99958 4.48715 6.99919 4.48157C6.99615 4.43807 6.99484 4.41937 7.20711 4.20711L7.22723 4.18702C7.49401 3.92088 8 3.41609 8 2.5V1.5ZM19 1.5C19 0.947715 18.5523 0.5 18 0.5C17.4477 0.5 17 0.947715 17 1.5V2.5C17 2.50686 17.0004 2.51285 17.0008 2.51843C17.0038 2.56193 17.0052 2.58063 16.7929 2.79289L16.7728 2.81298C16.506 3.07912 16 3.58391 16 4.5V5.5C16 6.05228 16.4477 6.5 17 6.5C17.5523 6.5 18 6.05228 18 5.5V4.5C18 4.49314 17.9996 4.48715 17.9992 4.48157C17.9962 4.43807 17.9948 4.41937 18.2071 4.20711L18.2272 4.18702C18.494 3.92088 19 3.41609 19 2.5V1.5ZM12.5 0.5C13.0523 0.5 13.5 0.947715 13.5 1.5V2.5C13.5 3.41609 12.994 3.92088 12.7272 4.18702L12.7071 4.20711C12.4948 4.41937 12.4962 4.43807 12.4992 4.48157C12.4996 4.48715 12.5 4.49314 12.5 4.5V5.5C12.5 6.05228 12.0523 6.5 11.5 6.5C10.9477 6.5 10.5 6.05228 10.5 5.5V4.5C10.5 3.58391 11.006 3.07912 11.2728 2.81298L11.2929 2.79289C11.5052 2.58063 11.5038 2.56193 11.5008 2.51843C11.5004 2.51285 11.5 2.50686 11.5 2.5V1.5C11.5 0.947715 11.9477 0.5 12.5 0.5ZM4 10H20C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10ZM3 8C2.44772 8 2 8.44771 2 9V10C2 14.1006 4.46819 17.6248 8 19.1679V20C8 20.5523 8.44772 21 9 21H15C15.5523 21 16 20.5523 16 20V19.1679C19.5318 17.6248 22 14.1006 22 10V9C22 8.44772 21.5523 8 21 8H3Z"
              ></path>
            </svg>
            Let's Cook
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
