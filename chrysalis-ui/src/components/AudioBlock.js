import React from "react";
import {useDrag} from "muuri-react";

export const AudioBlock = ({ color, width, height, title }) => {

    const isDragging = useDrag();
    const shadow = isDragging ? "shadow" : "";
    const cardTitle = isDragging ? "hi" : title;

    return (
        <div className={`item h${height} w${width} ${color} ${shadow}`}>
            <div className="item-content">
                {cardTitle}
            </div>
        </div>
    );
};