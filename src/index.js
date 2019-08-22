import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroller";

import "./styles.css";

function App() {
  const [items, setItems] = useState([]);
  const scrollerRef = useRef();
  const loadMore = page => {
    fetch(`https://swapi.co/api/people/${page}/?format=json`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        setItems(items => [...items, res]);
      });
  };

  return (
    <div className="App">
      <div style={{ height: "400px", overflow: "auto" }} ref={scrollerRef}>
        <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={items.length < 10}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
            getScrollParent={() => scrollerRef.current}
          >
            {items.map((item, index) => {
              return (
                <div>
                  <h2>Character {index + 1}</h2>
                  {Object.keys(item).map(val => {
                    return (
                      <p>
                        {val}: {item[val]}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
