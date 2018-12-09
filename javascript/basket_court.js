/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Classe Court */
class Court
{
	constructor(xMin, xMax, yMin, yMax, mutationPercentage, fertilizationPercentage) 
	{
		this.m_xMin = xMin;
		this.m_xMax = xMax;
		this.m_yMin = yMin;
		this.m_yMax = yMax;
		this.m_mutationPercentage = mutationPercentage;
		this.m_fertilizationPercentage = fertilizationPercentage;
		this.m_oneStepDistance = (yMin - yMax)/50;		
		this.m_balls = new Array(12);
		this.m_img = new Image();
		this.m_basket = new Basket((xMin + xMax)/2 - 25, (xMin + xMax)/2 + 25, yMin, yMin + 50);

		for (var i = 0; i < this.m_balls.length; i++) {
			this.m_balls[i] = new Ball(0, yMax, i);
			this.addBall(i);
		}
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

	setMutationPercentage(percentage)
	{
		this.m_mutationPercentage = percentage;
	}

	setFertilizationPercentage(percentage)
	{
		this.m_fertilizationPercentage = percentage;
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

	getMutationPercentage()
	{
		return this.m_mutationPercentage;
	}

	getFertilizationPercentage()
	{
		return this.m_fertilizationPercentage;
	}

	getOneStepDistance()
	{
		return this.m_oneStepDistance;
	}

	fertilizeBalls(fatherBall, motherBall)
	{
		for (var i = 0; i < this.m_balls.length; i++) {
			if( (this.m_balls[i].getId() != fatherBall.getId()) && (this.m_balls[i].getId() != motherBall.getId())) {
				for (var j = 0; j < this.m_balls[i].gen.getRoute().length; j++) {
					var rand = Math.random();
					if (rand < this.m_fertilizationPercentage/100.0) {
						this.m_balls[i].gen.setRoute(j, fatherBall.gen.getRoutePosition(j));
					} else {
						this.m_balls[i].gen.setRoute(j, motherBall.gen.getRoutePosition(j));
					}
				}
				this.addBall(i);
			}
		}
	}

	naturalSelection()
	{
		var list = new Array(this.m_balls.length);
		for (var i = 0; i < this.m_balls.length; i++) {
			list[i] = {id: this.m_balls[i].getId(), value1: this.m_balls[i].dna.getDistanceFromBasket(), value2: this.m_balls[i].dna.getTravelledDistance()};
			this.m_balls[i].resetRoutePosition();
		}
		var sortedList = list.sort(orderByProperty('value1', 'value2'));
		for (var i = 2; i < sortedList.length; i++) {
			this.killBall(sortedList[i].id);
		}
		return [sortedList[0].id, sortedList[1].id];
	}

	mutation(fatherBall, motherBall)
	{
		for (var i = 0; i < this.m_balls.length; i++) {
			if( (this.m_balls[i].getId() != fatherBall.getId()) && (this.m_balls[i].getId() != motherBall.getId())) {
				for (var j = 0; j < this.m_balls[i].gen.getRoute().length; j++) {
					var rand = Math.random();
					if (rand < this.m_mutationPercentage/100.0) {
						if (rand < (this.m_mutationPercentage/100.0)/3.0) {
    						this.m_balls[i].gen.setRoute(j,'l');
    					} else if (rand > (this.m_mutationPercentage/100.0)/(2.0/3.0)) {
    						this.m_balls[i].gen.setRoute(j,'s');
    					} else {
    						this.m_balls[i].gen.setRoute(j,'r');
    					}
					}
				}
			}
		}
	}

	addBall(id)
	{
		this.m_balls[id].setAlive(true);
	}

	draw()
	{
		this.m_img.src = "image/court.png";
		this.m_img.style = "position:absolute;"
		this.m_img.style.left = this.getXMin();
    	this.m_img.style.top = this.getYMin();		
    	this.m_img.width = this.getXMax() - this.getXMin();
    	this.m_img.height = this.getYMax() - this.getYMin();
		document.getElementById("display").appendChild(this.m_img);
	}

	simulateBallsMoving()
	{
		this.draw();
		this.m_basket.draw();

		setTimeout(function movimentation(that) {
			// Local Use Variables
			var fatherBallId = 0;
			var motherBallId = 1;
			// Apply Balls Movements
			if(!that.m_balls[that.m_balls.length - 1].getRouteEnd()) {
				for (var i = 0; i < that.m_balls.length; i++) {
					that.m_balls[i].drawRoute();
					that.m_balls[i].draw();
					that.m_balls[i].move(that.getOneStepDistance());
				}
				setTimeout(movimentation, 80, that);
			} else {
				// Apply Dna Generation
				that.generateDna();
				// Apply Natural Selection
				[fatherBallId, motherBallId] = that.naturalSelection();
				// Apply Fertilization
				that.fertilizeBalls(that.m_balls[fatherBallId], that.m_balls[motherBallId]);
				// Apply Mutation
				that.mutation(that.m_balls[fatherBallId], that.m_balls[motherBallId]);
				// Apply Delay
				console.log("Waiting 5 seconds...");
				sleep(5000);
				// Destroy Routes
				that.killDeadRoutes(that.m_balls[fatherBallId], that.m_balls[motherBallId]);
				// Apply recursion
				setTimeout(movimentation, 80, that);				
			}
		}, 80, this);
	}

	generateDna()
	{
		for (var i = 0; i < this.m_balls.length; i++) {
			this.m_balls[i].calculateTravelledDistance(this.m_oneStepDistance);
			if(this.m_balls[i].getX() > this.m_basket.getXMin() && (this.m_balls[i].getX() < this.m_basket.getXMax())) {
				this.m_balls[i].dna.setDistanceFromBasket(0);
			} else {
				this.m_balls[i].dna.setDistanceFromBasket(Math.abs(this.m_balls[i].getX() - (this.m_basket.getXMin() + this.m_basket.getXMax())/2));
			}
		}
	}

	killBall(id)
	{
		this.m_balls[id].setAlive(false);
	}

	killDeadRoutes(fatherBall, motherBall)
	{
		for (var i = 0; i < this.m_balls.length; i++) {
			for (var j = 0; j < this.m_balls[i].m_gen.m_img.length; j++) {
				if ((this.m_balls[i].getId() != fatherBall.getId()) && (this.m_balls[i].getId() != motherBall.getId())) {
					this.m_balls[i].m_gen.m_img[j].style.visibility = 'hidden';
				}
			}
		}
	}
}
