	    document.getElementById("myDiv").style.display = "block";
		var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec";

		fetch(link).then(res => res.json())
			.then((data) => {
                console.log(data);
                

                $('#location').append('<option ></option>');
				jQuery.each(data, function (id) {
               
                    if(data[id].status === true)
                    {
						$('#location').append('<option value="' + data[id].building_name + "-" + data[id].code + "-" + data[id].building_address + "-" + data[id].lat + "-" + data[id].long + '"-"'+data[id].google_map  +'">' + data[id].building_name + '</option>');
                    }
				});
				document.getElementById("myDiv").style.display = "none";

			})
			.catch(err => { throw err });


		var timeOptions = ["7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
			"9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
			"11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
			"1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
			"3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
			"5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
			"7:00 PM"];

		var timeOptions24hr = ['7:00', '7:30', '8:00', '8:30',
			'9:00', '9:30', '10:00', '10:30',
			'11:00', '11:30', '12:00', '12:30',
			'13:00', '13:30', '14:00', '14:30',
			'15:00', '15:30', '16:00', '16:30',
			'17:00', '17:30', '18:00', '18:30',
			'19:00'];
		for (var i = 0; i < timeOptions.length; i++) {
			// console.log(timeOptions[i]);
			$('#preffered_time').append('<option value="' + timeOptions[i] + '">' + timeOptions[i] + '</option>');
		}

		function change_time(value) {
			$('#preffered_time').val(''); 
			var currentDate = new Date($.now());
			var getM = (String(currentDate.getMonth() + 1).length < 2) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
			var getD = (String(currentDate.getDate()).length < 2) ? '0' + (currentDate.getDate()) : currentDate.getDate();
			var curDate = currentDate.getFullYear() + '-' + getM + '-' + getD;

			function timeToSeconds(time) {
				time = time.split(/:/);
				return time[0] * 3600 + time[1] * 60 + time[2];
			}

			if (value == curDate) {

				for (var i = 0; i < timeOptions.length + 4; i++) {

					if ((new Date(curDate + ' ' + timeOptions24hr[i]).getTime()) < (d.getTime())) {
						$("#preffered_time option[value=\'" + timeOptions[i] + "\']").hide();

					} else {
						break;
					}
				}
			} 
			else {
				for (var i = 0; i < timeOptions.length + 4; i++) {
					$("#preffered_time option[value=\'" + timeOptions[i] + "\']").show();
				}
			}
        }
        
        var mapD;
        const params = new URLSearchParams(document.location.search);
        if (params.get("name"))
        {
            document.getElementById("name").readOnly = true;
            document.getElementById("email").readOnly = true;
            document.getElementById("mobile_number").readOnly = true;
            document.getElementById("name").value = params.get("name");
            document.getElementById("email").value = params.get("email");
            document.getElementById("mobile_number").value = params.get("contact_number");
        }
        var today = new Date();
        document.getElementById("preffered_date").min = formatDate(today);


        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        // alert(formatDate(today));
        //        getting current time
        var d = new Date();
        var hours = d.getHours();
        var minutes = (String(d.getMinutes()).length < 2) ? '0' + d.getMinutes() : d.getMinutes();
        var ampm = (hours >= 12) ? 'PM' : 'AM';
        hours = ((hours % 12) == 0) ? '12' : hours % 12;
        var curTime = hours + ':' + minutes + ' ' + ampm;
        // alert(curTime);


        function find_location(value) {
            var result = value.split("-");
            myMap(result[3], result[4]);
            // var res = str.link("https://www.google.com/maps/dir//"+result[3]+","+result[4]+"/@"+result[0]+","+result[4]+",20z?hl=en-US");
            document.getElementById("link").href = "https://www.google.com/maps/dir//" + result[3] + "," + result[4] + "/@" + result[0] + ",20z?hl=en-US";
            document.getElementById("building_address").innerHTML = result[2];

            // alert( result[3]);
            // initMap(result[3], result[4]);
        }

        function submit_visit() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var mobile_number = document.getElementById("mobile_number").value;
            var preffered_date = document.getElementById("preffered_date").value;
            var preffered_time = document.getElementById("preffered_time").value;
            var location = document.getElementById("location").value;
            var result = location.split("-");
            var link = "https://script.google.com/macros/s/AKfycbwn2DO770FAgfjUKUgijQ2bGoHDHb84zaHb32JwGovQG2FylzhBP0aq/exec?code=" + result[1] + "&name=" + name + "&email=" + email + "&preffered_tour_date=" + preffered_date + "&preffered_tour_time=" + preffered_time + "&contact_number=" + mobile_number + "&pref_location="+ result[0]+"&maplink="+result[5];

            fetch(link).then(res => res.json())
                .then((data) => {
                    document.getElementById("myDiv").style.display = "block";
                    // console.log(data.results[0]);
                    // alert("Success -> " + data)
                    document.getElementById("myDiv").style.display = "none";
                    document.getElementById('success').style.display = 'block';
                    document.getElementById("code").innerHTML = data;

                    document.getElementById("form").reset();
                    // console.log(data);


                })
                .catch(err => { throw err });
            document.getElementById("myDiv").style.display = "block";
            console.log(link);
            return false;

        }
        function myMap(lat, lang) {
            var iconbase = 'images/assets/map-marker-mini.png';
            if (lat) {
                var latD = parseFloat(lat);
                var lngD = parseFloat(lang);
                // alert(latD);
                // var mapCanvasD = document.getElementById("mapD");
                centerMap(latD,lngD);
                // var mapOptionsD = {
                // 	center: new google.maps.LatLng(latD, lngD),
                // 	zoom: 16,
                // 	scrollwheel: false
                // };
                //  mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
                var markerD = new google.maps.Marker({
                    position: new google.maps.LatLng(latD, lngD),
                    map: mapD,
                });
            }
            else {
                var latD = 14.560067;
                var lngD = 121.045951;
                var mapCanvasD = document.getElementById("mapD");
                var mapOptionsD = {
                    center: new google.maps.LatLng(latD, lngD),
                    zoom: 15,
                    scrollwheel: false
                };
                 mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
                // var markerD = new google.maps.Marker({
                //     position: new google.maps.LatLng(latD, lngD),
                //     map: mapD,
                // });
            }

        }
        function centerMap(latD,lngD) {
            mapD.panTo({"lat":latD,"lng":lngD});
        }
    
        