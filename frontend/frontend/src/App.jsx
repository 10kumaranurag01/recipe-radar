import { useState, useRef } from "react";
import "./App.css";
import logo from "./assets/Radar (1).png";
import ImageRotation from "./components/ImageRotate";
import axios from "axios";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [speechRate, setSpeechRate] = useState(1); // Default speech rate
  const [speechPlaying, setSpeechPlaying] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const synth = useRef(window.speechSynthesis);

  const speakRecipe = () => {
    if (!synth.current.speaking && recipe) {
      const utterance = new SpeechSynthesisUtterance(recipe);
      utterance.rate = speechRate;
      synth.current.speak(utterance);
      setSpeechPlaying(true);
    }
  };

  const pauseSpeech = () => {
    synth.current.pause();
    setSpeechPlaying(false);
  };

  const resumeSpeech = () => {
    synth.current.resume();
    setSpeechPlaying(true);
  };

  const stopSpeech = () => {
    synth.current.cancel();
    setSpeechPlaying(false);
  };

  const fetchRecipe = async () => {
    try {
      const response = await axios.post(
        "https://worker-old-haze-24ea.kumarkas1515.workers.dev/generate-recipe",
        {
          ingredients: ingredients,
        }
      );
      const data = response.data;
      setRecipe(data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    const newIngredientTrimmed = newIngredient.trim();
    if (newIngredientTrimmed) {
      setIngredients([...ingredients, newIngredientTrimmed]);
      setNewIngredient(""); // Clear the input field
    }
  };

  const handleSpeedChange = (rate) => {
    setSpeechRate(rate);
  };

  return (
    <div className="pattern flex justify-around items-center p-3">
      <div className="flex h-full w-full">
        <div className="flex justify-center items-center font-sans  h-screen p-10">
          <header className="h-full">
            <img src={logo} className="pb-4" />
            <form onSubmit={handleAddIngredient}>
              <input
                type="text"
                name="ingredient"
                placeholder="Enter an ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button
                type="submit"
                className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                onClick={() => setShowRest(true)}
              >
                Add Ingredient
              </button>
            </form>

            {showRest && (
              <div>
                {" "}
                <div className="mb-2">
                  <h2 className="font-bold font-sans">Ingredients:</h2>
                  <div className="flex">
                    {ingredients.map((ingredient, index) => (
                      <div
                        className="p-2 bg-yellow-200 m-2 rounded-xl"
                        key={index}
                      >
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="uiverse" onClick={fetchRecipe}>
                  <div className="wrapper">
                    <span>Generate Recipe</span>
                    <div className="circle circle-12"></div>
                    <div className="circle circle-11"></div>
                    <div className="circle circle-10"></div>
                    <div className="circle circle-9"></div>
                    <div className="circle circle-8"></div>
                    <div className="circle circle-7"></div>
                    <div className="circle circle-6"></div>
                    <div className="circle circle-5"></div>
                    <div className="circle circle-4"></div>
                    <div className="circle circle-3"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-1"></div>
                  </div>
                </button>
                {recipe && (
                  <div>
                    <div className="flex justify-end m-2">
                      <div className="flex justify-between items-center px-3 bg-yellow-400 rounded-xl">
                        <h2 className="px-2 font-bold font-mono flex justify-center items-center ">
                          Read Aloud{" "}
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                          />
                        </svg>
                      </div>

                      <div className="flex justify-center items-center px-3">
                        <button
                          onClick={speakRecipe}
                          disabled={!recipe || speechPlaying}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                            />
                          </svg>
                        </button>

                        <button onClick={pauseSpeech} disabled={!speechPlaying}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                            />
                          </svg>
                        </button>
                        <button onClick={resumeSpeech} disabled={speechPlaying}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                        </button>
                        <button onClick={stopSpeech} disabled={!speechPlaying}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <label>
                          <select
                            value={speechRate}
                            onChange={(e) =>
                              handleSpeedChange(parseFloat(e.target.value))
                            }
                            className="flex justify-center items-center"
                          >
                            <option value="0.5">0.5x</option>
                            <option value="0.75">0.75x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="recipe-container font-mono bg-yellow-200 rounded-xl p-8">
                      <div dangerouslySetInnerHTML={{ __html: recipe }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </header>
        </div>
      </div>
      <div>
        <ImageRotation />
      </div>
    </div>
  );
}

export default App;
