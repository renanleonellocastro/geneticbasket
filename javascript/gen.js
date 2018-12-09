/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Class Gen */
class Gen
{
	constructor() 
	{
		this.m_route = new Array(50);
		this.m_img = new Array(50);
		for (var i = 0; i < this.m_route.length; i++) {
			this.m_img[i] = new Image();
			var rand = Math.random();
    		if (rand < 0.333) {
    			this.m_route[i] = 'l';
    		} else if (rand > 0.666) {
    			this.m_route[i] = 's';
    		} else {
    			this.m_route[i] = 'r';
    		}
		}
	}

	setRoute(position, value)
	{
		if ((position < 50) && (position >= 0)) {
			this.m_route[position] = value;
			return true;
		} else {
			return false;
		}
	}

	getRoutePosition(position)
	{
		if ((position < 50) && (position >= 0)) {
			return this.m_route[position];
		} else {
			return this.m_route[0];
		}
	}

	getRoute()
	{
		return this.m_route;
	}
}
