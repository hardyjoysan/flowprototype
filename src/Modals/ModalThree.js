import React, {Component} from 'react';
import * as d3 from 'd3';

class ModalThree extends Component {

    componentDidMount(){
        const width = window.frameElement ? 960 : window.innerWidth - 100,
            height = window.frameElement ? 600 : window.innerHeight - 100;

        var data =
            [
                { "team": "Optimus Prime" },
                { "team": "Bumblebee" },
                { "team": "Starscream" }
            ];

            var dataLinks = [
                { source: 0, target: 1 },
                { source: 1, target: 2 },
                { source: 2, target: 0 },
            ];

            const force = d3.forceSimulation()
                            .nodes(data)
                            .force("link", d3.forceLink(dataLinks).distance(300))
                            .force('charge', d3.forceManyBody(-20))
                            .force('center', d3.forceCenter(width / 2, height / 2))
                            .force('collide', d3.forceCollide(100))
                            .force('x', d3.forceX(width / 2).strength(0.5))
                            .force('y',  d3.forceY(height / 2).strength(0.5))
                            .on('tick', tick);

            var svg = d3.select(".modalThree").append("svg")
                .attr("width", width)
                .attr("height", height);


            var links = svg.selectAll(".link")
                    .data(dataLinks)
                    .enter().append("line")
                    .attr("class", "link");

            var nodes = svg.selectAll(".node")
                    .data(data)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 40)
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended)
                    );

            var text = svg.selectAll(".text")
                            .data(data)
                            .enter()
                            .append('foreignObject')
                            .attr("class", "text")
                            .attr('width', 150);

            text.append('xhtml:h3').attr('class', 'header').style("font-size", "14px").text(function (d) { return d.team; })

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
    }

    render(){
        return(
            <div className="modalThree">
                  
            </div>
        );
    }
}

export default ModalThree;