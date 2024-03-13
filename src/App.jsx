import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://northwind.vercel.app/api/categories")
      .then((data) => setData(data.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentData.id) {
      //put
    } else {
      addCategory({
        name: currentData.name,
        description: currentData.description,
      });
    }
  };

  const addCategory=(newCategory)=>{
axios.post('https://northwind.vercel.app/api/categories',newCategory).then(()=>{
  fetchData()
  setCurrentData({id:"",name:"",description:""})
})
  }


  const handleInputNameChange = (e) => {
    setCurrentData({ ...currentData, name: e.target.value });
  };

  const handleInputDescriptionChange = (e) => {
    setCurrentData({ ...currentData, description: e.target.value });
  };

  const handleEdit = (category) => {
    setCurrentData(category)
  };

  const handleDelete = (id) => {
    
axios.delete(`https://northwind.vercel.app/api/categories/${id}`).then(()=>{
  fetchData()
})

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentData.name}
          onChange={handleInputNameChange}
        />
        <input
          type="text"
          value={currentData.description}
          onChange={handleInputDescriptionChange}
        />
        <button type="Submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Setting</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleEdit({id:item.id,name:item.name,description:item.description})}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
