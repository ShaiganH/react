
import "./App.css";
import { FormProvider } from "./contextAPI/FormContext";

//I used react-router-dom to navigate through components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./component/landingPage/LandingPage";
import Navbar from "./component/navbar/Navbar";
import Quiz from "./component/quiz/Quiz";
import StartQuiz from "./component/startQuiz/StartQuiz";
import About from "./component/About/About";

function App() {
  
  return (
    
    <Router>
    <FormProvider>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/startquiz" element={<StartQuiz />} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
    </FormProvider>
  </Router>
    
  );
}

export default App;
