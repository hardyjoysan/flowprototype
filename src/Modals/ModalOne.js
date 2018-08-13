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

            if (Math.min(width, height) > 1080) {
                node.cx = width/2;
                node.cy = height/2;
                node.r = 800/2.5;
            }else{
                node.cx = width/2;
                node.cy = height/2;
                node.r = Math.min(width, height)/2.5;
            }
            

            if (node.children && node.children.length !== 0) {
                
                if (node.children.length > 1) {

                    node.links = [];
                    var node_child = node.children;
                    var i = 0;

                    node_child.forEach(function(divs) {

                        var angle = (i / (node_child.length/2)) * Math.PI;
                        var child_r = node.r / (node_child.length * 2);

                        if (node_child[i].children && node_child[i].children.length > 1) {
                            child_r = node.r / node_child.length;
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
                                var team_r = divs.r / (child_len *  3);
        
                                if(child_len > 1){
                                    var teamorbit_r = divs.r - (team_r*3) - child_len;
                                    team.cx = divs.cx + teamorbit_r * Math.cos(angle);
                                    team.cy = divs.cy + teamorbit_r * Math.sin(angle);
                                    team.r = team_r;
                                }else{
                                    team.cx = divs.cx;
                                    team.cy = divs.cy;
                                    team.r = team_r;
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
                    .scaleExtent([1, 2.5])
                    .translateExtent([[0, 0], [width, height]])
                    .on("zoom", zoomed);
        
        const svg = d3.select(".modalOne")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .call(zoom);
        
        data.forEach(function(comp){

            const company = svg.selectAll('.company')
                                .data(data).enter().append('g').attr("class", "company");

            company.append('circle')
                    .attr('r', function(d) {return d.r})
                    .attr('cx', function(d) {return d.cx})
                    .attr('cy', function(d) {return d.cy});

            if (comp.children) {

                company.selectAll("line")
                    .data(comp.links)
                    .enter()
                    .append("line")
                    .attr("x1", function(d) { return d.source.cx; })
                    .attr("y1", function(d) { return d.source.cy; })
                    .attr("x2", function(d) { return d.target.cx; })
                    .attr("y2", function(d) { return d.target.cy; });

                const division = company.selectAll('.division')
                                        .data(comp.children).enter().append('g').attr("class", "division");
                division.append('circle')
                    .attr('r', function(d) {return d.r})
                    .attr('cx', function(d) {return d.cx})
                    .attr('cy', function(d) {return d.cy});

                division.append('foreignObject')
                    .attr('x', function(d) { return d.cx - 50; })
                    .attr('y', function(d) { return d.cy - d.r - 45; })
                    .attr('width', 100)
                    .append('xhtml:h3')
                    .attr('class', 'header')
                    .style("font-size", "10px")
                    .text(function(d) { return d.division; });

                comp.children.forEach(function(divs) {
                    division.selectAll(".teamline")
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
                        const gteam = division.append('g').attr("class", "team");
                        gteam.append('circle')
                            .attr('r', team.r)
                            .attr('cx', team.cx)
                            .attr('cy', team.cy);
                        gteam.append('foreignObject')
                            .attr('x', team.cx - 35)
                            .attr('y', team.cy - 65)
                            .attr('width', 70)
                            .append('xhtml:h3')
                            .attr('class', 'header')
                            .style("font-size", "8px")
                            .text(team.team);
                        gteam.append("image")
                            .attr("xlink:href", "/"+team.icon)
                            .attr("x", team.cx - (team.r*1.2/2))
                            .attr("y", team.cy - (team.r*1.2/2))
                            .attr("width", team.r*1.2)
                            .attr("height", team.r*1.2);
                        x++;
                    });
                });
            }

            var forObj = company.append('foreignObject').attr("class", "foreign_title")
                                .attr('x', function(d) { return d.cx - 50; })
                                .attr('y', function(d) { return d.cy - d.r - 60; });

            forObj.append('xhtml:h3')
                .attr('class', 'header').attr('pointer-events', 'none')
                .text(function(d) { return d.company; })
                .on("click", function() {
                    d3.select('.titlecard').classed("active", d3.select('.titlecard').classed("active") ? false : true);
                });
                
            var card = forObj.append('xhtml:div').attr("class", "titlecard");
                card.append("h4").text("Developer Status");
                card.append('xhtml:ul').attr("class", "devstatus")
                    .html('<li>+3243 Developers</li><li>70% Active Developers</li><li>80% Publishing Developers</li><li>50% Consuming Developers</li>');
                card.append("h4").text("API & Flow Status");
                card.append('xhtml:ul').attr("class", "apistatus")
                    .html('<li>633 APIs</li><li>30% Reuse Rate</li><li>36756 Flows</li><li>18 Avg Consumers per API</li>');
        });

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');

            if (d3.event.transform.k >= 2.5) {
                comProps.zoomHandle(comProps.viewChild)
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