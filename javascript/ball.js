/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Class Ball */
class Ball
{
	constructor(x,y,id) 
	{
		this.m_x = x;
		this.m_xStart = x;
		this.m_y = y;
		this.m_yStart = y;
		this.m_alive = false;
		this.m_id = id;
		this.m_routePosition = 0;
		this.m_img = new Image();
		this.m_dna = new Dna();
		this.m_gen = new Gen();		
	}

	setX(x)
	{
		this.m_x = x;
	}

	setY(y)
	{
		this.m_y = y;
	}

	setAlive(alive)
	{
		this.m_alive = alive;
	}

	resetRoutePosition()
	{
		this.m_routePosition = 0;
		this.m_x = this.m_xStart;
		this.m_y = this.m_yStart;
	}

	getX()
	{
		return this.m_x;
	}

	getY()
	{
		return this.m_y;
	}

	getAlive()
	{
		return this.m_alive;
	}

	getId()
	{
		return this.m_id;
	}

	getRouteEnd()
	{
		if(this.m_routePosition == this.m_gen.getRoute().length) {
			return true;
		} else {
			return false;
		}
	}

	get dna()
	{
		return this.m_dna;
	}

	get gen()
	{
		return this.m_gen;
	}

	draw()
	{
		this.m_img.src = "image/ball.png";
		this.m_img.style = "position:absolute;"
		this.m_img.style.left = this.getX();
    	this.m_img.style.top = this.getY();		
    	this.m_img.width = 30; // for a while it is hardcoded
    	this.m_img.height = 30; // for a while it is hardcoded
		document.getElementById("display").appendChild(this.m_img);
	}

	calculateTravelledDistance(oneStepDistance)
	{
		var totalDistance = 0.0
		for (var i = 0; i < this.m_gen.getRoute().length; i++) {
			if (this.m_gen.getRoutePosition(i) == 's') {
				totalDistance += oneStepDistance;
			} else {
				totalDistance += oneStepDistance * 1.4142135623730951;
			}
		}
		this.m_dna.setTravelledDistance(Math.abs(totalDistance));
	}

	move(oneStepDistance)
	{
		if (this.m_gen.getRoutePosition(this.m_routePosition) == 's') {
			this.setY(this.getY() + oneStepDistance);
		} else {
		 	if (this.m_gen.getRoutePosition(this.m_routePosition) == 'l') {
				this.setX(this.getX() + oneStepDistance);
				this.setY(this.getY() + oneStepDistance);
			}
			if (this.m_gen.getRoutePosition(this.m_routePosition) == 'r') {
				this.setX(this.getX() - oneStepDistance);
				this.setY(this.getY() + oneStepDistance);
			}
		}		
		this.m_routePosition++;
	}

	drawRoute() 
	{
		if (this.m_gen.getRoutePosition(this.m_routePosition) == 's') {
			this.m_gen.m_img[this.m_routePosition].src = "image/straight.png";
		}
		if (this.m_gen.getRoutePosition(this.m_routePosition) == 'l') {
			this.m_gen.m_img[this.m_routePosition].src = "image/left.png";
		}
		if (this.m_gen.getRoutePosition(this.m_routePosition) == 'r') {
			this.m_gen.m_img[this.m_routePosition].src = "image/right.png";
		}
		this.m_gen.m_img[this.m_routePosition].style = "position:absolute;";
		this.m_gen.m_img[this.m_routePosition].style.left = this.getX() + 15; // for a while it is hardcoded
		this.m_gen.m_img[this.m_routePosition].style.top = this.getY();
    	this.m_gen.m_img[this.m_routePosition].width = 10; // for a while it is hardcoded
    	this.m_gen.m_img[this.m_routePosition].height = 10; // for a while it is hardcoded
    	this.m_gen.m_img[this.m_routePosition].style.visibility = 'visible'; 	
		document.getElementById("display").appendChild(this.m_gen.m_img[this.m_routePosition]);
	}
}
