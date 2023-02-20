import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { ipfsServer } from '../app/constants';

const App = () => {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);

  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);

    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(ipfsServer + '/upload', file, {
        headers: {
          'Content-Type': 'application/octet',
        },
      })
      .then((res) => {
        console.log(`fastlog => res`, res);
      })
      .catch((err) => {
        console.log(`fastlog => err`, err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">IPFS Project</header>

      <div className="main">
        <form onSubmit={handleSubmit} method="post" encType="application/octet">
          <input type="file" onChange={retrieveFile} />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>

      <div className="display">
        {urlArr.length !== 0 ? (
          urlArr.map((el) => <img src={el} alt="nfts" />)
        ) : (
          <h3>Upload data</h3>
        )}
      </div>
    </div>
  );
};

export default App;
