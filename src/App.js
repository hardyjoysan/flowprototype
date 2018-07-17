import React, { Component } from 'react';
import './css/App.css';

import * as d3 from 'd3';

class App extends Component {

  componentDidMount(){

    const width = window.frameElement ? 960 : window.innerWidth,
      height = window.frameElement ? 600 : window.innerHeight,
      margin = {top: -5, right: -5, bottom: -5, left: -5};

    var links = [ { "source" : "A", "target" : "B" }, { "source" : "B", "target" : "C" }, { "source" : "C", "target" : "D" }, { "source" : "D", "target" : "E" }, { "source" : "E", "target" : "F" }, { "source" : "F", "target" : "G" }, { "source" : "G", "target" : "H" }, { "source" : "H", "target" : "I" }, { "source" : "I", "target" : "J" }, { "source" : "J", "target" : "A" } ] ; 
    var nodes = [];

    links.forEach(function(link) {
      link.source = nodes[link.source] ||
      (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] ||
      (nodes[link.target] = {name: link.target});
      link.value = +link.value;
    });

    console.log(nodes);

    var nodes = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Eve'}],
        links = [{source: 0, target: 1}, {source: 2, target: 0}];


        

    var force = d3.forceSimulation(nodes)
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

    force.nodes(nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(links));

    const svg = d3.select(".App")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

    var node = svg.selectAll('.node')
                .data(nodes).enter().append('g');

    node.append("circle")
    .attr("r", 8);

    node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .style("fill", "#3182bd")
    .text(function(d) { return d.name; });

    var link = svg.selectAll('line')
                  .data(links)
                  .enter()
                  .append('line')
                  .style("stroke", "#000");

    force.on('tick', function() {
      link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
