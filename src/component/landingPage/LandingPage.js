import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css"

//This is the landing page of the website. Made an array of words that are synonyms of smart/intelligent and cycled them through setinterval function that displays each element arrays at the delay of 3 seconds and i setted it in useEffect so it creates a changing effect every time  everytime the element of array changes. I used readt-router-dom's useNavigate to navigate to another component when user clicks om the start quiz button. I used a puzzle style background image through css.

export default function LandingPage() {
  const navigate = useNavigate();
    
    const [text, setText] = useState('');
    const array = ['Smart', 'Intelligent','quick-witted','brilliant', 'Sharp', 'Bright'];
  
    useEffect(() => {
      let i = 0;
      const intervalID = setInterval(() => {
        setText(array[i]);
        i = (i + 1) % array.length;
      }, 3000);
  
      return () => {
        clearInterval(intervalID);
      };//eslint-disable-next-line
    }, []);
  
const onClick = ()=>{
  navigate('/quiz');
}

  return (
    
    <div  className='landingPage'>
        <div className='pageText'>
        <h5 className='this'>Are You:&nbsp; </h5>
        <h5 className="transitionText">{text?text+"?":text}</h5>
        </div>
        <div className='ask'>
            <h5 style={{alignSelf:"flex-start",marginTop:"0"}}>Let's Find Out: </h5>
            <button onClick={onClick} className='quizButton'>Take a Quiz</button>
        </div>
    </div>
    
    
  )
}
