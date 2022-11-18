import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [inputR, setInputR] = useState('');
  const [inputT, setInputT] = useState('');
  const [regExp, setRegExp] = useState(/^$/g);
  const [isMatching, setIsMatching] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [isInvalidRegex, setIsInvalidRegex] = useState(false);

  const timeout = useRef();

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      if (isInvalidRegex || inputR === '' || inputT === '') {
        setIsShowing(false);
      } else {
        if (regExp.test(inputT)) {
          setIsMatching(true);
        } else {
          setIsMatching(false);
        }
        setIsShowing(true);
      }
    }, 500);
  }, [isInvalidRegex, inputR, inputT, regExp]);

  const handleRegExpChange = (e) => {
    let rex = /^$/g;
    try {
      rex = new RegExp(e.target.value, 'g');
      setIsInvalidRegex(false);
    } catch (err) {
      setIsInvalidRegex(true);
    }
    setInputR(e.target.value);
    setRegExp(rex);
  };

  const handleTestChange = (e) => {
    setInputT(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="title">JavaScript RegExp Tester</h1>

      <form>
        <div>
          <label htmlFor="regexp">RegExp</label>
          <input
            className={isInvalidRegex ? 'error-text' : ''}
            onChange={handleRegExpChange}
            id="regexp"
            type="text"
          />

          <label htmlFor="test-text">Match text</label>
          <textarea onChange={handleTestChange} id="test-text" rows="5" />
        </div>
      </form>

      {isShowing && (
        <div className="result-container">
          {isMatching ? (
            <h1 className="result-true">Matched</h1>
          ) : (
            <h1 className="result-false">Did not match</h1>
          )}
          <p className="regexp-view">{`${regExp}`}</p>
          <p className="test-text-view">{inputT}</p>
        </div>
      )}
    </div>
  );
}

export default App;
