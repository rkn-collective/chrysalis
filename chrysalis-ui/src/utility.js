import React from "react";

export function generateItems() {

    const items = [];

    for (let index = 0; index < 6; index++) {

        const color = "blue";
        const width = 100;
        const height = 100;
        const title = "hey";

        items.push({ index, color, width, height, title });
    }

    return items;
}