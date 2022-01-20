import React, { useState, useEffect } from "react";
import IndividualBook from "./Individual/IndividualBook";

function Books() {
  const [Books, setBooks] = useState([]);
  const [inputs, setinputs] = useState({
    publication_year: "",
    author: "",
    name: "",
  });
  const addBook = async (e) => {
    e.preventDefault();
    console.log(inputs, "here");
    const { name, author, publication_year } = inputs;
    const body = { name, author, publication_year };
    const response = await fetch("http://localhost:5000/addbook", {
      method: "POST",
      headers: {
        token: localStorage.token,
        "Content-type": "application/json"
       
      },
      body: JSON.stringify(body),
    });
    const parseRes = await response.json();
    console.log(parseRes);
    
    fetchBooks();
    console.log(Books);
  };
  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5000/books", {
      method: "GET",
      headers: { token: localStorage.token },
    });
    const parseRes = await response.json();
    setBooks(parseRes);
  };
  
  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearInputs = (e) => {
    e.preventDefault();
    setinputs({
      publication_year: "",
      author: "",
      name: "",
    });
  };
  useEffect(() => {
    fetchBooks();
  
   
  }, []);
  return (
    <div className="container">
      <form
        className="container-fluid d-flex flex-column my-5 mx-5 shadow"
        style={{
          backgroundColor: "white",
          width: "80%",
          height: "50%",
          borderRadius: "0.5%",
        }}
      >
        <h1 className="text-center">Add Books</h1>
        <div className="form-group row ">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control"
              id="inputEmail3"
              placeholder="Enter Name"
              value={inputs.name}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Author
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="author"
              className="form-control"
              id="inputPassword3"
              placeholder="Enter Author Name"
              value={inputs.author}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Publication Year
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="publication_year"
              className="form-control"
              id="inputPassword3"
              placeholder="Enter Publication Year"
              value={inputs.publication_year}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary mx-1" onClick={(e) => addBook(e)}>
              Add
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={clearInputs}
            >
              Cancel/Clear
            </button>
          </div>
        </div>
      </form>
      <div className="container">
        {Books.map((Element, key) => {
         return <IndividualBook author={Element.author} publication_year={Element.publication_year} name={Element.name} uid={Element._id} fetchBooks={() => fetchBooks()} key={key}/>
        })}
      </div>
    </div>
  );
}

export default Books;
