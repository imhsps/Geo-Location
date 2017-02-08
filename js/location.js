function updateLocationDetails(data) {
	var now = new Date();
	
	$("#location_query").html(data.query);
	$("#location_country").html(data.country);
	$("#location_regionName").html(data.regionName);
	$("#location_city").html(data.city);
	$("#location_timezone").html(data.timezone);
	$("#location_lat").html(data.lat);
	$("#location_lon").html(data.lon);
	
	buildMap(data.lat,data.lon);

	$("#location_info").html("Data from ISP " + data.isp + " at " + now);
	
	if (data.query && data.isp) {
		showContent();
		$("#mainScreen").removeClass("makeBig");
	} else if (!data.isp) {
		$("#mainScreen").removeClass("makeBig");
		$("#myDataScreen").hide();
		$("#noData").fadeIn();
		$("#noDataInfo").html("Sorry. The URL you provided is not active or not valid.");
	}
}

function buildMap(lat,lon) {
	$("#location_img").attr("src","http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAjh0Pdk6dasNa6f58zkd86cOrtNxbHQHE&center=" + lat + "," + lon + "&zoom=10&format=jpg&size=700x200&language=en&scale=2");
}

function getMyLocation() {
	resetData();
	$("#location_title").html("My Location Info");
	$.ajax({
		type: 'GET',
		url: 'http://ip-api.com/json/',
		success: function (response) {
			updateLocationDetails(response);
		}
	});
}

function getURLLocation() {
	var urlFromForm = $("#urlLink").val();
	var pattern = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
	if (!pattern.test(urlFromForm)) {
		$("#mainScreen").removeClass("makeBig");
		$("#myDataScreen").hide();
		$("#noData").fadeIn();
		$("#noDataInfo").html("Sorry. The URL you provided is not valid.<br>Please try with a new link.");
	} else {
		resetData();
		$("#location_title").html("About " + urlFromForm);
		$.ajax({
			type: 'GET',
			url: 'http://ip-api.com/json/' + urlFromForm,
			success: function (response) {
				updateLocationDetails(response);
			}
		});
	}
}


function showContent() {
	$("#myDataScreen").fadeIn();
	$("#resetArea").css("opacity","1");
}

function resetData() {
	$("#myDataScreen").hide();
	$("#noData").hide();
	updateLocationDetails({
		query: "",
		country: "",
		regionName: "",
		city: "",
		timezone: "",
		lat: "",
		lon: "",
		isp: "0"
	});
}


function initializePage() {
	$("#mainScreen").addClass("makeBig");
	$("#resetArea").css("opacity","0.5");
	resetData();
}

$(document).ready(function () {
	initializePage();
});
