import React, { Component } from 'react';
import './css/App.css';

import * as d3 from 'd3';

class App extends Component {

  componentDidMount(){

    const width = window.frameElement ? 960 : window.innerWidth,
      height = window.frameElement ? 600 : window.innerHeight;

    const data = d3.range(20).map(function() { return [Math.random() * width, Math.random() * height]; });

    const svg = d3.select(".App")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

    const g = svg.append("g");

    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().scaleExtent([0.3, 10]).on("zoom", zoomed));

    const view = g.append("g")
                .attr("class", "view");

    view.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 50);

    function zoomed() {
      view.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
    }
  }

  
  

  render() {
    return (
        <div className="App">

      </div>
    );
  }
}

export default App;
