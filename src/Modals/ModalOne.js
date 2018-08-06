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
                    "children":[{ "team": "Optimus Prime", "icon": "optimus.svg"}, { "team": "Avengers", "icon": "avenger.svg"}, { "team": "Starscream", "icon": "starscream.svg" }]
                },
                {
                    "division": "Gothenburg",
                    "children":[{ "team": "Flash", "icon": "flash.svg" }]
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
                    var node_child = node.children;
                    var i = 0;

                    node_child.forEach(function(divs) {

                        var angle = (i / (node_child.length/2)) * Math.PI;
                        var child_r = node.r / (node_child.length * 2);

                        if (node_child[i].children && node_child[i].children.length > 1) {
                            child_r = child_r + 50;
                        }
    
                        var orbit_r = node.r - child_r - 30;
                        divs.id = "div_"+i;
                        divs.cx = node.cx + orbit_r * Math.cos(angle);
                        divs.cy = node.cy + orbit_r * Math.sin(angle);
                        divs.r = child_r;

                        if (i === node_child.length - 1) {
                            node.links[i] = { source : divs, target : node_child[0]};
                        }else{
                            node.links[i] = { source : divs, target : node_child[i+1] };
                        }

                        var team_child = divs.children;
                        divs.links = [];
                        var j = 0;
                        
                        team_child.forEach(function(team) {
                            var child_len = (team_child.length > 2) ? 2 : team_child.length;
                            if (j >= 2) {
                                return false;
                            }else{
        
                                var angle = (j / (child_len / 2)) * Math.PI;
                                var team_r = divs.r / (child_len * 2);
        
                                if(child_len > 1){
                                    var teamorbit_r = divs.r - team_r - (child_len * 10);
                                    team.cx = divs.cx + teamorbit_r * Math.cos(angle);
                                    team.cy = divs.cy + teamorbit_r * Math.sin(angle);
                                    team.r = team_r;
                                }else{
                                    team.cx = divs.cx;
                                    team.cy = divs.cy;
                                    team.r = divs.r - 40;
                                }
        
                                if (j === child_len - 1) {
                                    divs.links[j] = { source: team, target: team_child[0] };
                                } else {
                                    divs.links[j] = { source: team, target: team_child[j + 1] };
                                }
                            }
                            j++;
                        });
                        i++;
                    });
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
                .attr('y', function(d) { return d.cy - d.r - 60; })
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
                .attr('y', function(d) { return d.cy - d.r - 45; })
                .attr('width', 100)
                .append('xhtml:h3')
                .attr('class', 'header')
                .style("font-size", "10px")
                .text(function(d) { return d.division; });

                comp.children.forEach(function(divs) {
                    svg.selectAll(".teamline")
                    .data(divs.links)
                    .enter()
                    .append("line")
                    .attr("class", "teamline")
                    .attr("x1", function(d) { return d.source.cx; })
                    .attr("y1", function(d) { return d.source.cy; })
                    .attr("x2", function(d) { return d.target.cx; })
                    .attr("y2", function(d) { return d.target.cy; });
                    var x = 0;
                    divs.children.forEach(function(team) {
                        if (x >= 2) { return false; }
                        const g_t = svg.append('g').attr("class", "team");
                        g_t.append('circle')
                        .attr('r', team.r)
                        .attr('cx', team.cx)
                        .attr('cy', team.cy);
                        g_t.append('foreignObject')
                        .attr('x', team.cx - 35)
                        .attr('y', team.cy - 65)
                        .attr('width', 70)
                        .append('xhtml:h3')
                        .attr('class', 'header')
                        .style("font-size", "8px")
                        .text(team.team);
                        g_t.append("image")
                        .attr("xlink:href", "/"+team.icon)
                        .attr("x", team.cx - 15)
                        .attr("y", team.cy - 15)
                        .attr("width", 30)
                        .attr("height", 30);
                        x++;
                    });
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