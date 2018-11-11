const d3 = window['d3'];

namespace Website {
    export class DashbordView {
        constructor() {
            console.log('hi')
            this.createTestChart();
        }

        private createTestChart() {
            var margin = { top: 20, right: 80, bottom: 30, left: 50 },
                width = parseInt(d3.select("#test-chart").style("width")) - margin.left - margin.right;
                // height = parseInt(d3.select("#test-chart").style("height")) - margin.top - margin.bottom;
            // parse the date / time
            var parseTime = d3.timeParse("%d-%b-%y");

            // set the ranges
            var x = d3.scaleTime().range([0, width]);
            var y = d3.scaleLinear().range([250, 0]);

            // define the line
            var valueline = d3.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(d.close); });

            // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("#test-chart").append("svg")
                .attr("width", width)
                .attr("height", 250)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            let data = [
                { date: '11-Nov-18', close: 58.13 },
                { date: '10-Nov-18', close: 53.98 },
                { date: '9-Nov-18', close: 67.00 },
                { date: '8-Nov-18', close: 89.70 }
            ];

            // format the data
            data.forEach(function (d) {
                d.date = parseTime(d.date);
                d.close = +d.close;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) { return d.date; }));
            y.domain([0, d3.max(data, function (d) { return d.close; })]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + 250 + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));
        }
    }
}