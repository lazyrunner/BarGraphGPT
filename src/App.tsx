import Header from "./components/Header";
import BarChart from "./components/BarChart";
import {useState} from 'react'


export default function App() {
  const [prompt, setPrompt] = useState('')
  const promptClicked = (data:string) =>{
    setPrompt(data)
  }
  return (
    <div>
      <Header onSubmit={promptClicked}/>
      <BarChart prompt={prompt}/>
    </div>
  );
}
