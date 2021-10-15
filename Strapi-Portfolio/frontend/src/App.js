import "./App.css";
import PortfolioItem from "./component/PortfolioItem";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  // posts is set as a dependency of useEffect and whenever posts changes its gonna trigger a re-render as the data object from axios changes
  useEffect(() => {
    getData();
  }, [posts]);
  const getData = async () => {
    const { data } = await axios.get("http://localhost:1337/portfolios");
    setPosts(data);
  };
  return (
    <>
      {posts.map((post) => (
        <div className="PortFolioItem">
          <PortfolioItem post={post} key={post.id} />
        </div>
      ))}
    </>
  );
}

export default App;
