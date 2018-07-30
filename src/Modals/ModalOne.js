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

        data.forEach(function(node){
            node.cx = width/2;
            node.cy = height/2;
            node.r = Math.min(width, height)/2.5;

            if (node.children && node.children.length !== 0) {
                
                if (node.children.length > 1) {

                    node.links = [];

                    for (var i = 0; i < node.children.length; i++) {
                        
                        var angle = (i / (node.children.length/2)) * Math.PI;
    
                        var child_r = node.r / (node.children.length * 2);
                        if (node.children[i].children && node.children[i].children.length > 1) {
                            child_r = child_r + 50;
                        }
    
                        var orbit_r = node.r - child_r - 30;
                        node.children[i].id = "div_"+i;
                        node.children[i].cx = node.cx + orbit_r * Math.cos(angle);
                        node.children[i].cy = node.cy + orbit_r * Math.sin(angle);
                        node.children[i].r = child_r;

                        if (i === node.children.length - 1) {
                            node.links[i] = { source : node.children[i], target : node.children[0]};
                        }else{
                            node.links[i] = { source : node.children[i], target : node.children[i+1] };
                        }
                    }
                }
            }
        });
        
        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
        
        data.forEach(function(comp){

            const g_c = svg.selectAll('company')
            .data(data).enter().append('g').attr("class", "company");

            g_c.append('circle')
            .attr('r', function(d) {return d.r})
            .attr('cx', function(d) {return d.cx})
            .attr('cy', function(d) {return d.cy});

            if (comp.children) {

                const g_d = svg.append('g').attr("class", "division");

                g_d.selectAll("line")
                .data(comp.links)
                .enter()
                .append("line")
                .attr("x1", function(d) { return d.source.cx; })
                .attr("y1", function(d) { return d.source.cy; })
                .attr("x2", function(d) { return d.target.cx; })
                .attr("y2", function(d) { return d.target.cy; });

                g_d.selectAll('circle')
                .data(comp.children).enter()
                .append('circle')
                .attr('r', function(d) {return d.r})
                .attr('cx', function(d) {return d.cx})
                .attr('cy', function(d) {return d.cy});

                comp.children.forEach(function(team) {
                    //console.log(team.children);
                });
            }
        });
    }

    render(){
        return(
            <div className="modalOne"></div>
        );
    }
}

export default ModalOne;