function Tooltip(container)
{
	this._container = container;
	this._div = $("<div>")
		.addClass("tooltip")
		.css("position", "absolute")
		.css("pointer-events", "none")
		.css("white-space", "nowrap")
		.css("display", "none")
		.attr("role", "tooltip")
		.appendTo(container);
}

Tooltip.prototype.hide = function()
{
	this._div.hide();	
};

Tooltip.prototype.show = function(text, x, y)
{
	
	this._div
		.text(text)
		.css("left", parseInt(x))
		.css("top", parseInt(y));

	var positions = [
		/* upper-center */
		{"transform":"translate(-50%, -100%)","margin-left":"0px","margin-top":"-24px"},
		/* upper-right */
		{"transform":"translate(0, -100%)","margin-left":"0px","margin-top":"-24px"},
		/* upper-left */
		{"transform":"translate(-100%, -100%)","margin-left":"0px","margin-top":"-24px"},
		/* center-left */
		{"transform":"translate(-100%, -50%)","margin-left":"-24px","margin-top":"0px"},
		/* bottom-left */
		{"transform":"translate(-100%, 0)","margin-left":"0px","margin-top":"24px"},
		/* bottom-center */
		{"transform":"translate(-50%, 0)","margin-left":"0px","margin-top":"24px"},
		/* bottom-right */
		{"transform":"translate(0, 0)","margin-left":"0px","margin-top":"24px"},
		/* center-right */ 
		{"transform":"translate(0, -50%)","margin-left":"24px","margin-top":"0px"}
	];
	
	this._div.show();
	
	// move through each of the positions until one doesn't overflow 
	// the container (or until the options run out...)
	
	var i = 0;
	do {
		this._div.css(positions[i]);
		i++;
	} while (!isWithin(this._div, this._container) && i < positions.length);
				
	function isWithin(div, container)
	{
		
		var boundaryRight = $(container).outerWidth();
		var boundaryLeft = 0;
		var boundaryTop = 0;
		var boundaryBottom = $(container).outerHeight();
		
		var left = parseInt(div.position().left)+parseInt(div.css("margin-left"));
		var right = left+parseInt(div.outerWidth());
		var spitze = parseInt(div.position().top)+parseInt(div.css("margin-top"));
		var bottom = spitze+parseInt(div.outerHeight());
		
		return right < boundaryRight &&
				left > boundaryLeft && 
				spitze > boundaryTop && 
				bottom < boundaryBottom;
		
	}

};

