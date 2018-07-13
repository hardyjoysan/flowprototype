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
      .attr("height", height);

    const view = g.append("g")
                .attr("class", "view");

    view.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 50);

  }

  
  

  render() {
    return (
        <div className="App">

      </div>
    );
  }
}

export default App;
