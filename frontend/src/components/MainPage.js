import React, { useState } from "react";
import "../styles/MainPage.css";

const MainPage = () => {
  const [started, setStarted] = useState(false);  // 시작 버튼 클릭 여부를 관리
  const [question, setQuestion] = useState("");  // 입력된 질문 텍스트

  const handleStartClick = () => {
    setStarted(true);  // 버튼 클릭 시 상태를 true로 설정
  };

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  return (
    <div className="main-page">
      {!started ? (
        <div className="question">
          <h1>진로에 대해 궁금한 것을<br /> 불어보세요</h1>
          <button className="start-btn" onClick={handleStartClick}>Start</button>
        </div>
      ) : (
        <div className="input-section">
          <textarea
            value={question}
            onChange={handleInputChange}
            placeholder="질문을 입력하세요"
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
