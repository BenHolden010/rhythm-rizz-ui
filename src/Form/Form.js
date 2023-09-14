import { useState } from "react";
import "./Form.css";
import { postPoem } from "../ApiCalls";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Form({ handleFormClick }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [poem, setPoem] = useState("");

  function submitPoem(event) {
    const newPoem = {
      title,
      author,
      poem,
    };
    postPoem(newPoem).then((data) => {
      handleFormClick(data)
    })
    .catch(error => {
      throw error
    })
   
    clearInput();
  }

  function clearInput() {
    setTitle("");
    setAuthor("");
    setPoem("");
  }

  return (
    <form className="form-container">
      <input
        className="form-input"
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Author"
        name="author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <textarea
        rows="8"
        cols="50"
        className="form-input"
        type="text"
        placeholder="Poem"
        name="poem"
        value={poem}
        onChange={(event) => setPoem(event.target.value)}
      />
      <Link
        to={"/"}
        className="form-button"
        onClick={(event) => submitPoem(event)}
      >
        Submit
      </Link>
    </form>
  );
}

export default Form;

Form.propTypes = {
  poems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string,
      author: PropTypes.string,
      poem: PropTypes.string,
    })
  )
};
