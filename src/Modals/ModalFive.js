import React, {
    Component
} from 'react';
import * as d3 from 'd3';

class ModalFive extends Component {

    componentDidMount() {
        const comProps = this.props;

        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        var root = {
            "name": "API",
            "children": [{"name": "API1"}, {"name": "API2"}, {"name": "API3"}, {"name": "API4"}, {"name": "API5"}]
        };

        //initialising hierarchical data
        root = d3.hierarchy(root);

        var i = 0;
        var nodeSvg, linkSvg, force;

        const zoom = d3.zoom()
                    .scaleExtent([0.5, 10])
                    .translateExtent([[0, 0], [width, height]])
                    .extent([[0, 0], [width, height]])
                    .on("zoom", zoomed);

        var svg = d3.select(".modalFive").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom)
            .append("g")
            .attr("transform", "translate(40,0)");

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
            if (d3.event.transform.k >= 10) {
                comProps.zoomHandle(comProps.viewChild)
            }
            if (d3.event.transform.k <= 0.5) {
                comProps.zoomHandle(comProps.viewParent)
            }
        }

        force = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide(100))
            .on("tick", ticked);

        update();

        function update() {
            var nodes = flatten(root);
            var links = root.links();

            linkSvg = svg.selectAll(".link")
                        .data(links, function (d) { return d.target.id; })

                        console.log(nodes);

            var linkEnter = linkSvg.enter()
                .append("line")
                .attr("class", "link");

            linkSvg = linkEnter.merge(linkSvg)

            nodeSvg = svg.selectAll(".node")
                .data(nodes, function (d) {
                    return d.id;
                })

            nodeSvg.exit().remove();

            var nodeEnter = nodeSvg.enter()
                .append("g")
                .attr("class", function (d) { return d.children ? "node parent" : "node"; })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))

            nodeEnter.append("circle")
                .attr("r", function (d) { return d.children ? 60 : 15; })
                .append("title")
                .text(function (d) {
                    return d.data.name;
                })

            nodeEnter.append("text")
                .attr("dy", 6)
                .attr("x", function (d) {
                    return d.children ? 12 : 25;
                })
                .style("text-anchor", function (d) {
                    return d.children ? "end" : "start";
                })
                .text(function (d) {
                    return d.data.name;
                });

            nodeSvg = nodeEnter.merge(nodeSvg);

            force.nodes(nodes)

            force.force("link")
                .links(links);
        }

        function ticked() {
            linkSvg
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            nodeSvg
                .attr("transform", function (d) {
                    return "translate(" + d.x + ", " + d.y + ")";
                });
        }

        function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        } 
    
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
    
        function dragended(d) {
            if (!d3.event.active) force.alphaTarget(1);
            d.fx = null;
            d.fy = null;
        }

        function flatten(root) {
            var nodes = [];
            function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                if (!node.id) node.id = ++i;
                else ++i;
                nodes.push(node);
            }
            recurse(root);
            return nodes;
        }
    }

    render() {
        return (
            <div className="modalFive"></div>
        );
    }
}

export default ModalFive;