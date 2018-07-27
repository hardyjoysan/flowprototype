import React, {Component} from 'react';

import * as d3 from 'd3';

class ModalOne extends Component {

    componentDidMount(){
        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        svg.append("g")
        .append("circle")
        .attr("r", Math.min(width, height)/2.5)
        .attr("cx", width/2)
        .attr("cy", height/2)


    }

    render(){
        return(
            <div className="modalOne"></div>
        );
    }
}

export default ModalOne;