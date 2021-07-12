const wordLinks = (svg_name, data) => {
	const links = data.links;
	const nodes = data.nodes;
	check(nodes,links);

	// console.log(links);	
	// console.log(nodes);
	let chart = d3.select(svg_name);
	let chart_height = $(svg_name).height();
	let chart_width = $(svg_name).width();

	let radius = 5

	let tooltip = addTooltipNodes();
	const simulation = d3.forceSimulation(nodes)
											.force("link", d3.forceLink(links).id(d => d.id))
											.force("charge", d3.forceManyBody())
											.force("center", d3.forceCenter(chart_width / 2, chart_height / 2));

	const link = chart.append("g")
										.attr("stroke", "#999")
										.attr("stroke-opacity", 0.6)
									.selectAll("line")
										.data(links)
										.join("line")
										.attr("class", (d) => { return `${d.target.id} ${d.source.id}`})
										.attr("stroke-width", d => Math.sqrt(d.value));
	const node = chart.append("g")
										.attr("stroke", "#fff")
										.attr("stroke-width", 1.5)
									.selectAll("circle")
									.data(nodes)
									.join("circle")
										.attr("r", 5)
										.attr("fill","purple")
										.attr("class",(d) => {return `${d.id}`;})
										.on("mouseover", (event,d) => {
											tooltip.transition()
												.duration(200)
												.style("opacity", .9);
											tooltip.html(`${mouseover(event)}`)
												.style("left", (event.pageX - 100) + "px")
												.style("top", (event.pageY - 28) + "px");
											}
											)
										.on("mouseout", function(d) {
											tooltip.transition()
												.duration(500)
												.style("opacity", 0);
											})
										.call(drag(simulation))

	// node.append("title")
	// 			.text(d => d.id);
							
	simulation.on("tick", () => {
		link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

	node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(chart_width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(chart_height - radius, d.y)); });
    node
        .attr("cx", d => d.x = Math.max(radius, Math.min(chart_width - radius, d.x)))
        .attr("cy", d => d.y = Math.max(radius, Math.min(chart_height - radius, d.y)));
	});

	// invalidation.then(() => simulation.stop());

}

const check = (nodes,links) => {
	let nodeFoundTarArr = [];
	let nodeFoundSorArr = [];
	links.forEach((link) => {
		let nodeFoundTarget = false;
		let nodeFoundSource = false;
		nodes.forEach((node) => {
			if(node.id == link.target){
				nodeFoundTarget = true;
			}
			if(node.id == link.source){
				nodeFoundSource = true;
			}

		})
		if(!nodeFoundTarget){
			nodeFoundTarArr.push(link.target);
		}
		if(!nodeFoundSource){
			nodeFoundSorArr.push(link.source);
		}
	})
	// console.log(nodeFoundSorArr)
	// console.log(nodeFoundTarArr)
}

drag = simulation => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

const mouseover = (event) => {
	let currentNodeClass = event.target.classList.value;
	let linkList = `Word: ${currentNodeClass.charAt(0).toUpperCase() + currentNodeClass.slice(1,currentNodeClass.length)}<br>Connections:`;
	document.querySelectorAll(`line.${currentNodeClass}`).forEach((el) => {
		currentClasses = el.classList.value.replace(currentNodeClass,'').replace(' ','');
		linkList += `<br>${currentClasses.charAt(0).toUpperCase() + currentClasses.slice(1,currentClasses.length)}`
	})
	return linkList;
}

const addTooltipNodes = () => {
	return d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
}