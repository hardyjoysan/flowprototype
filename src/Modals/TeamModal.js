import React, {Component} from 'react';
import * as d3 from 'd3';

class TeamModal extends Component {

    componentDidMount(){

        const comProps = this.props;

        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        var data =
            [
                { "team": "Optimus Prime", "icon": "optimus.svg", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "team": "Avengers", "icon": "avenger.svg", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "team": "Starscream", "icon": "starscream.svg", "children": [{"api":"API1"}, {"api":"API2"}] },
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
                        child.x = node.x + 150 * Math.cos(angle);
                        child.y = node.y + 150 * Math.sin(angle);
                        child.r = 10;
                        node.links[j] = { source: node, target: child };
                        j++;
                    });
                }
                node.nodeid = "node"+i;
                i++;
            });

            d3.select(".teamModal")
            .append('div')
            .attr("class", "parentTitle")
            .append('h2').text("Stockholm")
            .attr("goback");

            const zoom = d3.zoom()
                        .scaleExtent([0.6, 2.5])
                        .on("zoom", zoomed);

            var svg = d3.select(".teamModal").append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(zoom)
                .append("g");

            var teams = data;

            teams.forEach(function (apis) {
                if (apis.children) {
                    var x = 0;
                    svg.selectAll("apiline"+x)
                    .data(apis.links)
                    .enter()
                    .append("line")
                    .attr("class", "apiline apiline"+x)
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
                        g_t.append("image")
                            .attr("xlink:href", "/api_ico.svg")
                            .attr("x", api.x - 6)
                            .attr("y", api.y - 6)
                            .attr("width", 12)
                            .attr("height", 12);
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

            svg.selectAll(".icons")
                .data(data)
                .enter()
                .append("image")
                .attr("class", "icons")
                .attr("xlink:href", function (d) { return d.icon; })
                .attr("x", function (d) { return d.x - 25; })
                .attr("y", function (d) { return d.y - 25; })
                .attr("width", 50)
                .attr("height", 50);

            function tick() {
                links.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                nodes.attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; });
            }

            var forObj = svg.selectAll('.foreign_title')
                .data(data).enter().append('foreignObject').attr("class", "foreign_title")
                .attr("width", 180)
                .attr('height', 28)
                .attr("id", function(d) { return "foreignid_"+d.nodeid; })
                .attr("x", function (d) { return d.x - 90; })
                .attr("y", function (d) { return d.y - 80; });
                
            forObj.append('xhtml:h3').style("font-size", "13px")
            .style("width", "180px")
            .attr('class', 'header pointer')
            .attr('pointer-events', 'none')
            .text(function(d) { return d.team; })
            .on("click", function(d) {
                appendCardpopup(d);
            });
            function appendCardpopup(data) {
                var popup = d3.select(".teamModal").append('xhtml:div').attr("class", "cardpopup active");
                var card = popup.append("xhtml:div").attr("class", "titlecard");
                card.append("xhtml:h3").attr("class", "title").text(data.team);
                card.append("xhtml:h4").text("Developer Status");
                card.append('xhtml:ul').attr("class", "devstatus")
                    .html('<li class="devcount"><img src="/dev1.svg" /> <img src="/dev2.svg" /> <img src="/dev3.svg" /> <span>+3243 Developers</span></li> <li>70% Active Developers</li><li>80% Publishing Developers</li> <li>50% Consuming Developers</li>');
                card.append("xhtml:h4").text("API & Flow Status");
                card.append('xhtml:ul').attr("class", "apistatus")
                    .html('<li><span class="api_ico"></span>633 APIs</li><li><span class="api_ico"></span>30% Reuse Rate</li><li><span class="api_ico"></span>36756 Flows</li><li><span class="api_ico"></span>18 Avg Consumers per API</li>');
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
                if (d3.event.transform.k <= 0.6) {
                    comProps.zoomHandle(comProps.viewParent)
                }
            }
    }

    render(){
        return(
            <div className="teamModal"></div>
        );
    }
}

export default TeamModal;