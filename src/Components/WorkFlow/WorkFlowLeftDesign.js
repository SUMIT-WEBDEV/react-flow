import React, { useEffect, useState } from "react";
import ModuleList from "./ModuleList";

function WorkFlowLeftDesign() {
  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${currentPage}&limit=5`
    )
      .then((response) => response.json())
      .then((data) => setModules(data));
    console.log(modules);
  }, [currentPage]);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <ModuleList
        modules={modules}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default WorkFlowLeftDesign;
