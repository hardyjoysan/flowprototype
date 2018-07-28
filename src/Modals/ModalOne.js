import React, {Component} from 'react';

import * as d3 from 'd3';

class ModalOne extends Component {

    componentDidMount(){
        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        const data = [{
            "company":"Acme Inc",
            "children":[
                {
                    "division":"Stockholm",
                    "children":[{"team": "Optimus Prime"},{"team": "Bumblebee"},{"team": "Starscream"}]
                },
                {
                    "division": "Gothenburg",
                    "children":[{"team": "Megatron"}]
                }
            ]
        }];

        function nodeCalculation(width, height, data) {
            data.forEach(function(node){
                node.cx = width/2;
                node.cy = height/2;
                node.r = Math.min(width, height)/2.5;

                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        var angle = (i / (node.children.length/2)) * Math.PI;

                        var child_r = node.r / (node.children.length * 2);
                        if (node.children[i].children && node.children[i].children.length > 1) {
                            child_r = child_r + 50;
                        }

                        var orbit_r = node.r - child_r - 30;
                        node.children[i].cx = node.cx + orbit_r * Math.cos(angle);
                        node.children[i].cy = node.cy + orbit_r * Math.sin(angle);
                        node.children[i].r = child_r;
                    }
                }
            });
        }

        nodeCalculation(width, height, data);
        
        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        function nodeCreation(data) {
            data.forEach(function(node){
                svg.append("g")
                    .attr("class", "node")
                    .append("circle")
                    .attr('r', node.r)
                    .attr('cx', node.cx)
                    .attr('cy', node.cy);

                    if (node.children) {
                        nodeCreation(node.children);
                    }
            });
        }

        nodeCreation(data);
    }

    render(){
        return(
            <div className="modalOne"></div>
        );
    }
}

export default ModalOne;