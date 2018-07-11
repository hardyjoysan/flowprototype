import React, {Component} from 'react';

class ModalThree extends Component {

    constructor(props){
        super(props);
        this.zoomSwitchHandle = this.zoomSwitchHandle.bind(this);
    }

    zoomSwitchHandle = (value) => {
        if(value >= 200){
            this.props.click(this.props.viewChild);
        }
        if(value <= 20){
            this.props.click(this.props.viewParent);
        }
    }

    render(){
        return(
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
                    <g>
                        <ellipse ry="50" rx="50" cy="92" cx="100" strokeWidth="3" stroke="#fff" fill="#555"></ellipse>
                        <ellipse ry="50" rx="50" cy="92" cx="500" strokeWidth="5" stroke="#fff" fill="#555"></ellipse>
                        <ellipse ry="50" rx="50" cy="450" cx="313" strokeWidth="3" stroke="#fff" fill="#555"></ellipse>
                        <line y2="92" x2="450" y1="92" x1="150" strokeWidth="1.5" stroke="#fff" fill="none"></line>
                        <line stroke="#fff" transform="rotate(-60 383,160) " y2="240" x2="450" y1="240" x1="145" strokeWidth="3" fill="none"></line>
                        <line transform="rotate(60 200,180) " y2="240" x2="120" y1="240" x1="445" strokeWidth="3" stroke="#fff" fill="none"></line>
                    </g>
                </svg>    
            </div>
        );
    }
}

export default ModalThree;