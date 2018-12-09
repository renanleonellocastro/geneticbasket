/*
Title: Genetic Algorithm to calculate the shortest route
Autor: Renan L. Castro
Data: 31/05/2018
License: The MIT License (MIT)
*/

/*************************************************************************************************/
/*Utilitarian Functions*/
function orderByProperty(prop)
{
	var args = Array.prototype.slice.call(arguments, 1);
  	return function (a, b)
  	{
    	var equality = a[prop] - b[prop];
    	if (equality === 0 && arguments.length > 1) {
      		return orderByProperty.apply(null, args)(a, b);
    	}
    	return equality;
  	};
}

function sleep(milliseconds)
{
	var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
    	if ((new Date().getTime() - start) > milliseconds) {
    		break;
    	}
    }
}
