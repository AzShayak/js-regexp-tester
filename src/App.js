import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [inputR, setInputR] = useState('');
  const [inputT, setInputT] = useState('');
  const [regExp, setRegExp] = useState(/^$/g);
  const [isInvalidRegex, setIsInvalidRegex] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const timeout = useRef();

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      try {
        const rx = new RegExp(inputR, 'g');

        setIsInvalidRegex(false);
        setRegExp(rx);
        setIsMatching(rx.test(inputT));

        if (inputR === '' || inputT === '') {
          setIsShowing(false);
        } else {
          setIsShowing(true);
        }
      } catch (err) {
        setIsInvalidRegex(true);
        setIsMatching(false);
        setIsShowing(false);
      }
    }, 500);
  }, [inputR, inputT]);

  return (
    <div className="App">
      <h1 className="title">JavaScript RegExp Tester</h1>

      <form>
        <div>
          <label htmlFor="regexp">RegExp</label>
          <input
            className={isInvalidRegex ? 'error-text' : ''}
            onChange={(e) => setInputR(e.target.value)}
            id="regexp"
            type="text"
          />

          <label htmlFor="test-text">Match text</label>
          <textarea
            onChange={(e) => setInputT(e.target.value)}
            id="test-text"
            rows="5"
          />
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
