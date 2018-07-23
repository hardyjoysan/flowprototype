import React, {Component} from 'react';
import * as d3 from 'd3';

class ModalTwo extends Component {

    constructor(props){
        super(props);
        this.state = {width: 960, height: 500};
    }

    componentDidMount(){

        var circleData = [{ "cx": 150, "cy": 400, "radius": 100 },
                        { "cx": 575, "cy": 400, "radius": 200}];

        const width = window.innerWidth - 100,
              height = window.innerHeight - 100;

        var zoom = d3.zoom()
                    .scaleExtent([0.5, 10])
                    .translateExtent([[0, 0], [width, height]])
                    .extent([[width/4, 0], [width, height]])
                    .on("zoom", zoomed);

        const svg = d3.select(".modalTwo")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", "translate("+ width/4 +" ,0 )")
                      .call(zoom);

        svg.append("rect").attr("width", width).attr("height", height);

        svg.append("text").attr("x", 125).attr("y", 250).text("Division")
        svg.append("text").attr("x", 525).attr("y", 125).text("Bigger Division")

        const circles = svg.selectAll("circle").data(circleData).enter().append("circle")

        circles
            .attr("cx", function (d) { return d.cx; })
            .attr("cy", function (d) { return d.cy; })
            .attr("r", function (d) { return d.radius; });
        
        svg.append("line").attr("x1", 375).attr("y1", 400).attr("x2", 250).attr("y2", 400)

        function zoomed() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
        }
    }

    render(){
        return(
            <div className="modalTwo"></div>
        );
    }
}

export default ModalTwo;