import React, {Component} from 'react';
import DragAndZoom from 'react-drag-and-zoom';

class ModalFive extends Component {

    constructor(props){
        super(props);
        this.zoomSwitchHandle = this.zoomSwitchHandle.bind(this);
    }

    zoomSwitchHandle = (event) => {
        console.log('zoom', event);
        if(event >= 200){
            this.props.click(this.props.viewChild);
        }
    }

    render(){
        return(
            <div>
                <DragAndZoom zoomStep={10} minZoom={10} onZoom={event => this.zoomSwitchHandle(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
                    <g>
                        <ellipse stroke="#fff" ry="25" rx="25" cy="152" cx="66.5" strokeWidth="3" fill="#555"/>
                        <ellipse stroke="#fff" ry="60" rx="60" cy="280" cx="300.5" strokeWidth="3" fill="#555"/>
                        <ellipse stroke="#fff" ry="25" rx="25" cy="503" cx="139.5" strokeWidth="3" fill="#555"/>
                        <ellipse stroke="#fff" ry="25" rx="25" cy="72" cx="412.5" strokeWidth="3" fill="#555"/>
                        <ellipse stroke="#fff" ry="25" rx="25" cy="150" cx="510.5" strokeWidth="3" fill="#555"/>
                        <ellipse stroke="#fff" ry="25" rx="25" cy="319" cx="515.5" strokeWidth="3" fill="#555"/>
                        <line y2="227" x2="329.5" y1="93" x1="401.5" strokeWidth="3" stroke="#fff" fill="none"/>
                        <line y2="247" x2="349.5" y1="166" x1="489.5" strokeWidth="3" stroke="#fff" fill="none"/>
                        <line y2="317" x2="491.5" y1="294" x1="360.5" strokeWidth="3" stroke="#fff" fill="none"/>
                        <line y2="256" x2="245.5" y1="167" x1="86.5" strokeWidth="3" stroke="#fff" fill="none"/>
                        <line y2="335" x2="277.5" y1="488" x1="158.5" strokeWidth="3" stroke="#fff" fill="none"/>
                    </g>
                </svg>
                </DragAndZoom>
    
            </div>
        );
    }
}

export default ModalFive;