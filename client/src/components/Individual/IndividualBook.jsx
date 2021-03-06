import React, { useState } from "react";

export default function IndividualBook(props) {
  // console.log(uid);
  const [inputs, setinputs] = useState({
    publication_year: props.publication_year,
    author: props.author,
    name: props.name,
  });
  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const updateBook = async (e) => {
    e.preventDefault();
    // console.log(inputs, "here");
    const { name, author, publication_year } = inputs;
    const body = { name, author, publication_year };
    const response = await fetch(
      `http://localhost:5000/updatebook/${props.uid}`,
      {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const parseRes = await response.json();
    console.log(parseRes);

    props.fetchBooks();
    setedit(!edit);
    // console.log(Books);
  };
  const deleteBook = async (e) => {
    console.log("here");
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/bookdelete/${props.uid}`,
      {
        method: "DELETE",
        headers: { token: localStorage.token },
      }
    );
    const parseRes = await response.json();
    console.log(parseRes);
    props.fetchBooks();
  };
  const [edit, setedit] = useState(false);
  const handleEdit = (e) => {
    e.preventDefault();
    setedit(!edit);

    console.log(edit);
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          {!edit ? (
            <li>
              <div className="container">
                <div
                  className="card"
                  style={{ width: "58rem", marginTop: "25px" }}
                >
                  <div className="card-body row">
                    <h5 className="card-title col-8">
                      Name: {props.name} Author: {props.author} Publication
                      Year: {props.publication_year}
                    </h5>
                    <button
                      className="float-right col-2 btn btn-danger "
                      onClick={(e) => handleEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="float-right col-2 btn btn-primary"
                      onClick={(e) => deleteBook(e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <form
                className="container-fluid d-flex flex-column my-5 mx-5 shadow"
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  height: "50%",
                  borderRadius: "0.5%",
                }}
              >
                <h1 className="text-center">Update Book</h1>
                <div className="form-group row ">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
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
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
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
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
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
                    <button
                      type="submit"
                      className="btn btn-primary mx-1"
                      onClick={(e) => updateBook(e)}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </li>
          )}
        </div>
      </div>
    </div>
  );
}
