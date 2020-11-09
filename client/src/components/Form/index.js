import React from "react";
import "./style.css";

function Form({ query, handleInputChange, handleFormSubmit }) {
  return (
    <form>
      <div className="form-group">
        <input
          className="form-control"
          id="Title"
          type="text"
          value={query}
          placeholder="Book Title, Keywords, Author"
          name="query"
          onChange={handleInputChange}
          required
        />
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-lg"
          id="search-btn"
        >
          Search
        </button>
      </div>
      <div>
        
      </div>
    </form>
  );
}

export default Form;
