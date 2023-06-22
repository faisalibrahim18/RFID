import React, { useState } from "react";

import axios from "axios";

const Accordion = () => {
  // const [expanded, setExpanded] = useState(false);
  const [distribusi, setDistribusi] = React.useState([]);
  const [collapsedIds, setCollapsedIds] = useState([]);

  React.useEffect(() => {
    getDistribusi();
  }, []);
  const getDistribusi = async () => {
    // setLoading(true);
    const response = await axios.get("http://localhost:9000/api/v1/rfid/distribusi");
    // console.log(response.data.data);
    setDistribusi(response.data.data);
    // setSearchResults(response.data.data);
    // setLoading(false);
  };

  const toggleCollapse = (id) => {
    if (collapsedIds.includes(id)) {
      setCollapsedIds(collapsedIds.filter((collapsedId) => collapsedId !== id));
    } else {
      setCollapsedIds([...collapsedIds, id]);
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {distribusi.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.customer.name}</td>
              <td>
                <button className="text-blue-500" onClick={() => toggleCollapse(item._id)}>
                  {collapsedIds.includes(item._id) ? "Expand" : "Collapse"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {distribusi.map((item) => (
        <div key={item._id} className={`mt-4 ${collapsedIds.includes(item._id) ? "hidden" : "block"}`}>
          {/* Render additional details for the expanded row */}
          <p>{item.customer.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
