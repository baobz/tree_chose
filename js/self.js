app.controller('cityCtrl', ['$scope','CityData',function($scope,CityData) {
	var vm = $scope.vm = {};
	vm.countries = CityData;
	
	//改变国家的选中状态
	vm.countryChanged = function(country) {
		angular.forEach(country.provinces, function(province, index) {
			province.checked = country.checked;
			angular.forEach(province.cities, function(city, index) {
				city.checked = country.checked;
			})
		})
		
	}
	
	
	var cityCheck = [];
	var provinceCheck = [];
	var countryCheck = [];
	//改变省份状态
	vm.provinceChanged = function(province,country) {
		angular.forEach(province.cities, function(city, index) {
			city.checked = province.checked;
			cityCheck = [];
		})
		
		//需要解决上级节点被选中
		angular.forEach(province, function(property, index) {
//			console.log(province);
			if(index == 'checked') {
				if(province.checked) {
					provinceCheck.push(1);
					console.log(provinceCheck);
				} else {
					provinceCheck.pop(1);
				}
			}
			console.log(cityCheck);
			
			(function(provinceCheck){
				if(provinceCheck.length == country.provinces.length) {
					country.checked = province.checked;
					provinceCheck.splice(0);
				} else {
					country.checked = false;
				}
			})(provinceCheck);
		})
		
	}
	
	//改变城市选择状态
	
	vm.cityChanged = function(city,province,country) {
//		console.log(province.cities.length);
//		console.log(city);
		angular.forEach(city, function(property, index) {
			if(index == 'checked') {
				if(city.checked) {
					cityCheck.push(1);
				} else {
					cityCheck.pop(1);
				}
			}
			console.log(cityCheck);
			
			(function(cityCheck){
				if(cityCheck.length == province.cities.length) {
					province.checked = city.checked;
					provinceCheck.push(1);
					cityCheck.splice(0);
					
					if(provinceCheck.length == country.provinces.length) {
						country.checked = province.checked;
						provinceCheck.splice(0);
					} else {
						country.checked = false;
					}
				} else {
					province.checked = false;
					country.checked = false;
				}
			})(cityCheck);

		})
	}
	
}])
