import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { useForm } from "../../contextAPI/FormContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Carousel.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Carousel = () => {
  const { value, selectedCat, selectedDifficulty } = useForm();
  const [data, setData] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let baseURL = `https://opentdb.com/api.php?amount=${value}&category=${selectedCat}&difficulty=${selectedDifficulty}&type=multiple`;

      if (selectedCat === "any" || selectedDifficulty === "any") {
        const partsToRemove = [];
        if (selectedCat === "any") {
          partsToRemove.push("category");
        }
        if (selectedDifficulty === "any") {
          partsToRemove.push("difficulty");
        }

        const urlParts = baseURL.split("&");
        const filteredParts = urlParts.filter((part) => {
          const key = part.split("=")[0];
          return !partsToRemove.includes(key);
        });
        baseURL = filteredParts.join("&");
      } else {
      }

      const response = await fetch(baseURL);
      const parsedData = await response.json();
      setData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  // console.log("this is incorrect asnwers: ",array)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleOptionSelect = (questionIndex, option) => {
    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[questionIndex] = option;
    setSelectedChoices(newSelectedChoices);
    //console.log(selectedChoices);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
  };

  function countMatchingElements(array1, array2) {
    const matchingElements = array1.filter((element) =>
      array2.includes(element)
    );

    return matchingElements.length;
  }

  const handleSubmitQuiz = (e) => {
    // e.preventDefault();

    //console.log("Selected Choices:", selectedChoices);
    //console.log(correctOptions);

    const count = countMatchingElements(selectedChoices, correctOptions);

   // console.log("count", count);

    alert(`You Answered ${count} of ${shuffledOptions.length} correctly`);
    navigate("/");
  };

  useEffect(() => {
    if (data) {
      const shuffledData = data.results.map((question) => {
        const options = shuffleArray([
          question.correct_answer,
          ...question.incorrect_answers,
        ]);

        return {
          ...question,
          shuffledOptions: options,
        };
      });
      setShuffledOptions(shuffledData);
      setTimer(data.results.length * 30);
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 0) {
            return prevTimer - 1;
          }
          return prevTimer;
        });
      }, 1000);

      const correctAnswers = data.results.map(
        (question) => question.correct_answer
      );
      setCorrectOptions(correctAnswers);
      console.log(correctAnswers);

      const timeoutId = setTimeout(() => {
        handleSubmitQuiz();
      }, data.results.length * 30000);

      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }//eslint-disable-next-line
  }, [data]);

  if (!shuffledOptions) {
    //If there is no data loaded then I am showing a spinner Gif:
    return (
      <div className="hello">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h1>Time: {timer} seconds</h1>
      <div className="question-box">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {shuffledOptions.map((question, questionIndex) => (
            <SwiperSlide key={questionIndex}>
              <form
                action="post"
                onSubmit={(e) => handleSubmitQuestion(e, questionIndex)}
              >
                <h4
                  className="question-heading"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                />
                {question.shuffledOptions.map((option, optionIndex) => (
                  <div className="div-style" key={optionIndex}>
                    <input
                      className="MyInput"
                      name={`question_${questionIndex}`}
                      type="radio"
                      id={`option_${questionIndex}_${optionIndex}`}
                      value={option}
                      onChange={() => handleOptionSelect(questionIndex, option)}
                      checked={selectedChoices[questionIndex] === option}
                    />
                    <label
                      className="MyLabel"
                      htmlFor={`option_${questionIndex}_${optionIndex}`}
                      dangerouslySetInnerHTML={{ __html: option }}
                    ></label>
                  </div>
                ))}
              </form>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className="submit-button"
        type="button"
        onClick={handleSubmitQuiz}
      >
        Submit Quiz
      </button>
    </>
  );
};

export default Carousel;
