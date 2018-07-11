import React, {Component} from 'react';
import '../css/ModalOne.css';

class ModalOne extends Component {

    constructor(props){
        super(props);
        this.zoomSwitchHandle = this.zoomSwitchHandle.bind(this);
    }

    zoomSwitchHandle = (value, event) => {
        //console.log('zoom', event);
        if(value >= 200){
            this.props.click(this.props.viewChild);
        }
    }

    render(){
        return(
            <div className="modelone">
                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                    <g>
                        <ellipse ry="300" rx="300" cy="400" cx="400" strokeWidth="5" stroke="#fff" fill="#555"></ellipse>
                        <ellipse ry="80" rx="80" cy="400" cx="200" strokeWidth="3" stroke="#fff" fill="#555"></ellipse>
                        <ellipse ry="150" rx="150" cy="400" cx="500" strokeWidth="3" stroke="#fff" fill="#555"></ellipse>
                        <line id="svg_5" y2="400" x2="280" y1="400" x1="350" strokeWidth="3" stroke="#fff"></line>
                    </g>
                </svg>    
            </div>
        );
    }
}

export default ModalOne;