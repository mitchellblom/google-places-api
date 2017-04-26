$(document).ready(function(){

const apiKey = '';								// key goes here

	$('body').on('click', 'li', (e) => {
		loadPlaces(e.target.innerHTML).then((data) => {
			results = data.results;
				writePlaceToDom(results);
			})
		.catch((error) => {
			console.log(error);
		})
	});

	$('body').on('click', '.place', (e) => {
		let place_id = e.target.id;
		loadDetail(place_id).then((result) => {
			writeAddressToDom(result.formatted_address);
		});
	});

	const loadDetail = (place_id) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?
				placeid=${place_id}&key=${apiKey}
			`)
			.done((data) => {
				resolve(data.result)		// this result is getting back to line 17 for the then()
			})
			.fail((error) => {
				reject(error)
			});
		});
	};

	const loadPlaces = (dropdownType) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/
				json?location=36.174465,-86.767960&radius=50000&type=${dropdownType}&key=${apiKey}
				`)
				.done((data) => resolve(data))
				.fail((error) => reject(error));
		});
	};

	const writeAddressToDom = (address) => {
			let string = `<div>${address}</div>`;
			$('#address-div').html(string);
	}

	const writePlaceToDom = (placeName) => {
		placeName.forEach((each) => {
			let string = `<a href="#"><div id='${each.place_id}' class='place'>${each.name}</div></a>`;

		// let string = ""									// alternative using for loop instead of forEach
		// for (let i = 0; i < placeName.length; i++) {
		// 	string += `<a href="#"><div id='${each.place_id}' class='place'>${each.name}</div></a>`;
		// }

			$('#name-div').append(string);

		});
	}


});