import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Home.css';

function Home() {
  const [inputR, setInputR] = useState('');
  const [inputT, setInputT] = useState('');
  const [regExp, setRegExp] = useState(/^$/g);
  const [isMatching, setIsMatching] = useState(false);
  const [isInvalidRegex, setIsInvalidRegex] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const timeout = useRef();

  useEffect(() => {
    setInputR(searchParams.get('r'));
    setInputT(searchParams.get('t'));
  }, []);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      try {
        const rx = new RegExp(inputR, 'g');

        setRegExp(rx);
        setIsMatching(rx.test(inputT));
        setIsInvalidRegex(false);

        if (inputR === '' || inputT === '') {
          setIsShowing(false);
        } else {
          setIsShowing(true);
        }
      } catch (err) {
        setIsMatching(false);
        setIsInvalidRegex(true);
        setIsShowing(false);
      }

      setSearchParams({ r: inputR, t: inputT });
    }, 500);

    return () => clearTimeout(timeout.current);
  }, [inputR, inputT]);

  return (
    <div className="Home">
      <h1 className="title">JavaScript RegExp Tester</h1>

      <form>
        <label htmlFor="regexp-input">RegExp</label>
        <input
          defaultValue={inputR}
          onChange={(e) => setInputR(e.target.value)}
          id="regexp-input"
          type="text"
          className={isInvalidRegex ? 'error-text' : ''}
        />

        <label htmlFor="test-text-input">Match text</label>
        <textarea
          defaultValue={inputT}
          onChange={(e) => setInputT(e.target.value)}
          id="test-text-input"
          rows="5"
        />
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

export default Home;
