import React from 'react';
import './App.css';  // 스타일시트 추가
import AppHeader from './components/AppHeader';  // MainPage 컴포넌트를 임포트

function App() {
  return (
    <div className="App">
      <AppHeader />  {/* MainPage 컴포넌트를 여기에 적용 */}
    </div>
  );
}

export default App;
