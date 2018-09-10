import React, {Component} from 'react';

import * as d3 from 'd3';

class CompanyModal extends Component {

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
            node.r = 600/2.5;
            

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
                    .scaleExtent([1, 2.5])
                    .on("zoom", zoomed);
        
        const svg = d3.select(".companyModal")
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
                    .style("stroke", "#a3a3a3")
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
                    .attr('y', function(d) { return d.cy - d.r - 30; })
                    .attr('width', 100)
                    .attr('height', 23)
                    .append('xhtml:h3')
                    .attr('class', 'header')
                    .style("font-size", "10px")
                    .text(function(d) { return d.division; });

                comp.children.forEach(function(divs) {
                    division.selectAll(".teamline")
                        .data(divs.links)
                        .enter()
                        .append("line")
                        .style("stroke", "#a3a3a3")
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
                            .attr('y', team.cy - 45)
                            .attr('width', 70)
                            .attr('height', 21)
                            .append('xhtml:h3')
                            .attr('class', 'header')
                            .style("font-size", "7px")
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

            var forObj = company.append('foreignObject')
                        .attr("class", "foreign_title")
                        .attr("width", 180)
                        .attr("height", 30)
                        .attr('x', function(d) { return d.cx - 90; })
                        .attr('y', function(d) { return d.cy - d.r - 40; });

            forObj.append('xhtml:h3')
                .attr('class', 'header pointer')
                .attr('pointer-events', 'none')
                .style("width", "180px")
                .text(function(d) { return d.company; })
                .on("click", function(d) {
                    appendCardpopup(d);
                    
                });
        });

        function appendCardpopup(data) {
            var popup = d3.select(".companyModal").append('xhtml:div').attr("class", "cardpopup active");
            var card = popup.append("xhtml:div").attr("class", "titlecard");
            card.append("xhtml:h3").attr("class", "title").text(data.company);
            card.append("xhtml:h4").text("Developer Status");
            card.append('xhtml:ul').attr("class", "devstatus")
                .html('<li class="devcount"><img src="/dev1.svg" /> <img src="/dev2.svg" /> <img src="/dev3.svg" /> <span>+3243 Developers</span></li> <li>70% Active Developers</li><li>80% Publishing Developers</li> <li>50% Consuming Developers</li>');
            card.append("xhtml:h4").text("API & Flow Status");
            card.append('xhtml:ul').attr("class", "apistatus")
                .html('<li><span class="api_ico"></span><span class="text">633 APIs</span></li><li><span class="api_ico"></span><span class="text">30% Reuse Rate</span></li><li><span class="api_ico"></span><span class="text">36756 Flows</span></li><li><span class="api_ico"></span><span class="text">18 Avg Consumers per API</span></li>');
        }

        function checkEventTarget() {
            return this === d3.event.target;
        }

        d3.select("body").on("click",function(){
            var popupShow = d3.selectAll(".titlecard, .titlecard *, .foreign_title h3.header");
            if(popupShow.filter(checkEventTarget).empty()){
                d3.selectAll(".cardpopup").remove();
            }
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
            <div className="companyModal"></div>
        );
    }
}

export default CompanyModal;