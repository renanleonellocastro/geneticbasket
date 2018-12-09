/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Class DNA */
class Dna
{
	constructor() 
	{
		this.m_distanceFromBasket = 0;
		this.m_travelledDistance = 0.0;
	}

	setDistanceFromBasket(distance)
	{
		this.m_distanceFromBasket = distance;
	}

	setTravelledDistance(distance)
	{
		this.m_travelledDistance = distance;
	}

	getDistanceFromBasket()
	{
		return this.m_distanceFromBasket;
	}

	getTravelledDistance()
	{
		return this.m_travelledDistance;
	}
}
