import logo from './PMKS_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div className="Box">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Landing Page Coming Soon!
        </p>
        {/*A button with the link to app.pmksplus.com} */}
          <button className="App-Button" onClick={() => {
            window.location.href = 'https://app.pmksplus.com/';
          }}>
              Go to App
          </button>
          </div>

      </header>
    </div>
  );
}

export default App;
