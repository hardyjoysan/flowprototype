import React, {Component} from 'react';

import * as d3 from 'd3';

class ModalOne extends Component {

    constructor(props){
        super(props);
        this.zoomSwitchHandle = this.zoomSwitchHandle.bind(this);
    }

    zoomSwitchHandle = () => {
            this.props.zoomHandle(this.props.viewChild);
    }

    componentDidMount(){
        const comProps = this.props;

        var zoom = d3.zoom()
                    .scaleExtent([0.5, 10])
                    .on("zoom", zoomed);
        
        var svg = d3.select("g").call(zoom);

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');

            if(d3.event.transform.k >= 10){
                comProps.zoomHandle(comProps.viewChild);
            }
        }
    }

    render(){
        return(
            <div className="modelone">
                <svg width="100%" height="800">
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