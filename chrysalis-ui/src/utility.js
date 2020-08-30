import React from "react";

export function generateBlocks() {
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

export function Duration ({ seconds }) {
    return (
        <time dateTime={`P${Math.round(seconds)}S`}>
            {format(seconds)}
        </time>
    )
}

function format (seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

function pad (string) {
    return ('0' + string).slice(-2)
}