import React, {Component} from 'react';

import * as d3 from 'd3';

class ModalOne extends Component {

    componentDidMount(){
        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        const data = [{
            "name":"Acme Inc"
        }];

        data.forEach(function(node){
            node.cx = width/2;
            node.cy = height/2;
            node.r = Math.min(width, height)/2.5;
        })
        
        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

        const node = svg.selectAll('.node')
                    .data(data)
                    .enter().append("g")
                    .attr("class", "node");

        node.append("circle")
            .attr('r', function(d) { return d.r; })
            .attr('cx', function(d) { return d.cx; })
            .attr('cy', function(d) { return d.cy; });


    }

    render(){
        return(
            <div className="modalOne"></div>
        );
    }
}

export default ModalOne;