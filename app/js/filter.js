/* Controllers */
var ngcfilters = angular.module('ngcfilters', [])

.filter('dinnacoCityFilter', function() {

  	return function(input, inputCity) {

	    var out = [];

	    angular.forEach(input, function(match) {
	    	if(inputCity === '') {
	    		out.push(match)
	    	}
	      	if (inputCity && match.city === inputCity) {
	        	out.push(match)
	      	}
	      
	    })

	    return out;
  	}

})
// level filter
.filter('dinnacoLevelFilter', function() {

  	return function(input, inputLevel) {

	    var out = [];

	    angular.forEach(input, function(match) {
	    	
	      	if(inputLevel === '') {
	    		out.push(match)
	    	}
	      	if (inputLevel && match.position === inputLevel) {
	        	out.push(match)
	      	}
	      
	    })

	    return out;
  	}

})
// counselee filter
.filter('dinnacoCounseleeFilter', function() {

  	return function(input, inputCoun1, inputCoun2) {

	    var out = [];

	    angular.forEach(input, function(match) {
	    	
	      	if(inputCoun1 === 0 && inputCoun2 === 0) {
	    		out.push(match)
	    	}
	    	var counNum = parseInt(match.counselee);
	    	
	      	if (counNum > inputCoun1 && counNum < inputCoun2) {
	        	out.push(match)
	      	}
	      
	    })

	    return out;
  	}
})
// matches filter
.filter('dinnacoMatchesFilter', function() {

  	return function(input, filterMatches, filterMatchesSign) {

	    var out = [];

	    angular.forEach(input, function(match) {
	    	
	      	if(filterMatches === 0 && filterMatchesSign === '') {
	    		out.push(match)
	    	}
	    	var percent = parseFloat(match.percent);
	    	if(filterMatchesSign === 'above') {
	    		if (percent > filterMatches) {
		        	out.push(match)
		      	}
	    	}
	    	if(filterMatchesSign === 'below') {
	    		if (percent < filterMatches) {
		        	out.push(match)
		      	}
	    	}
	    })

	    return out;
  	}

})