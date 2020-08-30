import React from "react";

export const StyledThumbComponent = (props) => {
    return (
        <span {...props}>
          <span className="bar" />
          <span className="bar" />
        </span>
    );
}