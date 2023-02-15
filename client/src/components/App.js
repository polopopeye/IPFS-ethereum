import './App.css';
import { useState } from 'react';
import { create } from 'ipfs-http-client';
import { ipfsApiUrl } from '../app/constants';

// const client = create(ipfsApiUrl);

// const auth = '';

const client = create({
  url: 'http://localhost:5001',
  // headers: {
  //   authorization: auth,
  // },
});

// const client = create('/ip4/127.0.0.1/tcp/5001');

// console.log(`fastlog => client`, client);

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

    await client
      .add(file)
      .then((res) => {
        console.log(`fastlog => res`, res);
        // return res;

        // console.log(`fastlog => created`, created);
        const url = `http://localhost:8080/ipfs/${res.path}`;
        setUrlArr((prev) => [...prev, url]);
        console.log(`fastlog => url`, url);
      })
      .catch((err) => {
        console.log(`fastlog => err`, err);
      });
  };

  const fetchFiles = async (e) => {
    e.preventDefault();

    console.log(`fastlog => client`, client);

    await client
      .get('bafybeigfvl6q4ytibn7p2325ycxdxx22amhtysknhaojsuus6g7vdaz2di')
      .then((res) => {
        console.log(`fastlog => res`, res);
      })
      .catch((err) => {
        console.log(`fastlog => err`, err);
      });

    await client
      .cat('bafybeigfvl6q4ytibn7p2325ycxdxx22amhtysknhaojsuus6g7vdaz2di')
      .then((res) => {
        console.log(`fastlog => res`, res);
      })
      .catch((err) => {
        console.log(`fastlog => err`, err);
      });

    await client
      .ls('bafybeigfvl6q4ytibn7p2325ycxdxx22amhtysknhaojsuus6g7vdaz2di')
      .then((res) => {
        console.log(`fastlog => res`, res);
      })
      .catch((err) => {
        console.log(`fastlog => err`, err);
      });

    // const files = client.cat('QmcbUY83DUF18cnzwhg5JkuaD7LG4fJqtzscvh3Me9g1Dr');
    // const path = client.ls();
    // console.log(`fastlog => path`, path);
    // console.log(`fastlog => files`, files);
  };

  return (
    <div className="App">
      <header className="App-header">IPFS Project</header>

      <div className="main">
        <form onSubmit={handleSubmit}>
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

      <button onClick={fetchFiles}>Fetch Files</button>
    </div>
  );
};

export default App;
