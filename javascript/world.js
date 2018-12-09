/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Class World */
class World
{
	constructor() 
	{
		this.m_courts = new Array();
	}

	getCourt(position)
	{
		if ((position < this.m_courts.length) && (position >= 0)) {
			return this.m_courts[position];
		} else {
			return this.m_courts[0];
		}

	}

	getCourts()
	{
		return this.m_courts;
	}

	addCourt(xMin, xMax, yMin, yMax, mutationPercentage, fertilizationPercentage)
	{
		this.m_courts.push(new Court(xMin, xMax, yMin, yMax, mutationPercentage, fertilizationPercentage));
	}

	start()
	{
		for (var i = 0; i < this.m_courts.length; i++) {
			this.m_courts[i].simulateBallsMoving();
		}
	}
}
