import React, { Component } from 'react';
import './css/App.css';

import * as d3 from 'd3';

class App extends Component {

  componentDidMount(){

    const width = window.frameElement ? 960 : window.innerWidth,
          height = window.frameElement ? 600 : window.innerHeight,
          margin = {top: -5, right: -5, bottom: -5, left: -5};

    var zoom = d3.zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([1, 40])
                .translateExtent([[0, 0], [width, height]])
                .on("zoom", zoomed);

    var links = [ { source : "A", target : "B" }, { source : "B", target : "C" }, { source : "C", target : "D" }, { source : "D", target : "E" }, { source : "E", target : "F" }, { source : "F", target : "G" }, { source : "G", target : "H" }, { source : "H", target : "I" }, { source : "I", target : "J" }, { source : "J", target : "A" } ] ;
    var nodes = {};

    links.forEach(function(link) {
      link.source = nodes[link.source] ||
      (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] ||
      (nodes[link.target] = {name: link.target});
    });

    const force = d3.forceSimulation()
                  .nodes(d3.values(nodes))
                  .force("link", d3.forceLink(links).distance(110))
                  .force('charge', d3.forceManyBody())
                  .force('center', d3.forceCenter(width / 2, height / 2))
                  .force('collide', d3.forceCollide(50))
                  .alphaTarget(1)
                  .on('tick', tick);

    const svg = d3.select(".App")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
                  .call(zoom).on("mousedown.zoom", null);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all");

    var link = svg.selectAll('.link')
                  .data(links)
                  .enter()
                  .append('line')
                  .attr("class", "link");

    var node = svg.selectAll('.node')
                  .data(force.nodes())
                  .enter().append("g")
                  .attr("class", "node")
                  .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                  );

    node.append("circle")
        .attr("r", 50)
        .style("fill", "#000");

    // node.append("image")
    //     .attr("xlink:href", "https://github.com/favicon.ico")
    //     .attr("x", -8)
    //     .attr("y", -8)
    //     .attr("width", 16)
    //     .attr("height", 16);
        
    node.append("text")
    .attr("x", -5)
    .attr("dy", 5)
    .text(function(d) { return d.name; });

    function tick() {
      link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
      
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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

    function zoomed() {
      svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
    }
  }

  render() {
    return (
      <div className="App"></div>
    );
  }
}

export default App;
