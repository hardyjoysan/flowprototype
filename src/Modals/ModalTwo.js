import React, {Component} from 'react';
import DragAndZoom from 'react-drag-and-zoom';

class ModalTwo extends Component {

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
                <DragAndZoom zoomStep={10} minZoom={10} onZoom={(value) => this.zoomSwitchHandle(value)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
                    <g>
                        <ellipse ry="100" rx="100" cy="400" cx="125" strokeWidth="5" stroke="#fff" fill="#555"></ellipse>
                        <ellipse ry="200" rx="200" cy="400" cx="575" strokeWidth="5" stroke="#fff" fill="#555"></ellipse>
                        <line id="svg_5" y2="400" x2="225" y1="400" x1="375" strokeWidth="5" stroke="#fff"></line>
                    </g>
                </svg>
                </DragAndZoom>
    
            </div>
        );
    }
}

export default ModalTwo;