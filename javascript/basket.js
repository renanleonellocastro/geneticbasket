/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Classe Basket */
class Basket
{
	constructor(xMin, xMax, yMin, yMax) 
	{
		this.m_xMin = xMin;
		this.m_xMax = xMax;
		this.m_yMin = yMin;
		this.m_yMax = yMax;
                this.m_xCenter = (xMin + xMax)/2;
		this.m_img = new Image();
	}

	setXMin(x)
	{
		this.m_xMin = x;
	}

	setXMax(x)
	{
		this.m_xMax = x;
	}

	setYMin(y)
	{
		this.m_yMin = y;
	}

	setYMax(y)
	{
		this.m_yMax = y;
	}

	getXMin()
	{
		return this.m_xMin;
	}

	getXMax()
	{
		return this.m_xMax;
	}

	getYMin()
	{
		return this.m_yMin;
	}

	getYMax()
	{
		return this.m_yMax;
	}

	draw()
	{
		this.m_img.src = "image/basket.png";
		this.m_img.style = "position:absolute;"
		this.m_img.style.left = this.getXMin() + "px";
    	        this.m_img.style.top = this.getYMin() + "px";
    	        this.m_img.width = this.getXMax() - this.getXMin();
    	        this.m_img.height = this.getYMax() - this.getYMin();
		document.getElementById("display").appendChild(this.m_img);
	}
}
