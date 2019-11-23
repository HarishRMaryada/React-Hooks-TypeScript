import React from 'react';
import logo from './logo.svg';
import './App.css';
import APPService from './API';

const App: React.FC = () => {
  React.useEffect(()=>{
    APPService.todos.get(1)
    // setData()
    // if(!!data){
    //   console.log(data)
    // }
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
