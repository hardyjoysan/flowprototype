import React, { Component } from 'react';
import * as d3 from 'd3';

class ModalTwo extends Component {

    componentDidMount() {

        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        const data = [
            {
                "division": "Stockholm",
                "children": [{ "team": "Optimus Prime" }, { "team": "Bumblebee" }, { "team": "Starscream" }]
            },
            {
                "division": "Gothenburg",
                "children": [{ "team": "Megatron" }]
            }
        ];



        function calculateNodes(data, width, height, cx = null, cy = null) {
            

                data.links = [];
                var i = 0;

                data.forEach(function (node) {

                    var angle = (i / (data.length / 2)) * Math.PI;
                    var node_r = Math.min(width, height) / (data.length * 2.5);
                    if (node.children && node.children.length > 1) {
                        node_r = node_r + 50;
                    }
                    var orbit_r = Math.min(width, height) - node_r - 200;
                    node.cx = (width / 2) + orbit_r * Math.cos(angle);
                    node.cy = (height / 2) + orbit_r * Math.sin(angle);
                    node.r = node_r;

                    if (i === data.length - 1) {
                        data.links[i] = { source: data[i], target: data[0] };
                    } else {
                        data.links[i] = { source: data[i], target: data[i + 1] };
                    }

                    if (node.children) {
                        var node_child = node.children;
                        var j = 0;
                        node.links = [];
                        node_child.forEach(function(child) {
                            var angle = (j / (node_child.length / 2)) * Math.PI;
                            var child_r = Math.min(node_r*2, node_r*2) / (node_child.length * 2.5);
                            var childorbit_r = Math.min(node_r, node_r) - child_r - 200;
                            child.cx = node.cx + childorbit_r * Math.cos(angle);
                            child.cy = node.cy + childorbit_r * Math.sin(angle);
                            child.r = child_r;

                            if (j === node_child.length - 1) {
                                node.links[j] = { source: node_child[j], target: node_child[0] };
                            } else {
                                node.links[j] = { source: node_child[j], target: node_child[j + 1] };
                            }

                            j++;
                        })
                    }

                    i++;
                });
            
        }

        calculateNodes(data, width, height);

        var zoom = d3.zoom()
            .scaleExtent([0.5, 10])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);

        const svg = d3.select(".modalTwo")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .call(zoom);

        svg.selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .attr("x1", function (d) { return d.source.cx; })
            .attr("y1", function (d) { return d.source.cy; })
            .attr("x2", function (d) { return d.target.cx; })
            .attr("y2", function (d) { return d.target.cy; });

        const g_d = svg.selectAll('.division')
            .data(data).enter().append('g').attr("class", "division");
        g_d.append('circle')
            .attr('r', function (d) { return d.r })
            .attr('cx', function (d) { return d.cx })
            .attr('cy', function (d) { return d.cy });

        g_d.append('foreignObject')
            .attr('x', function (d) { return d.cx - 50; })
            .attr('y', function (d) { return d.cy - d.r - 70; })
            .attr('width', 100)
            .append('xhtml:h3')
            .attr('class', 'header')
            .text(function (d) { return d.division; });

        var division = data;

        division.forEach(function (teams) {
            svg.selectAll(".teamline")
            .data(teams.links)
            .enter()
            .append("line")
            .attr("class", "teamline")
            .attr("x1", function(d) { return d.source.cx; })
            .attr("y1", function(d) { return d.source.cy; })
            .attr("x2", function(d) { return d.target.cx; })
            .attr("y2", function(d) { return d.target.cy; });

            teams.children.forEach(function(team) {
                const g_t = svg.append('g').attr("class", "team");
                g_t.append('circle')
                .attr('r', team.r)
                .attr('cx', team.cx)
                .attr('cy', team.cy);
            })
        });

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
        }
    }

    render() {
        return (
            <div className="modalTwo"></div>
        );
    }
}

export default ModalTwo;