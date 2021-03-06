import React, {Component} from 'react';
import * as d3 from 'd3';

class DeveloperModal extends Component {

    componentDidMount(){

        const comProps = this.props;

        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        var data =
            [
                { "developer": "Sam Witwicky", "icon": "dev1.svg", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "developer": "Mikaela Banes", "icon": "dev2.svg", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API3"}] },
                { "developer": "Robert Epps", "icon": "dev3.svg", "children": [{"api":"API1"}, {"api":"API2"}] },
                { "developer": "Natasha Romanov", "icon": "dev4.svg", "children": [{"api":"API1"}, {"api":"API2"}, {"api":"API2"}] },
            ];

            d3.forceSimulation().on('tick', tick);

            var i = 0;
            data.links = [];
            data.forEach(function(node) {
                var angle = (i / (data.length / 2)) * Math.PI;
                node.x = (width / 2) + 200 * Math.cos(angle);
                node.y = (height / 2) + 200 * Math.sin(angle);
                node.id = "dev"+i;
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

            d3.select(".developerModal")
            .append('div')
            .attr("class", "parentTitle left")
            .append('h2').text("Optimize Prime")
            .attr("goback");

            const zoom = d3.zoom()
                        .scaleExtent([0.6, 2.5])
                        .on("zoom", zoomed);

            var svg = d3.select(".developerModal").append("svg")
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
                    .attr("class", "apiline  apiline"+x)
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

            var forObj = svg.selectAll('.foreign_title')
                .data(data).enter().append('foreignObject')
                .attr("class", "foreign_title")
                .attr("width", 180)
                .attr('height', 28)
                .attr("id", function(d) { return "foreignid_"+d.nodeid; })
                .attr("x", function (d) { return d.x - 90; })
                .attr("y", function (d) { return d.y - 80; });
                
            forObj.append('xhtml:h3').style("font-size", "13px")
                .style("width", "180px")
                .attr('class', 'header')
                .attr('pointer-events', 'none')
                .text(function(d) { return d.developer; });

            svg.append("defs")
                .selectAll("pattern")
                .data(data)
                .enter()
                .append("pattern")
                .attr("id", function (d) { return d.id; })
                .attr("width", 1)
                .attr("height", 1)
                .attr("patternUnits", "objectBoundingBox")
                .append("image")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 80)
                .attr("height", 80)
                .attr("xlink:href", function (d) { return d.icon; });

            function tick() {
                links.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                nodes.attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
                    .style("fill", function(d){ return "url(#" + d.id + ")"; });
            }

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
            <div className="developerModal"></div>
        );
    }
}

export default DeveloperModal;