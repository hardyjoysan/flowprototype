import React from 'react';

const ModalTwo = (props) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
            <g>
                <ellipse ry="100" rx="100" cy="400" cx="150" stroke-width="5" stroke="#fff" fill="#555"></ellipse>
                <ellipse ry="200" rx="200" cy="400" cx="600" stroke-width="5" stroke="#fff" fill="#555"></ellipse>
                <line id="svg_5" y2="400" x2="250" y1="400" x1="400" stroke-width="5" stroke="#fff"></line>
            </g>
        </svg>
    );
}

export default ModalTwo;