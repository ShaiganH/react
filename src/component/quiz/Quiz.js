import { React, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contextAPI/FormContext";
import "./Quiz.css";




const Quiz = () => {
  const navigation = useNavigate()

  const {setValue, setSelectedCat, setSelectedDifficulty} = useForm();


  const [input, setInput] = useState(0);
  const onChange = (e) => {
    const {  value } = e.target;
    setInput(value);
  };



let selectCat = useRef(null)
let selectRefDifficulty = useRef(null)


  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCat = selectCat.current.value
    const selectedDifficulty = selectRefDifficulty.current.value;
    

    setValue(input)
    setSelectedCat(selectedCat);
    setSelectedDifficulty(selectedDifficulty);
   

    navigation("/startquiz")

  };

  return (
    <>
      <div className="page">
        <div className="container">
          <h1> Challenge Yourself:</h1>
          <p className="list">
            Ready for a mental workout? Explore our diverse quizzes, choose your
            challenge level, and put your knowledge to the test. Unleash your
            inner quiz champion today!
          </p>
          <form action="post" className="form" onSubmit={handleSubmit}>
            <label htmlFor="quizAmount">
              <p>Number of Questions:</p>
            </label>
            <input
              type="number"
              name="quizAmount"
              id="quizAmount"
              min={1}
              max={50}
              value={input}
              onChange={onChange}
            />
            <label htmlFor="quizCategory">
              <p>Select Category</p>
            </label>
            <select name="quizCategory" ref={selectCat} className="form-control">
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                {" "}
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>{" "}
            </select>
            <label htmlFor="quizDifficulty">
              <p>Select Difficulty</p>
            </label>
            <select name="quizDifficulty" ref={selectRefDifficulty} className="form-control">
              <option value="any">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
           
            <button className="formButton" type="submit">Start</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Quiz;


