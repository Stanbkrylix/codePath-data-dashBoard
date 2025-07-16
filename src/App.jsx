import { useEffect, useState } from "react";

import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const URL = `https://api.spoonacular.com/recipes/complexSearch?&number=20&apiKey=${ACCESS_KEY}`;
const URL2 = `https://api.spoonacular.com/recipes/${716429}/information?apiKey=${ACCESS_KEY}`;

function App() {
    const [recipe, setRecipes] = useState([]);
    const [originalRecipe, setOriginalRecipe] = useState([]);
    const [filterSearchInput, setFilterSearchInput] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [showSearch, setShowSearch] = useState(true);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [toggleRecipes, setToggleRecipes] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setRecipes(data.results);
                setOriginalRecipe(data.results);
                setSliderValue(data.results.length);
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

    async function findRecipe(id) {
        const URL2 = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${ACCESS_KEY}`;

        try {
            const response = await fetch(URL2);
            const recipeData = await response.json();
            setCurrentRecipe(recipeData);
        } catch (error) {
            console.log("ERROR, " + error);
        }
    }

    function displayRecipe(id) {
        findRecipe(id);

        setToggleRecipes(!toggleRecipes);
    }
    function handleToggle() {
        setToggleRecipes(!toggleRecipes);
    }
    return (
        <>
            <div className="main-container">
                <div className="menu-container">
                    <h1 style={{ color: "#b68d40" }}>Food Recipes</h1>
                    <button
                        className="home-btn"
                        onClick={() => {
                            setToggleRecipes((prev) => (prev = true));
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
                    {showSearch && (
                        <div className="search-filter-container">
                            <input
                                type="text"
                                value={filterSearchInput}
                                onChange={(e) =>
                                    setFilterSearchInput(e.target.value)
                                }
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
                                }}
                            />
                            <button
                                className="search-btn"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    )}
                    {toggleRecipes ? (
                        <div className="recipe-cards-container">
                            {recipe.map((card) => (
                                <Card
                                    key={card.id}
                                    card={card}
                                    displayRecipe={displayRecipe}
                                />
                            ))}
                        </div>
                    ) : (
                        <CardDetails
                            details={currentRecipe}
                            handleToggle={handleToggle}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

function Card({ card, displayRecipe }) {
    return (
        <div className="card-recipe">
            <img src={card.image} alt="" className="card-recipe-img" />
            <div className="card-recipe-details">
                <p className="recipe">Recipe</p>
                <p className="card-title">{card.title}</p>
                <button
                    className="card-info"
                    onClick={() => displayRecipe(card.id)}
                >
                    Details
                </button>
            </div>
        </div>
    );
}

function CardDetails({ details, handleToggle }) {
    if (!details) return;
    return (
        <>
            <button
                style={{ marginBottom: "1rem", cursor: "pointer" }}
                onClick={handleToggle}
            >
                ❌
            </button>
            <div className="card-details">
                <img src={details.image} alt="" className="card-details-img" />
                <h2>{details.title}</h2>
                <div className="instruction-div">
                    <h3>Instructions:</h3>
                    {details.analyzedInstructions[0].steps.map((item) => {
                        return (
                            <p key={item.number}>
                                step {item.number}: {item.step}
                            </p>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
