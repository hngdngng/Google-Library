import React from "react";
import "./style.css";

function Card({ icon, title, children, disp }) {
  return (
    <div className={`card mt-4 ${disp}`}>
      <div className="card-header" id="card-header">
        <h3>
          <strong>
            <i className={`fa fa-${icon}`} aria-hidden="true" /> {title}
          </strong>
        </h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
