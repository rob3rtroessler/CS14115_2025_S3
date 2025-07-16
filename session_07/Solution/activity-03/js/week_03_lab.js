
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering();

function dataFiltering() {
	let attractions = attractionData;

	console.log('data filtering triggered')
	console.log(attractions)

	let attractionType = document.getElementById('attraction-category').value
	console.log(attractionType)

	// filter by selected attraction type
	let filteredData = attractions.filter(function (data, index){

		if(attractionType === 'all'){
			return true
		} else {
			return data.Category === attractionType
		}
	})

	let sortedData = filteredData.sort(function (a,b){
		return b.Visitors - a.Visitors
	})

	let topFive = sortedData.filter(function (data, index){
		return index < 5
	})

	renderBarChart(topFive)
}