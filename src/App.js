import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import DnDFlow from "./Components/WorkFlow/DnDFlow";
import List from "./Components/List";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/workflow/:id" element={<DnDFlow list={list} />} />
          <Route path="/" element={<List list={list} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
