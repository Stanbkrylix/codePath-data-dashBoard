import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL4 = ` https://api.spoonacular.com/recipes/random?number=20&apiKey=${ACCESS_KEY}`;

function App() {
    const [recipe, setRecipes] = useState([]);
    const [originalRecipe, setOriginalRecipe] = useState([]);
    const [filterSearchInput, setFilterSearchInput] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [showSearch, setShowSearch] = useState(true);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [loadRecipes, setLoadRecipes] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoadRecipes(false);
            try {
                const response = await fetch(URL4);
                const data = await response.json();
                // console.log(data);
                setRecipes(data.recipes);
                setOriginalRecipe(data.recipes);
                setSliderValue(data.recipes.length);
                setLoadRecipes(true);
            } catch (error) {
                console.log("ERROR", error);
            }
        }
        fetchData();
    }, []);

    function handleSearch() {
        const filtered = originalRecipe
            .filter((item) =>
                item.title
                    .toLowerCase()
                    .includes(filterSearchInput.toLowerCase())
            )
            .slice(0, sliderValue || originalRecipe.length);
        setRecipes(filtered);
    }

    function displayRecipe(id) {
        findRecipe(id);
        console.log(currentRecipe);
        setToggleRecipes(!toggleRecipes);
    }

    function randomRecipe() {
        const randomNum = Math.floor(Math.random() * recipe.length) + 1;
        return recipe[randomNum];
    }

    return (
        <>
            <div className="main-container">
                <div className="menu-container">
                    <h1 style={{ color: "#b68d40" }}>Food Recipes</h1>
                    <button
                        className="home-btn"
                        onClick={() => {
                            // setToggleRecipes((prev) => (prev = true));
                        }}
                    >
                        <img src="/assets/home.svg" alt="" />{" "}
                        <span>Dashboard </span>
                    </button>
                    <button
                        className="menu-btn"
                        onClick={() => {
                            setShowSearch(!showSearch);
                            setFilterSearchInput("");
                            setSliderValue(originalRecipe.length);
                        }}
                    >
                        <img src="/assets/search.svg" alt="" />
                        <span> Search </span>
                    </button>
                </div>

                {}

                <div className="recipes-container">
                    <h1>Recipe Menu</h1>
                    <DashboardCard recipe={randomRecipe()} />
                    {showSearch && (
                        <div className="search-filter-container">
                            <input
                                type="text"
                                value={filterSearchInput}
                                onChange={(e) => {
                                    setFilterSearchInput(e.target.value);
                                    handleSearch();
                                }}
                                placeholder="search-recipe"
                                className="recipe-input"
                            />
                            <input
                                type="range"
                                className="slider"
                                min="0"
                                max={originalRecipe.length}
                                value={sliderValue || originalRecipe.length}
                                onChange={(e) => {
                                    setSliderValue(e.target.value);
                                    handleSearch();
                                }}
                            />
                            <button
                                className="search-btn"
                                onClick={() => {
                                    // handleSearch;
                                    console.log(originalRecipe);
                                }}
                            >
                                Search
                            </button>
                        </div>
                    )}

                    <div className="recipe-cards-container">
                        {loadRecipes ? (
                            recipe.map((card) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    displayRecipe={displayRecipe}
                                />
                            ))
                        ) : (
                            <h1 className="loading">Recipe is Loading...</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function Card({ card }) {
    const navigate = useNavigate();

    return (
        <div className="card-recipe">
            <img src={card.image} alt="" className="card-recipe-img" />
            <div className="card-recipe-details">
                <p className="recipe">Recipe</p>
                <p className="card-title">{card.title}</p>
                <button
                    className="card-info"
                    onClick={() => navigate(`/recipe/${card.id}`)}
                >
                    Details
                </button>
            </div>
        </div>
    );
}

function DashboardCard({ recipe }) {
    return (
        <div className="dashboard-cards">
            <div className="diets-div">
                <h2>Name</h2>
                {recipe?.title === null ? (
                    <p>Any type</p>
                ) : (
                    <p>{recipe?.title}</p>
                )}
            </div>
            <div className="dishTypes-div">
                <h2>Dish types</h2>
                {recipe?.dishTypes.length === 0 ? (
                    <p>Any type</p>
                ) : (
                    recipe?.dishTypes?.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))
                )}
            </div>
            <div className="ingredients-div">
                <h2>Main Ingredients</h2>
                <div className="ingredients">
                    {recipe?.extendedIngredients.length === 0 ? (
                        <p>Any type</p>
                    ) : (
                        recipe?.extendedIngredients?.map((item, index) => (
                            <p key={index}>{item.name}</p>
                        ))
                    )}
                </div>
            </div>
            <div className="picture-div">
                <h2>Picture</h2>
                <div className="picture">
                    <img src={recipe?.image} alt="" />
                </div>
            </div>
        </div>
    );
}

export default App;
