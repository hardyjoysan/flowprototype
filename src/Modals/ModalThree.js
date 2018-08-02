import React, {Component} from 'react';
import * as d3 from 'd3';

class ModalThree extends Component {

    componentDidMount(){
        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        var data =
            [
                { "team": "Optimus Prime", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "team": "Bumblebee", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "team": "Starscream", "children": [{"api":"API1"}, {"api":"API2"}] },
            ];

            d3.forceSimulation().on('tick', tick);

            var i = 0;
            data.links = [];
            data.forEach(function(node) {
                var angle = (i / (data.length / 2)) * Math.PI;
                node.x = (width / 2) + 200 * Math.cos(angle);
                node.y = (height / 2) + 200 * Math.sin(angle);
                if (i === data.length - 1) {
                    data.links[i] = { source: data[i], target: data[0] };
                } else {
                    data.links[i] = { source: data[i], target: data[i + 1] };
                }
                
                if (node.children) {
                    var nodechild = node.children;
                    node.links = [];
                    var j = 0;
                    nodechild.forEach(function(child){
                        var angle = (j / (nodechild.length / 2)) * Math.PI;
                        child.x = node.x + 160 * Math.cos(angle);
                        child.y = node.y + 160 * Math.sin(angle);
                        child.r = 10;
                        node.links[j] = { source: node, target: child };
                        j++;
                    });
                }
                i++;
            });

            var svg = d3.select(".modalThree").append("svg")
                .attr("width", width)
                .attr("height", height);

            var teams = data;

            teams.forEach(function (apis) {
                if (apis.children) {
                    var x = 0;
                    svg.selectAll(".apiline"+x)
                    .data(apis.links)
                    .enter()
                    .append("line")
                    .attr("class", ".apiline"+x)
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                    apis.children.forEach(function(api) {
                        const g_t = svg.append('g').attr("class", "api");
                        g_t.append('circle')
                        .attr('r', api.r)
                        .attr('cx', api.x)
                        .attr('cy', api.y);
                    })
                    x++;
                }
                
            });

            var links = svg.selectAll(".link")
                    .data(data.links)
                    .enter().append("line")
                    .attr("class", "link");

            var nodes = svg.selectAll(".node")
                    .data(data)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 40);

            var text = svg.selectAll(".text")
                            .data(data)
                            .enter()
                            .append('foreignObject')
                            .attr("class", "text")
                            .attr('width', 150);

            text.append('xhtml:h3').attr('class', 'header')
                .style("font-size", "14px")
                .text(function (d) { return d.team; });

            function tick() {
                links.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                nodes.attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; });

                text.attr("x", function (d) { return d.x - 75; })
                    .attr("y", function (d) { return d.y - 115; });
            }
    }

    render(){
        return(
            <div className="modalThree"></div>
        );
    }
}

export default ModalThree;