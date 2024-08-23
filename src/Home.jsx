import { useState, useEffect, useContext, useRef } from "react";
import Data from "./Data";
import ProductCard from "./ProductCard";
import ShimmerUI from "./ShimmerUI";
import { ThemeStore } from "./utils/ThemeController";
import Cuisine from "./Cuisine";

let Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [query, setQuery] = useState("");
  const [cuisineCount, setCuisineCount] = useState(7);
  const [cuisineData, setCuisineData] = useState([])

  const { theme } = useContext(ThemeStore);

  const cuisineRef = useRef()

  let cuisines = ["Italian","Asian","Indian","Japanese","Moroccan","Korean","Greek","Thai","Turkish","Mexican","Russian","Lebanese","Brazilian","Smoothie","Mediterranean"]


  const getData = async () => {
    let data = await fetch("https://dummyjson.com/recipes");
    let obj = await data.json();
    setRecipeData(obj.recipes);
    setAllData(obj.recipes);
    console.log(1);
  };

  const getCuisineData = async () => {
    // Just take care of any null data, read notes
    try {
      let dataPromises = cuisines.map((cuisine) => fetch(`https://dummyjson.com/recipes/tag/${cuisine}`));
      let responses = await Promise.all(dataPromises);
      let cuisineData = await Promise.all(responses.map(async (response, index) => {
          if (response.ok) { 
            let data = await response.json();
            return data.recipes[0];
          } 
        })
      );
      setCuisineData(cuisineData);
    } catch (error) {
      console.error("Error fetching cuisine data:", error);
    }
  };
  

  useEffect(() => {
    getData();
    getCuisineData()
  }, []);



  if (allData.length == 0) {
    return <ShimmerUI />;
  }


  let handleCuisineRef = (direction) => {
    if(direction === 'right'){
      setCuisineCount(cuisineCount+2)
      cuisineRef ? (cuisineRef.current.scrollLeft += 500) : null
    }else { 
      cuisineRef ? (cuisineRef.current.scrollLeft -= 500) : null
    }
  }

  let sortCategoryAsc = (category) => {
    let copy = [...allData];
    copy.sort((a, b) => a[category] - b[category]);
    setRecipeData([...copy]);
  };

  let sortCategoryDesc = (category) => {
    let copy = [...allData];
    copy.sort((a, b) => b[category] - a[category]);
    setRecipeData([...copy]);
  };

  let handleTopRated = () => {
    let filteredData = recipeData.filter((obj) => {
      return obj.rating > 4.5;
    });

    setRecipeData(filteredData);
  };

  let handleDifficulty = (category) => {
    // let copy = [...allData]
    let filteredData = allData.filter((obj) => {
      return obj.difficulty == category;
    });
    setRecipeData(filteredData);
  };

  let handleMealType = (category) => {
    // let copy = [...allData]
    let filteredData = allData.filter((obj) => {
      for (const mealtype of obj.mealType) {
        // console.log(obj.id,mealtype)
        if (mealtype == category) return true;
      }
    });
    setRecipeData(filteredData);
  };

  let handleSearch = (event) => {
    if (event.key === "Enter") {
      let filteredData = allData.filter((obj) => {
        return obj.name.toLowerCase().includes(query.toLowerCase().trim());
      });
      setRecipeData(filteredData);
      setQuery("");
    }
  };


  let currentThemeStyle =
    theme == "light"
      ? { backgroundColor: "white", color: "#1E201E" }
      : { backgroundColor: "#3A3535", color: "white" };

  let lightTheme =
    "utility flex justify-start mx-10 [&>*]:mx-2 [&>*]:rounded-full [&>*]:border-gray-300 [&>*]:text-gray-700";
  let darkTheme =
    "utility flex justify-start mx-10 [&>*]:mx-2 [&>*]:rounded-full [&>*]:border-gray-600";

  let darkDropboxTheme =
    "btn btn-sm bg-transparent border-gray-600 hover:bg-gray-400 hover:border-gray-400 hover:text-gray-800 rounded-full";
  let lightDropboxTheme =
    "btn btn-sm py-2 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-400 hover:border-gray-400 rounded-full";
  
  

  return (
    <div className="w-full min-h-[87.95vh] p-4 px-32" style={currentThemeStyle}>
      {console.log(2)}

      <div className="flex justify-between items-center mt-14 mx-4 text- font-bold text-2xl  p-8">
        <div>What's on your mind?</div>
        <div>
          <button className="btn btn-sm btn-circle btn-outline mx-2" onClick={()=>handleCuisineRef('left')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg> 
          </button>
          <button className="btn btn-sm btn-circle btn-outline" onClick={()=> handleCuisineRef('right')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
          </button>
        </div>
      </div>

      <div className="flex justify-evenly px-8 overflow-x-auto scroll-smooth" style={{scrollbarWidth:"none"}} ref={cuisineRef}>
        {cuisineData.slice(0,cuisineCount).map((obj,idx) => {
          return <Cuisine obj={obj} key={idx}></Cuisine>
        })}
      </div>

      <div className="mt-8 mx-4 text- font-bold text-2xl  p-8">
        <p>Best Food Recipes from around the World</p>
      </div>

      <div className={theme == "light" ? lightTheme : darkTheme}>
        <div className="dropdown sort ">
          <div
            tabIndex={0}
            role="button"
            className={theme == "light" ? lightDropboxTheme : darkDropboxTheme}
          >
            Sort By {"\u2186"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-56 p-2 shadow-md"
            style={currentThemeStyle}
          >
            <li>
              <a>
                Ratings
                <div className="flex justify-end [&>*]:bg-transparent [&>*]:mx-1 [&>*]:border-gray-600">
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryAsc("rating")}
                  >
                    {"\u27F1"}
                  </button>
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryDesc("rating")}
                  >
                    {"\u27F0"}
                  </button>
                </div>
              </a>
            </li>
            <li>
              <a>
                Total Calories
                <div className="flex justify-end [&>*]:bg-transparent [&>*]:mx-1 [&>*]:border-gray-600">
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryAsc("caloriesPerServing")}
                  >
                    {"\u27F1"}
                  </button>
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryDesc("caloriesPerServing")}
                  >
                    {"\u27F0"}
                  </button>
                </div>
              </a>
            </li>
            <li>
              <a>
                Cooking Time
                <div className="flex justify-end [&>*]:bg-transparent [&>*]:mx-1 [&>*]:border-gray-600">
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryAsc("cookTimeMinutes")}
                  >
                    {"\u27F1"}
                  </button>
                  <button
                    className="btn btn-xs"
                    onClick={() => sortCategoryDesc("cookTimeMinutes")}
                  >
                    {"\u27F0"}
                  </button>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown difficulty">
          <div
            tabIndex={0}
            role="button"
            className={theme == "light" ? lightDropboxTheme : darkDropboxTheme}
          >
            Difficulty {"\u2186"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-40 p-2 shadow-md"
            style={currentThemeStyle}
          >
            <li>
              <a onClick={() => handleDifficulty("Easy")}>Easy</a>
            </li>
            <li>
              <a onClick={() => handleDifficulty("Medium")}>Medium</a>
            </li>
            <li>
              <a onClick={() => handleDifficulty("Hard")}>Hard</a>
            </li>
          </ul>
        </div>
        <div className="dropdown meal-type">
          <div
            tabIndex={0}
            role="button"
            className={theme == "light" ? lightDropboxTheme : darkDropboxTheme}
          >
            Meal Type {"\u2186"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] w-40 p-2 shadow-md"
            style={currentThemeStyle}
          >
            <li>
              <a onClick={() => handleMealType("Breakfast")}>Breakfast</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Lunch")}>Lunch</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Dinner")}>Dinner</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Snack")}>Snack</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Dessert")}>Dessert</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Beverage")}>Beverage</a>
            </li>
            <li>
              <a onClick={() => handleMealType("Appetizer")}>Appetizer</a>
            </li>
          </ul>
        </div>
        <button className="btn btn-outline btn-sm" onClick={handleTopRated}>
          Rating 4.5+
        </button>
        <button className="btn btn-outline btn-sm">Fast Cook Time</button>
        <button className="btn btn-outline btn-sm">Vegetarian</button>
        <button className="btn btn-outline btn-sm">Italian</button>
        <button className="btn btn-outline btn-sm">Mexican</button>

        <div className="searchBar w-72 [&>*]:border-gray-600 [&>*]:rounded-full [&>*]:mx-2">
          <label className="input input-sm input-bordered flex items-center gap-2 bg-transparent">
            <input
              type="text"
              className="grow "
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="flex justify-evenly flex-wrap ">
        {recipeData.map((obj) => (
          <ProductCard obj={obj} key={obj.id}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
