import React, { Component } from 'react';
import './css/App.css';

import * as d3 from 'd3';

class App extends Component {

  componentDidMount(){

    const width = window.frameElement ? 960 : window.innerWidth,
      height = window.frameElement ? 600 : window.innerHeight,
      margin = {top: -5, right: -5, bottom: -5, left: -5};

      const svg = d3.select(".App")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const view = svg.append("g")
                .attr("class", "view");

    //const data = [ { "source" : "A", "target" : "B" }, { "source" : "B", "target" : "C" }, { "source" : "C", "target" : "D" }, { "source" : "D", "target" : "E" }, { "source" : "E", "target" : "F" }, { "source" : "F", "target" : "G" }, { "source" : "G", "target" : "H" }, { "source" : "H", "target" : "I" }, { "source" : "I", "target" : "J" }, { "source" : "J", "target" : "A" } ] ; 

    var nodes = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Eve'}],
        links = [{source: 0, target: 1}, {source: 2, target: 0}];

    var force = d3.forceSimulation(nodes)
    .force('link', d3.forceLink())
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));
    

    force.nodes(nodes)
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(links));

    var node = view.selectAll('circle')
                .data(nodes).enter().append('circle')
                .attr('r', 5);

    var link = view.selectAll('line')
                  .data(links).enter().append('line');

    force.on('tick', function() {
      node.attr('cx', function(d) {return d.x;})
          .attr('cy', function(d) {return d.y;});
      link.attr('x1', function(d) {return d.source.x;})
          .attr('y1', function(d) {return d.source.y;})
          .attr('x2', function(d) {return d.target.x;})
          .attr('y2', function(d) {return d.target.y;});
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
