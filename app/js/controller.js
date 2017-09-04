
/* Controllers */
var ngcControllers = angular.module('ngcControllers', [])

// dinnaco counseling matching ctrl
.controller('dinnacoCounselMatchCtrl', function($rootScope, $scope, $window, $location, dataSvc) {
    //sort matches
	$scope.ddSelectOptionsMatches = [
	    {
	      	text: 'best matches',
	      	value: 'Overall Matches'
	    }, 
	    {
	      	text: 'name',
	      	value: 'Name'
	    }, 
	    {
	      	text: 'location',
	      	value: 'Location'
	    },
	    {
	    	text: 'industry',
	    	value: 'Industry'
	    }
	  ];

	$scope.ddSelectSelectedMatches = {
	    text: "best matches"
	};
	//display matches
	$scope.ddSelectOptionsDisplay = [
	    {
	      	text: 'Display 10',
	      	value: 'Overall Matches'
	    }, 
	    {
	      	text: 'Display 25',
	      	value: 'Display 25'
	    }, 
	    {
	      	text: 'Display 50',
	      	value: 'Display 50'
	    },
	    {
	    	text: 'Display All',
	    	value: 'Display All'
	    }
	  ];

	$scope.ddSelectSelectedDisplay = {
	    text: "Display 10"
	};
	// city dropdown
	$scope.ddSelectOptionsCity = [
	    {
	      	text: 'Any City',
	      	value: 'Any City'
	    }, 
	    {
	      	text: 'New York',
	      	value: 'New York'
	    }, 
	    {
	      	text: 'Washington',
	      	value: 'Washington'
	    }, 
	    {
	      	text: 'Syracuse',
	      	value: 'Syracuse'
	    }
	  ];

	$scope.ddSelectSelectedCity = {
	    text: "Any City"
	};

	// level dropdown
	$scope.ddSelectOptionsLevel = [
	    {
	      	text: 'Any Level',
	      	value: 'Any Level'
	    }, 
	    {
	      	text: 'Acme Level1',
	      	value: 'Acme Level'
	    }, 
	    {
	      	text: 'Acme Level2',
	      	value: 'Acme Level'
	    }
	  ];

	$scope.ddSelectSelectedLevel = {
	    text: "Any Level"
	};

	// tenure dropdown
	$scope.ddSelectOptionsTenure = [
	    {
	      	text: 'Any Tenure',
	      	value: 'Any Tenure'
	    }, 
	    {
	      	text: 'Acme Tenure',
	      	value: 'Acme Tenure'
	    }, 
	    {
	      	text: 'Acme Tenure',
	      	value: 'Acme Tenure'
	    }
	  ];

	$scope.ddSelectSelectedTenure = {
	    text: "Select Current Tenure"
	};

	// Counselees dropdown
	$scope.ddSelectOptionsCounselees = [
	    {
	      	text: '< 5 Counselees',
	      	value: '< 5 Counselees'
	    }, 
	    {
	      	text: '> 10 & < 5 Counselees',
	      	value: '> 10 & < 5 Counselees'
	    }, 
	    {
	      	text: '> 10 Counselees',
	      	value: '> 10 Counselees'
	    }
	  ];

	$scope.ddSelectSelectedCounselees = {
	    text: "< 5 Counselees"
	};

	// Percent dropdown
	$scope.ddSelectOptionsPercent = [
	    {
	      	text: 'Matches with 50% above',
	      	value: 'Matches with 50% above'
	    }, 
	    {
	      	text: 'Matches with 50% below',
	      	value: 'Matches with 50% below'
	    }, 
	    {
	      	text: 'Matches with 75% above',
	      	value: 'Matches with 75% above'
	    }
	  ];

	$scope.ddSelectSelectedPercent = {
	    text: "Matches with 50% above"
	};
})
// login ctrl
.controller('loginCtrl', function($rootScope, $scope, $location, dataSvc) {
	// slides data
    $scope.slidesData = []
    dataSvc.query('data/slidesData.json').then(function (response) {
        $scope.slidesData = response.slidesData;
    }, function (error) {
        console.log(error);
    });

    // login using SSO
    $scope.loginCounselee = function() {
    	$scope.useCredentials = false;
    	$location.path('dashboard-counselee');
    }

    // login using your credentials
    $scope.checkLogin = function(pasRequired, userRequired, email) {
    	console.log(pasRequired +"   " +userRequired)
    	if(pasRequired  && $scope.password === '123') {
    		$scope.invalidPass = false;
    	} else {
    		$scope.invalidPass = true;
    	}

    	if(userRequired && email) {
    		$scope.invalidUsername = false;
    	}else {
    		$scope.invalidUsername = true;
    	}

    	if(!$scope.invalidPass && !$scope.invalidUsername) {
    		if($scope.username === "lee@dinnaco.com" && $scope.password === '123') {
				$location.path('dashboard-counselee');
    		} else if($scope.username === "lor@dinnaco.com" && $scope.password === '123') {
				$location.path('dashboard-counselor');
				$rootScope.showNewCounseleeApp = false;
    		} else if($scope.username === "talent@dinnaco.com" && $scope.password === '123') {
    			$location.path('dashboard-talent');
    		} else if($scope.username === "new@dinnaco.com" && $scope.password === '123') {
    			$location.path('dashboard-counselor');
    			$rootScope.showNewCounseleeApp = true;
    		} else {
    			$scope.invalidUsername = true;
    		}
    		
    	}
    }
    $scope.credentilas = false;
})
// dashboard ctrl
.controller('dashboardCtrl', function($rootScope, $scope, $location, $routeParams, $timeout, dataSvc) {
	$scope.isDashboardPage = true;
	if($routeParams.quizTaken === ':quizTaken') {
		$scope.hideGetStart = true;
	}
	$rootScope.showManagerAssigned = false;
	
	$rootScope.$on('updateProfile', function(e, data) {
		$rootScope.hideGetStart = true;
	})

	if($location.path() === '/dashboard-talent') {
		$scope.isTalentPage = true;
	}

	if($location.path() === '/dashboard-counselee') {
		
	}

	if($location.path() === '/dashboard-counselor') {
		$rootScope.showManagerAssigned = true;
	}

	// show counselor switch modal
	$scope.goToCounselorSwitchStepInfo = function() {
		$scope.showCounselorSwitchModal = true;
	}
	// go to view rank matches
	$scope.goToviewRankMatches = function() {
		$scope.showViewRankMatches = true;
		$scope.hideGetStart = true;
	}
	// go to Opt-In to Switching
	$scope.goToOptINSwicthing = function() {
		$scope.showCounselorSwitchModal = false;
		$scope.showViewRankMatches = false;
		$scope.showMatchingApproval = false;
		$scope.showManagerAssigned = false;

		$scope.hideGetStart = true;
	}
	// go to View and Rank Matches
	$scope.goToViewRankMatches = function() {
		$scope.showCounselorSwitchModal = false;
		$scope.showViewRankMatches = true;
		$scope.showMatchingApproval = false;
		$scope.showManagerAssigned = false;
		
		$scope.hideGetStart = true;
	}
	// go to Wait for Matching Approvals
	var promise;
	$scope.goToWaitApproval = function() {
		$location.path('dashboard-counselee');
		$scope.showCounselorSwitchModal = false;
		$scope.showViewRankMatches = false;
		$rootScope.showMatchingApproval = true;
		$rootScope.showManagerAssigned = false;
		
		$scope.hideGetStart = true;

		
		promise = $timeout(function() {
			$rootScope.showMatchingApproval = false;
			$rootScope.showManagerAssigned = true;
		}, 10000);

	}
	$scope.$on('$locationChangeSuccess', function() {
		
        $rootScope.$emit('backToViewSort', {})
    })
	// go to Profile Updated
	$scope.goToUpdateProfile = function() {
		$rootScope.showMatchingApproval = false;
		$rootScope.showManagerAssigned = false;
		$rootScope.hideEditProfileBtn = false;
		$rootScope.$emit('cancelTimeout', {})
		$location.path('update-profile');
	}
	// go to Profile Updated
	$scope.goToUpdateProfileLor = function() {
		$rootScope.showManagerAssigned = false;
		$rootScope.hideEditProfileBtn = false;
		$rootScope.$emit('cancelTimeout', {})
		$location.path('update-profile-counselor');
	}

	// email checkbox
	$scope.byEmail = true;

	// current and max counselees
	$scope.currentCounselee = 4;
	$scope.maxCounselee = 5;


	//sort matches
	$scope.ddSelectOptionsService = [
	    {
	      	text: 'All Service Lines',
	      	value: 'All Service Lines'
	    }
	  ];

	$scope.ddSelectSelectedService = {
	    text: "All Service Lines"
	};

	// list and grid view
	$scope.layout = 'list';

	// talent pending list data
    $scope.talentData = []
    dataSvc.query('data/talentData.json').then(function (response) {
        $scope.talentData = response.talentData;
    }, function (error) {
        console.log(error);
    });

    // talent outstanding list data
    $scope.talentOutstandingData = []
    dataSvc.query('data/talentOutstandingData.json').then(function (response) {
        $scope.talentOutstandingData = response.talentData;
    }, function (error) {
        console.log(error);
    });

    // talent available list data
    $scope.talentAvailableData = []
    dataSvc.query('data/talentAvailableData.json').then(function (response) {
        $scope.talentAvailableData = response.talentData;
    }, function (error) {
        console.log(error);
    });

    // talent available list data
    $scope.talentMatchesData = []
    dataSvc.query('data/talentMatchesData.json').then(function (response) {
        $scope.talentMatchesData = response.talentData;
    }, function (error) {
        console.log(error);
    });

    // remove counselee
	$scope.removeCounselee = function(arrayObj, item) {
		
		if(arrayObj === 'talentData') {
			var index = $scope.talentData.indexOf(item);
			$scope.talentData.splice(index, 1)
		}
		if(arrayObj === 'talentOutstandingData') {
			var index = $scope.talentOutstandingData.indexOf(item);
			$scope.talentOutstandingData.splice(index, 1)
		}
		if(arrayObj === 'talentAvailableData') {
			var index = $scope.talentAvailableData.indexOf(item);
			$scope.talentAvailableData.splice(index, 1)
		}
		if(arrayObj === 'talentMatchesData') {
			var index = $scope.talentMatchesData.indexOf(item);
			$scope.talentMatchesData.splice(index, 1)
		}
		
	}
	// progress bar data
	$scope.max = 100;
	$scope.pageSize = 10;
	$scope.percentage = function(percent) {
		percent = parseFloat(percent)
        return ((percent/$scope.max)*100).toFixed(1);
    }
    // number of display change
	$scope.displayChange = function(selected) {
		if(selected.text === 'Display 10') {
			$scope.pageSize = 10;
		} else if(selected.text === 'Display 25') {
			$scope.pageSize = 25;
		} else if(selected.text === 'Display 50') {
			$scope.pageSize = 50;
		} else if(selected.text === 'Display All') {
			$scope.pageSize = $scope.matchesData.length;
		}
	}
    //sort matches
	$scope.ddSelectOptionsSort = [
	    {
	      	text: 'best matches',
	      	value: 'Overall Matches'
	    }, 
	    {
	      	text: 'counselor',
	      	value: 'counselor'
	    }, 
	    {
	      	text: 'counselee',
	      	value: 'counselee'
	    }
	  ];

	$scope.ddSelectSelectedSort = {
	    text: "best matches"
	};

    // sort table
	$scope.sortType     = 'percent';
  	$scope.sortReverse  = true;
  	// sort change
	$scope.sortChange = function(selected) {
		if(selected.value === 'Overall Matches') {
			$scope.sortType = 'percent';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'counselor') {
			$scope.sortType = 'counselorFullName';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'counselee') {
			$scope.sortType = 'counseleeFullName';
			$scope.sortReverse = !$scope.sortReverse;
		} 
	}
	// go to profile counselor
	$scope.goProfileCounselor = function() {
		$rootScope.hideEditProfileBtn = true;
		$location.path('update-profile-counselor');
	}

	// my counselees data
    $scope.myCounselees = []
    dataSvc.query('data/myCounselees.json').then(function (response) {
        $scope.myCounselees = response.myCounselees;
        if($rootScope.showNewCounseleeApp) {
	    	console.log($scope.myCounselees.length)
	    	$scope.myCounselees.push(newCounselee);
	    	console.log($scope.myCounselees.length)
	    	$scope.currentCounselee = 5;
	    }
    }, function (error) {
        console.log(error);
    });
    var newCounselee = {
    	firstName: "Kelly",
        lastName: "Clarkson",
        profilePic: "i/user-pics/user_pic_05.jpg"
    }

    // new counselee progress bar
    //progress max value
	$scope.newMax = 100;
	$scope.newCurrent = 63.7;

	$scope.percentage = function() {
        return (($scope.newCurrent/$scope.newMax)*100).toFixed(1);
    }

    $scope.talentType = 'pending';

    // go to profile counselee
	$scope.goProfileCounselee = function() {
		$rootScope.hideEditProfileBtn = true;
		$location.path('update-profile');
	}

	// counselor progress
	$scope.progressOptions = {
		startAngle: -Math.PI/2,
    	thickness: 24,
        value: 1,
        size: 168,
        emptyFill: "rgba(0, 0, 0, 0)",
        fill: { gradient: [['#94c626', 0], ['#0079bc', 0.5], ['#003683', 1]], gradientAngle: -Math.PI/5}
	}
})

// preference quiz ctrl
.controller('preferenceQuizCtrl', function($rootScope, $scope, $location, dataSvc) {
	$scope.isPreferencePage = true;
	$rootScope.showManagerAssigned = false;
	// questions
	$scope.questions = []
	dataSvc.query('data/questionsData.json').then(function (response) {
        $scope.questions = response.questionsData;
        $scope.questionsLength = $scope.questions.length;
		$scope.currentQuestion = $scope.questions[0].question;
		$scope.currentIndex = 0;
    }, function (error) {
        console.log(error);
    });
	

	// select the choice
	$scope.choiceNum = 0;
	$scope.isChoiceNum = function(choiceNum) {
		return $scope.choiceNum === choiceNum;
	}

	$scope.setChoiceNum = function(choiceNum ){
		if($scope.choiceNum === choiceNum) {
			$scope.choiceNum = 0;
			$scope.activateNext = false;
		} else {
			$scope.choiceNum = choiceNum;
			$scope.activateNext = true;
		}
	}

	// next question
	$scope.nextQuestion = function() {
		if($scope.activateNext) {
			
			if($scope.questions[$scope.currentIndex].choiceNum) {
				$scope.setChoiceNum($scope.questions[$scope.currentIndex].choiceNum);
			} else {
				$scope.questions[$scope.currentIndex].choiceNum = $scope.choiceNum;
			}

			if(!$scope.questions[$scope.currentIndex].answered) {
				$scope.questions[$scope.currentIndex].answered = true;
			} else {
				$scope.setChoiceNum($scope.questions[$scope.currentIndex].choiceNum);
			}

			$scope.currentIndex += 1;
			$scope.progress = $scope.currentIndex/20;
			$scope.progress = parseInt($scope.progress*100);
			$scope.progressStyle = {'width': $scope.progress+'%'}

			if($scope.currentIndex < $scope.questions.length) {
				$scope.currentQuestion = $scope.questions[$scope.currentIndex].question;
			} else {
				$location.path('dashboard-counselee/:quizTaken');
			}
			if($scope.currentIndex === $scope.questions.length) {
				$scope.currentIndex -= 1;
			}

			if(!$scope.questions[$scope.currentIndex].answered) {
				$scope.choiceNum = 0;
				$scope.activateNext = false;
			} else {
				$scope.setChoiceNum($scope.questions[$scope.currentIndex].choiceNum);
			}
		}
	}
	var previousStart;
	// previous question
	$scope.prevQuestion = function() {
		previousStart = $scope.currentIndex;
		$scope.currentIndex -= 1;
		$scope.progress = $scope.currentIndex/20;
		$scope.progress = $scope.progress*100;
		$scope.progressStyle = {'width': $scope.progress+'%'}

		$scope.setChoiceNum($scope.questions[$scope.currentIndex].choiceNum);

		if($scope.currentIndex >= 0) {
			$scope.currentQuestion = $scope.questions[$scope.currentIndex].question;
		} else {
			console.log('question begin');
		}
	}
})

// update profile ctrl
.controller('updateProfileCtrl', function($rootScope, $scope, $location, dataSvc) {
	$scope.isProfilePage = true;

	// initial profile data
	$scope.fullName = 'Christina Snow';
	$scope.level = 'Acme Level';
	$scope.service = 'Lorem service line';
	$scope.office = 'Dinnaco, NYC';
	$scope.tenure = 'Acme Tenure';
	$scope.email = 'csnow@dinnaco.com';
	$scope.phone = '1-847-555-5555';
	$scope.project = 'Acme Project';
	$scope.hometown = 'San Francisco, CA';
	$scope.languages = 'English, Spanish';
	$scope.counseleeNum = 4;
	// initial profile data counselor
	$scope.fullNameLor = 'Jackblack Longnamous';
	$scope.levelLor = 'Director';
	$scope.serviceLor = 'Lorem service line';
	$scope.officeLor = 'Dinnaco, NYC';
	$scope.tenureLor = 'Acme Tenure';
	$scope.emailLor = 'csnow@dinnaco.com';
	$scope.phoneLor = '1-847-555-5555';
	$scope.projectLor = 'Acme Project';
	$scope.hometownLor = 'Miami, FL';
	$scope.languagesLor = 'English, Spanish';
	$scope.counseleeNum = 4;

	// hobbies dropdown items
	$scope.hobbiesData = [
		{hobby: 'Interest A'},
		{hobby: 'Interest B'},
		{hobby: 'Interest C'},
		{hobby: 'Hobby A'},
		{hobby: 'Hobby B'},
		{hobby: 'Hobby C'},
		{hobby: 'Hobby D'},
		{hobby: 'Hobby E'}
	]

	$scope.selectedHobbiesData = [];
	for (var i = 0; i <= $scope.hobbiesData.length - 1; i++) {
		$scope.selectedHobbiesData.push($scope.hobbiesData[i].hobby);
	}
	var printSelectedHobbies = function(selectedHobbiesData) {
		for (var i = 0; i <= selectedHobbiesData.length - 1; i++) {
			if(i === 1) {
				$scope.selectedHobbies += ', ' + selectedHobbiesData[i] + ', ';
			} else if(i === 0 || i === selectedHobbiesData.length - 1) {
				$scope.selectedHobbies += selectedHobbiesData[i];
			}
			else {
				$scope.selectedHobbies += selectedHobbiesData[i] + ', ';
			}
		};
	}
	$scope.selectedHobbies = '';
	printSelectedHobbies($scope.selectedHobbiesData);

	$scope.$on('itemSelected', function(e, data) {

		$scope.selectedHobbiesData.push($scope.hobbiesData[data.index].hobby);
		$scope.selectedHobbies = '';
		
		printSelectedHobbies($scope.selectedHobbiesData)
	})
	$scope.$on('itemRemoved', function(e, data) {
		var index = $scope.selectedHobbiesData.indexOf($scope.hobbiesData[data.index].hobby);

		$scope.selectedHobbiesData.splice(index, 1);

		$scope.selectedHobbies = '';
		
		printSelectedHobbies($scope.selectedHobbiesData)
	})

	// go to update profile dashboard
	$scope.goToUpdateProfileDash = function() {
		$scope.hideGetStart = true;
		$rootScope.$emit('updateProfile', {})
		$rootScope.hideGetStart = true;
		$rootScope.showManagerAssigned = false;
		$rootScope.hideEditProfileBtn = false;
		$location.path('dashboard-counselee');
	}
	// go to update profile dashboard
	$scope.goToUpdateProfileDashLor = function() {
		$scope.hideGetStart = true;
		$rootScope.$emit('updateProfile', {})
		$rootScope.hideGetStart = true;
		$rootScope.showManagerAssigned = false;
		$rootScope.showNewCounseleeApp = false;
		$rootScope.hideEditProfileBtn = false;
		$location.path('dashboard-counselor');
	}


	// industry data
	//primary industry
	$scope.ddSelectOptionsPrim = [
	    {
	      	text: 'Industry A',
	      	value: 'Industry A'
	    }, 
	    {
	      	text: 'Industry B',
	      	value: 'Industry B'
	    }, 
	    {
	      	text: 'Industry C',
	      	value: 'Industry C'
	    }
	  ];

	$scope.ddSelectSelectedPrim = {
	    text: "Industry A"
	};
	//secondary industry
	$scope.ddSelectOptionsSec = [
	    {
	      	text: 'Industry A',
	      	value: 'Industry A'
	    }, 
	    {
	      	text: 'Industry B',
	      	value: 'Industry B'
	    }, 
	    {
	      	text: 'Industry C',
	      	value: 'Industry C'
	    }
	  ];

	$scope.ddSelectSelectedSec = {
	    text: "Industry A"
	};

	$scope.industryChange = function(selected) {
		$scope.ddSelectSelectedSec.text = selected.text
	}

})

// view sort matches ctrl
.controller('viewSortMatchesCtrl', function($rootScope, $scope, $location, $timeout, dataSvc) {
	$scope.isViewSortPage = true;
	$rootScope.showManagerAssigned = false;

	$scope.layout = 'list';

	// matches list data
    $scope.matchesData = []
    var matchesDataLength = 0;
    dataSvc.query('data/viewSortMatchesData.json').then(function (response) {
        $scope.matchesData = response.matchesList;
        matchesDataLength = $scope.matchesData.length;
    }, function (error) {
        console.log(error);
    });

	// number of display change
	$scope.displayChange = function(selected) {
		if(selected.text === 'Display 10') {
			$scope.pageSize = 10;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()}
            }, 10)
		} else if(selected.text === 'Display 25') {
			$scope.pageSize = 25;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		} else if(selected.text === 'Display 50') {
			$scope.pageSize = 50;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		} else if(selected.text === 'Display All') {
			$scope.pageSize = $scope.matchesData.length;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		}
	}

    // page size
    $scope.pageSize = 10;

    //progress max value
	$scope.max = 100;
	$scope.current = 72.5;

	$scope.percentage = function(percent) {
		percent = parseFloat(percent)
        return ((percent/$scope.max)*100).toFixed(1);
    }

    //--- filters ----//
    $scope.sameIndustry = true;
    $scope.filterCity = '';
    $scope.filterLevel = '';
    $scope.filterCounselee1 = 0;
    $scope.filterCounselee2 = 0;
    $scope.filterMatches = 0;
    $scope.filterMatchesSign = '';

    // city and level filter
    var cityFilter = ''
    $scope.filterCityChange = function(selected) {

    	if(selected.text === "New York") {
    		cityFilter = 'New York';
    	} else if(selected.text === "Washington") {
    		cityFilter = 'Washington';
    	} else if(selected.text === "Syracuse") {
    		cityFilter = 'Syracuse';
    	} else if(selected.text === "Any City") {
    		cityFilter = '';
    	}

    	return cityFilter;
    }
    // level filter
    var levelFilter = ''
    $scope.filterLevelChange = function(selected) {

    	if(selected.text === "Acme Level1") {
    		levelFilter = 'Acme Position1';
    	} else if(selected.text === "Acme Level2") {
    		levelFilter = 'Acme Position2';
    	} else if(selected.text === "Any Level") {
    		levelFilter = '';
    	}

    	return levelFilter;

    }
    // counselee filter
    var filterCounselee = {};
    $scope.filterCounseleeChange = function(selected) {
    	
    	var filterCounselee1 = 0;
    	var filterCounselee2 = 0;
    	if(selected.text === "< 5 Counselees") {
    		filterCounselee1 = 0;
    		filterCounselee2 = 5;
    	} else if(selected.text === "> 10 & < 5 Counselees") {
    		filterCounselee1 = 5;
    		filterCounselee2 = 10;
    	} else if(selected.text === "> 10 Counselees") {
    		filterCounselee1 = 10;
    		filterCounselee2 = 99;
    	}
    	filterCounselee.counselee1 = filterCounselee1;
    	filterCounselee.counselee2 = filterCounselee2;

    	return filterCounselee;
    }

    // matches filter
    var matchesFilter = {};
    $scope.filterMatchesChange = function(selected) {
    	
    	var filterMatches = 0;
    	var filterMatchesSign = '';
    	if(selected.text === "Matches with 50% above") {
    		filterMatches = 50;
    		filterMatchesSign =  'above';
    	} else if(selected.text === "Matches with 50% below") {
    		filterMatches = 50;
    		filterMatchesSign =  'below';
    	} else if(selected.text === "Matches with 75% above") {
    		filterMatches = 75;
    		filterMatchesSign =  'above';
    	}

    	matchesFilter.filterMatches = filterMatches;
    	matchesFilter.filterMatchesSign = filterMatchesSign;

    	return matchesFilter;
    }

    // apply filter
    $scope.applyFilter = function() {
    	// $scope.showFilter = false;
    	if(cityFilter != undefined) {
    		$scope.filterCity = cityFilter;
    	}
    	if(levelFilter != undefined) {
    		$scope.filterLevel = levelFilter;
    	}
    	if(filterCounselee.counselee1 != undefined && filterCounselee.counselee2 != undefined) {
    		$scope.filterCounselee1 = filterCounselee.counselee1;
    		$scope.filterCounselee2 = filterCounselee.counselee2;
    	}
    	if(matchesFilter.filterMatches != undefined && matchesFilter.filterMatchesSign != undefined) {
    		$scope.filterMatchesSign = matchesFilter.filterMatchesSign;
    		$scope.filterMatches = matchesFilter.filterMatches;
    	}
    }

    // reset filter
    $scope.resetFilter = function() {
    	$scope.ddSelectSelectedCity = {
		    text: "Any City"
		};
		$scope.ddSelectSelectedLevel = {
		    text: "Any Level"
		};
		$scope.ddSelectSelectedTenure = {
		    text: "Select Current Tenure"
		};
		$scope.ddSelectSelectedCounselees = {
		    text: "< 5 Counselees"
		};
		$scope.ddSelectSelectedPercent = {
		    text: "Matches with 50% above"
		};
		cityFilter = '';
		levelFilter = '';
		filterCounselee = {};
		matchesFilter = {};
		$scope.filterCity = '';
	    $scope.filterLevel = '';
	    $scope.filterCounselee1 = 0;
	    $scope.filterCounselee2 = 0;
	    $scope.filterMatches = 0;
	    $scope.filterMatchesSign = '';

	    $scope.sameIndustry = false;
	    $scope.sameCity = false;
    }

    
	// go to matching approval page
	var promise;
	$scope.goToMatchingApproval = function() {
		$rootScope.hideGetStart = true;
		$rootScope.showMatchingApproval = true;
		
		$location.path('dashboard-counselee');
		
		promise = $timeout(function() {
			$rootScope.showMatchingApproval = false;
			$rootScope.showManagerAssigned = true;
		}, 10000);

		$rootScope.$on('cancelTimeout', function(e, data) {
			$timeout.cancel(promise);
		})
	}
	$rootScope.$on('backToViewSort', function() {
        $timeout.cancel(promise);
    })

	// counselor selections
	$scope.selectedCounselor = [];
	$scope.addCounselor = function(item) {
		var index = $scope.matchesData.indexOf(item);

		if($scope.selectedCounselor.length < 5) {
			$scope.matchesData[index].selected = !$scope.matchesData[index].selected;
			if($scope.matchesData[index].selected) {
				$scope.selectedCounselor.push($scope.matchesData[index]);
			} else {
				var sIndex = $scope.selectedCounselor.indexOf($scope.matchesData[index]);
				$scope.selectedCounselor.splice(sIndex, 1);
			}
		} else {
			if($scope.matchesData[index].selected) {
				$scope.matchesData[index].selected = !$scope.matchesData[index].selected;
				var sIndex = $scope.selectedCounselor.indexOf($scope.matchesData[index]);
				$scope.selectedCounselor.splice(sIndex, 1);
			}
		}
		if($scope.selectedCounselor.length >= 1) {
			$scope.showCounsleorList = true;
		} else {
			$scope.showCounsleorList = false;
		}
	}

	// ranking counselor
	$scope.rankCounselor = function(index, upDown) {
		if(upDown === 'up') {
			var temp = $scope.selectedCounselor[index]
			$scope.selectedCounselor.splice(index, 1);
			console.log()
			var upIndex = index-1;
			$scope.selectedCounselor.splice(upIndex, 0, temp);
		}
		if(upDown === 'down') {
			var temp = $scope.selectedCounselor[index]
			$scope.selectedCounselor.splice(index, 1);
			var upIndex = index+1;
			$scope.selectedCounselor.splice(upIndex, 0, temp);
		}
	}

	// sort table
	$scope.sortType     = 'percent';
  	$scope.sortReverse  = true;
  	// sort change
	$scope.sortChange = function(selected) {
		if(selected.value === 'Overall Matches') {
			$scope.sortType = 'percent';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Name') {
			$scope.sortType = 'fullName';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Location') {
			$scope.sortType = 'city';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Industry') {
			$scope.sortType = 'industry';
			$scope.sortReverse = !$scope.sortReverse;
		}
	}

	// go to profile counselee
	$scope.goProfileCounselee = function() {
		$rootScope.hideEditProfileBtn = true;
		$location.path('update-profile');
	}
})

// export review ctrl
.controller('exportPreviewCtrl', function($rootScope, $scope, $location, $timeout, $window, dataSvc) {
	$scope.isExportPage = true;

	$scope.exportHeaders = [
		'Counselor Name',
		'Counselee Name',
		'Status Name',
		'Counselor Position',
		'Counselee Position',
		'Counselor Location',
		'Counselee Location',
		'Counselor Industry',
		'Counselee Industry',
		'Counselor Industry1',
		'Counselee Industry2',
		'Counselor Industry3'
	]

	// export preview data
    $scope.exportData = []
    dataSvc.query('data/exportData.json').then(function (response) {
        $scope.exportData = response.exportData;
    }, function (error) {
        console.log(error);
    });

    // export table options
    $scope.options = {
    	reactive: true,
    	width: 1240,
    	height: 740
    }

    if($window.innerHeight < 900) {
    	var tableHeight = $window.innerHeight - 175;
	    $scope.options = {
	    	reactive: true,
	    	width: 1240,
	    	height: tableHeight
	    }
    }

    // rebuild the scrollbar
  	$scope.$broadcast('rebuild:me');
})

// review request ctrl
.controller('reviewRequestCtrl', function($rootScope, $scope, $location, $timeout, dataSvc) {
	$scope.isReviewRequestPage = true;

	$scope.layout = 'list';

	// export preview data
    $scope.reviewRequestData = []
    dataSvc.query('data/reviewRequestData.json').then(function (response) {
        $scope.reviewRequestData = response.reviewRequestData;
    }, function (error) {
        console.log(error);
    });

    // page size
    $scope.pageSize = 10;

    //progress max value
	$scope.max = 100;
	$scope.current = 72.5;

	$scope.percentage = function(percent) {
		percent = parseFloat(percent)
        return ((percent/$scope.max)*100).toFixed(1);
    }

    // number of display change
	$scope.displayChange = function(selected) {
		if(selected.text === 'Display 10') {
			$scope.pageSize = 10;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()}
            }, 10)
		} else if(selected.text === 'Display 25') {
			$scope.pageSize = 25;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		} else if(selected.text === 'Display 50') {
			$scope.pageSize = 50;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		} else if(selected.text === 'Display All') {
			$scope.pageSize = $scope.matchesData.length;
			$timeout(function() {
                $scope.bgHeight = {'height': $('.view-left-side-col').innerHeight()+20}
            }, 10)
		}
	}

	// go to profile counselor
	$scope.goProfileCounselor = function() {
		$rootScope.hideEditProfileBtn = true;
		$location.path('update-profile-counselor');
	}

	// remove counselee
	$scope.removeCounselee = function(item) {
		var index = $scope.reviewRequestData.indexOf(item);
		$scope.reviewRequestData.splice(index, 1)
	}

	// sort table
	$scope.sortType     = 'percent';
  	$scope.sortReverse  = true;
  	// sort change
	$scope.sortChange = function(selected) {
		if(selected.value === 'Overall Matches') {
			$scope.sortType = 'percent';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Name') {
			$scope.sortType = 'fullName';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Location') {
			$scope.sortType = 'city';
			$scope.sortReverse = !$scope.sortReverse;
		} else if(selected.value === 'Industry') {
			$scope.sortType = 'industry';
			$scope.sortReverse = !$scope.sortReverse;
		}
	}

	//--- filters ----//
    $scope.sameIndustry = true;
    $scope.filterCity = '';
    $scope.filterLevel = '';
    $scope.filterCounselee1 = 0;
    $scope.filterCounselee2 = 0;
    $scope.filterMatches = 0;
    $scope.filterMatchesSign = '';

    // city and level filter
    var cityFilter = ''
    $scope.filterCityChange = function(selected) {

    	if(selected.text === "New York") {
    		cityFilter = 'New York';
    	} else if(selected.text === "Washington") {
    		cityFilter = 'Washington';
    	} else if(selected.text === "Syracuse") {
    		cityFilter = 'Syracuse';
    	} else if(selected.text === "Any City") {
    		cityFilter = '';
    	}

    	return cityFilter;
    }
    // level filter
    var levelFilter = ''
    $scope.filterLevelChange = function(selected) {

    	if(selected.text === "Acme Level1") {
    		levelFilter = 'Acme Position1';
    	} else if(selected.text === "Acme Level2") {
    		levelFilter = 'Acme Position2';
    	} else if(selected.text === "Any Level") {
    		levelFilter = '';
    	}

    	return levelFilter;

    }
    // counselee filter
    var filterCounselee = {};
    $scope.filterCounseleeChange = function(selected) {
    	
    	var filterCounselee1 = 0;
    	var filterCounselee2 = 0;
    	if(selected.text === "< 5 Counselees") {
    		filterCounselee1 = 0;
    		filterCounselee2 = 5;
    	} else if(selected.text === "> 10 & < 5 Counselees") {
    		filterCounselee1 = 5;
    		filterCounselee2 = 10;
    	} else if(selected.text === "> 10 Counselees") {
    		filterCounselee1 = 10;
    		filterCounselee2 = 99;
    	}
    	filterCounselee.counselee1 = filterCounselee1;
    	filterCounselee.counselee2 = filterCounselee2;

    	return filterCounselee;
    }

    // matches filter
    var matchesFilter = {};
    $scope.filterMatchesChange = function(selected) {
    	
    	var filterMatches = 0;
    	var filterMatchesSign = '';
    	if(selected.text === "Matches with 50% above") {
    		filterMatches = 50;
    		filterMatchesSign =  'above';
    	} else if(selected.text === "Matches with 50% below") {
    		filterMatches = 50;
    		filterMatchesSign =  'below';
    	} else if(selected.text === "Matches with 75% above") {
    		filterMatches = 75;
    		filterMatchesSign =  'above';
    	}

    	matchesFilter.filterMatches = filterMatches;
    	matchesFilter.filterMatchesSign = filterMatchesSign;

    	return matchesFilter;
    }

    // apply filter
    $scope.applyFilter = function() {
    	// $scope.showFilter = false;
    	if(cityFilter != undefined) {
    		$scope.filterCity = cityFilter;
    	}
    	if(levelFilter != undefined) {
    		$scope.filterLevel = levelFilter;
    	}
    	if(filterCounselee.counselee1 != undefined && filterCounselee.counselee2 != undefined) {
    		$scope.filterCounselee1 = filterCounselee.counselee1;
    		$scope.filterCounselee2 = filterCounselee.counselee2;
    	}
    	if(matchesFilter.filterMatches != undefined && matchesFilter.filterMatchesSign != undefined) {
    		$scope.filterMatchesSign = matchesFilter.filterMatchesSign;
    		$scope.filterMatches = matchesFilter.filterMatches;
    	}
    }

    
    // reset filter
    $scope.resetFilter = function() {
    	$scope.ddSelectSelectedCity = {
		    text: "Any City"
		};
		$scope.ddSelectSelectedLevel = {
		    text: "Any Level"
		};
		$scope.ddSelectSelectedTenure = {
		    text: "Select Current Tenure"
		};
		$scope.ddSelectSelectedCounselees = {
		    text: "< 5 Counselees"
		};
		$scope.ddSelectSelectedPercent = {
		    text: "Matches with 50% above"
		};
		cityFilter = '';
		levelFilter = '';
		filterCounselee = {};
		matchesFilter = {};
		$scope.filterCity = '';
	    $scope.filterLevel = '';
	    $scope.filterCounselee1 = 0;
	    $scope.filterCounselee2 = 0;
	    $scope.filterMatches = 0;
	    $scope.filterMatchesSign = '';

	    $scope.sameIndustry = false;
	    $scope.sameCity = false;
    }
})


