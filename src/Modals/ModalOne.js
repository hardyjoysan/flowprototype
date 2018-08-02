import React, {Component} from 'react';

import * as d3 from 'd3';

class ModalOne extends Component {

    componentDidMount(){

        const comProps = this.props;

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

        const zoom = d3.zoom()
                    .extent([[0, 0], [width, height]])
                    .scaleExtent([0.5, 10])
                    .translateExtent([[0, 0], [width, height]])
                    .on("zoom", zoomed);
        
        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .call(zoom);
        
        data.forEach(function(comp){

            const g_c = svg.selectAll('.company')
            .data(data).enter().append('g').attr("class", "company");

            g_c.append('circle')
            .attr('r', function(d) {return d.r})
            .attr('cx', function(d) {return d.cx})
            .attr('cy', function(d) {return d.cy});

            g_c.append('foreignObject')
                .attr('x', function(d) { return d.cx - 50; })
                .attr('y', function(d) { return d.cy - d.r - 70; })
                .attr('width', 100)
                .append('xhtml:h3')
                .attr('class', 'header')
                .html(function(d) { return d.company; });

            if (comp.children) {

                svg.selectAll("line")
                .data(comp.links)
                .enter()
                .append("line")
                .attr("x1", function(d) { return d.source.cx; })
                .attr("y1", function(d) { return d.source.cy; })
                .attr("x2", function(d) { return d.target.cx; })
                .attr("y2", function(d) { return d.target.cy; });

                const g_d = svg.selectAll('.division')
                .data(comp.children).enter().append('g').attr("class", "division");
                g_d.append('circle')
                .attr('r', function(d) {return d.r})
                .attr('cx', function(d) {return d.cx})
                .attr('cy', function(d) {return d.cy});

                g_d.append('foreignObject')
                .attr('x', function(d) { return d.cx - 50; })
                .attr('y', function(d) { return d.cy - d.r - 70; })
                .attr('width', 100)
                .append('xhtml:h3')
                .attr('class', 'header')
                .style("font-size", "10px")
                .text(function(d) { return d.division; });

                comp.children.forEach(function(team) {
                    //console.log(team.children);
                });
            }
        });

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');

            if (d3.event.transform.k >= 10) {
                comProps.zoomHandle(comProps.viewChild)
            }
            if (d3.event.transform.k <= 0.5) {
                comProps.zoomHandle(comProps.viewParent)
            }
        }
    }

    render(){
        return(
            <div className="modalOne"></div>
        );
    }
}

export default ModalOne;