	    document.getElementById("myDiv").style.display = "block";
		var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec";

		fetch(link).then(res => res.json())
			.then((data) => {
                // console.log(data);
                

                $('#location').append('<option ></option>');
				jQuery.each(data, function (id) {
               
                    if(data[id].status === true)
                    {
						$('#location').append('<option value="' + data[id].building_name + "-" + data[id].code + "-" + data[id].building_address + "-" + data[id].lat + "-" + data[id].long + "-"+data[id].google_map  +"-"+data[id].building_id +'">' + data[id].building_name + '</option>');
                    }
				});
                
                document.getElementById("myDiv").style.display = "none";

			})
			.catch(err => { throw err });
    var timeOptions = [];
    var timeOptions24hr = [];
    document.getElementById("myDiv").style.display = "block";
    var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec?page=get_time";

    fetch(link).then(res => res.json())
        .then((data) => {
            console.log(data);
            document.getElementById("myDiv").style.display = "none";
            var a = 0;
            jQuery.each(data, function (id) {
                var id_time = data[id].time;
                id_time = id_time.replace(" ","");
                        $('#preffered_time').append('<option id="t_'+id_time+'" value="' + data[id].id + '">' + data[id].time + '</option>');

                timeOptions[a] = data[id].time;
                timeOptions24hr[a] = data[id].mil_time;
                a++;
            });

        })
        .catch(err => { throw err });
        
            console.log(timeOptions);
		function change_time(value) 
        {
			$('#preffered_time').val(''); 
            $('#preffered_time').children().show();
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
                    // console.log(timeOptions[i]);
					if ((new Date(curDate + ' ' + timeOptions24hr[i]).getTime()) < (d.getTime())) {
                        // alert(timeOptions[i]);
                      
                        var t = timeOptions[i];
                        t = "t_"+t.replace(" ","");
                        document.getElementById(t).style.display = 'none';

					} else {
						break;
					}
				}
			} 
            var location = document.getElementById("location").value;
            if(location != "")
            {
                var res = location.split("-");
                var loc = res[6];
                
            document.getElementById("myDiv").style.display = "block";
                var preffered_date = document.getElementById("preffered_date").value;
                var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec?page=get_scheduled&search="+preffered_date+"&building_code="+loc;
                fetch(link).then(res => res.json())
                .then((data) => {
                    // console.log(data);
                    jQuery.each(data, function (id) {
                        $("#preffered_time option[value=\'" + data[id] + "\']").hide();
                    });
                    document.getElementById("myDiv").style.display = "none";
    
                })
                .catch(err => { throw err });
            }
            


        }
        function change_location_point() 
        {
			$('#preffered_time').val(''); 
            $('#preffered_time').children().show();
            var preffered_date = document.getElementById("preffered_date").value;
			var currentDate = new Date($.now());
			var getM = (String(currentDate.getMonth() + 1).length < 2) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
			var getD = (String(currentDate.getDate()).length < 2) ? '0' + (currentDate.getDate()) : currentDate.getDate();
			var curDate = currentDate.getFullYear() + '-' + getM + '-' + getD;

			function timeToSeconds(time) {
				time = time.split(/:/);
				return time[0] * 3600 + time[1] * 60 + time[2];
			}

			if (preffered_date == curDate) {

                for (var i = 0; i < timeOptions.length + 4; i++) {
                    // console.log(timeOptions[i]);
					if ((new Date(curDate + ' ' + timeOptions24hr[i]).getTime()) < (d.getTime())) {
                    
                        var t = timeOptions[i];
                        t = "t_"+t.replace(" ","");
                        document.getElementById(t).style.display = 'none';

					} else {
						break;
					}
				}
			} 
		
            var location = document.getElementById("location").value;
            
            var res = location.split("-");
            var loc = res[6];
       
            if(preffered_date != "")
            {
                
                document.getElementById("myDiv").style.display = "block";
                var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec?page=get_scheduled&search="+preffered_date+"&building_code="+loc;
                fetch(link).then(res => res.json())
                .then((data) => {
                    // console.log(data);
                    jQuery.each(data, function (id) {
                        $("#preffered_time option[value=\'" + data[id] + "\']").hide();
                    });
                    document.getElementById("myDiv").style.display = "none";

                })
                .catch(err => { throw err });
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

            
            document.getElementById("user_id").value = params.get("user_id");
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
            var user_id = document.getElementById("user_id").value;
            var result = location.split("-");
            var link = "https://script.google.com/macros/s/AKfycbwn2DO770FAgfjUKUgijQ2bGoHDHb84zaHb32JwGovQG2FylzhBP0aq/exec?code=" + result[1] + "&name=" + name + "&email=" + email + "&preffered_tour_date=" + preffered_date + "&preffered_tour_time=" + preffered_time + "&contact_number=" + mobile_number + "&pref_location="+ result[0]+"&maplink="+result[5]+"&user_id="+user_id+"&building_id="+result[6];

            fetch(link).then(res => res.json())
                .then((data) => {
                    if(data == "Please select another schedule.")
                    {
  
                        document.getElementById("myDiv").style.display = "none";
                        document.getElementById('select_another_time').style.display = 'block';
                        document.getElementById("error").innerHTML = data;
                    }
                    else
                    {
                        
                        document.getElementById("myDiv").style.display = "none";
                        document.getElementById('success').style.display = 'block';
                        document.getElementById("code").innerHTML = data;
    
                        document.getElementById("form").reset();
                    }
                  
                    // console.log(data);


                })
                .catch(err => { throw err });
            document.getElementById("myDiv").style.display = "block";
            // console.log(link);
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
    
        
        
      