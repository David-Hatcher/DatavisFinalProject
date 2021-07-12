const calanderHeatMap = (svg_name, data) => {
	data.shift()
    data.map((d) => {d.date = new Date(d.date)})

    let years = d3.groups(data,d => d.date.getFullYear());

    const color = d3.scaleLinear()
                    .domain(d3.extent(data,(d) => {return d.count;}))
                    .range(["#fee0d2","#de2d26"])

    const cellSize = 17;
    let height = 150,width = 1000;
    let chart = d3.select(svg_name) 
                .append('svg')
                .attr('class', 'calenderSVG mx-auto')
                .attr('width', width)
                .attr('height', height * years.length)
    
    let year = chart.selectAll("g")
                    .data(years)
                    .join("g")
                        .attr("transform", (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`);
    
    year.append("text")
        .attr("x",-5)
        .attr("y",-5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(([key]) => key);
    
    year.append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(d3.range(7))
        .join("text")
            .attr("x",-5)
            .attr("y",i => (i + 0.5) * cellSize)
            .attr("dy","0.31em")
            .text(i => "SMTWTFS"[i]);

    year.append("g")
        .selectAll("rect")
        .data(([,values]) => {
            return values
        })
        .join("circle")
            //.attr("width", cellSize - 1)
            //.attr("height", cellSize -1)
            .attr('r', cellSize/2 - 1)
            .attr("cx", (d) => { return d3.utcSunday.count(d3.utcYear(d.date),d.date) * cellSize + 0.5 + cellSize/2 ;})
            .attr("cy", (d) => { return d.date.getUTCDay() * cellSize + 0.5 + cellSize/2 ;})
            .attr("fill", (d) => { return color(d.count);})
            .attr("class", (d) => { return getClass(d);})
            .on("mouseover", (event,d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`${mouseOverHandler(event)}`)
                    .style("left", (event.pageX - 100) + "px")
                    .style("top", (event.pageY - 28) + "px");
                }
                )
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                })

    let tooltip = addTooltipHeatMap();

    const month = year.append("g")
            .selectAll("g")
            .data(([, values]) => {
                let months = d3.utcMonths(d3.utcMonth(values[2].date), values[values.length - 1].date)
                return months;
                })
            .join("g");

    month.filter((d, i) => i).append("path")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("d",(d) => pathMonth(d,cellSize));
    month.append("text")
            .attr("x", (d) => { return d3.utcSunday.count(d3.utcYear(d),d3.utcSunday.ceil(d)) * cellSize + 2;})
            .attr("y",-5)
            .attr("font-size",".7em")
            .attr("font-weight","bold")
            .text((d) => { return getMonth(d)})

    let legPad = 80;
    let legend = chart.selectAll('.legend')
                        .data(["#fee0d2","#de2d26"])
                        .enter().append("g")
                        .attr("class","legend")
                        .attr("transform", (d,i) => { return `translate(30,${i * 19})`;});
    legend.append("rect")
        .attr("x",100)
        .attr("y",25)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", (d, i) => {return ["#fee0d2","#de2d26"].slice().reverse()[i];});
                
    legend.append("text")
        .attr("x", 120)
        .attr("y", 33)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-weight","bold")
        .text((d, i) => {
        switch (i) {
            case 0: return "More Tweets";
            case 1: return "Less Tweets";
        }
    })
}

const getClass = (d) => {
    return `${getDate(d.date)} ${d.count}`
}

const getMonth = (d) => {
    let months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    return months[d.getUTCMonth()];
}

const getDate = (d) => {
    return `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`;
}

const pathMonth = (t,cellSize) => {
    const n = 7;
    const d = Math.max(0, Math.min(n, t.getUTCDay()));
    const w = d3.utcSunday.count(d3.utcYear(t), t);
    return `${d === 0 ? `M${w * cellSize},0`
        : d === n ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
}

const addTooltipHeatMap = () => {
	return d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
}

const mouseOverHandler = (event) => {
    let info = event.target.classList.value.split(' ');
    return `Date: ${info[0]}<br>Count:${info[1]}`;
}