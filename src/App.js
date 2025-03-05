import './App.css';
import CustomButton from './components/CustomButton'; // 컴포넌트 불러오기

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomButton type="primary">클릭</CustomButton> {/* 버튼 추가 */}
      </header>
    </div>
  );
}

export default App;
