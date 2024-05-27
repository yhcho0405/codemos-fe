import React, { useState } from "react";
import './Main.css';
import File from './File/File'
import Code from './Code/Code'
import ColabHeader from "./Header/ColabHeader";

export default function Main({isLogin, setIsLogin}){
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedProblem, setSelectedProblem] = useState(null); 
  const [isDocsVisible, setIsDocsVisible] = useState(false); // DOCS 표시 상태
  const toggleDocsVisibility = () => {
    console.log("Toggling visibility");
    setIsDocsVisible(!isDocsVisible); // 상태 토글
  };

  return(
    <div className='contents'>
      <ColabHeader toggleDocsVisibility={toggleDocsVisibility} />
      <div className="space">
        <div className="file-container">
          <File setSelectedCode={setSelectedCode} setSelectedProblem={setSelectedProblem}></File>
        </div>
        <div class="resizer"></div> 
        <div className="code-container">
          <Code selectedCode={selectedCode} selectedProblem={selectedProblem} isDocsVisible={isDocsVisible} />
        </div>
        <div className="right-border">
          <div className="document"></div>
        </div>
      </div>
    </div>
  );
}
