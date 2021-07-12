const commonWordsCloud = (svg_name,data) => {
	let chart = d3.select(svg_name);
	let chart_width = $(svg_name).width();
	let chart_height = $(svg_name).height();
	let margin = {left:50,bottom:40,right:10,top:10};

	data.forEach((d) => { 
		d.size = Math.sqrt(d.count);
		//d.text = d.word;
	})

	let letterScale = d3.scaleLinear()
											.range([15,85])
											.domain(d3.extent(data,(d) => { return d.count; }));

	let fill = d3.scaleSequential()
								.domain([0, data.length])
									.interpolator(d3.interpolateRainbow);

	let tooltip = addToolTipCloud();

	const draw = (words) => {
		chart
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
				.style("fill",(d,i) => { return fill(i); })
        .attr("text-anchor", "middle")
				.attr("font-family","Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
				.attr("class",(d) => { return `${d.count} ${d.word.charAt(0).toUpperCase() + d.word.slice(1,d.word.length)}`; })
				.on("mouseover", (event,d) => {
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html(`${event.target.classList[1]}<br>Count:${event.target.classList[0]}`)
						.style("left", (event.pageX) + "px")
						.style("top", (event.pageY - 28) + "px");
					}
					)
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(500)
						.style("opacity", 0);
					})
        .text(function(d) { return d.text; });
	}
	let layout = d3.layout.cloud().size([chart_width,chart_height])
								.words(data)
								.padding(1)
								.fontSize(function(d) { return letterScale(d.count);})
								.text(function(d) { return d.word.toUpperCase(); })
								.rotate(() => {return 0;})
								.font('Impact')
								.on("end",draw);
	layout.start();
}

const showCount = (event) => {
	console.log(event.target.classList.value);
}


const addToolTipCloud = () => {
	return d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
}