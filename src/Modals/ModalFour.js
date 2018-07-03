import React from 'react';

const ModalFour = (props) => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
            <g>
                <ellipse stroke="#fff" ry="45" rx="45" cy="100" cx="100" strokeWidth="3" fill="none"/>
                <ellipse stroke="#fff" ry="45" rx="45" cy="100" cx="500" strokeWidth="5" fill="#555" onClick={() => props.click(props.viewChild)}/>
                <ellipse stroke="#fff" ry="45" rx="45" cy="500" cx="500" strokeWidth="3" fill="none"/>
                <ellipse stroke="#fff" ry="45" rx="45" cy="500" cx="100" strokeWidth="3" fill="none"/>
                <line stroke="#fff" y2="501" x2="455.5149" y1="501" x1="145.5" strokeWidth="3" fill="none"/>
                <line y2="454.16125" x2="498.5" y1="144" x1="498.5" strokeWidth="3" stroke="#fff" fill="none"/>
                <line y2="101" x2="455.66022" y1="101" x1="143.5" strokeWidth="3" stroke="#fff" fill="none"/>
                <line y2="453.31597" x2="99.5" y1="143" x1="99.5" strokeWidth="3" stroke="#fff" fill="none"/>
            </g>
        </svg>
    );
}

export default ModalFour;