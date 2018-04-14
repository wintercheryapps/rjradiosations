function showExistingValues() {

  $.getJSON("test.json", function(json) {
    $.each(json, function(index, value) {
      console.log(value.color);
    });
  });
}

function doValidation(value_passed) {
  $(document).ready(function() {
    $.getJSON("data/parse_value.json", function(json) {
      $.each(json, function(index, value) {
        try {
          var descrypt = GibberishAES.dec(value, value_passed);
          localStorage.setItem('pass_code', value_passed);
          localStorage.setItem('ency_text', value);
          window.location = "stations_editor.html";
        } catch (error) {
          console.error(error);
          var div_hide = document.getElementById("wrong_passcode");
          div_hide.style.display = 'inline';
        }
      });
    });
  });
}

function validatePassCode() {
  $(document).ready(function() {
    var passed_code = localStorage.getItem("pass_code");
    var enc_text = localStorage.getItem("ency_text");
    try {
      var descrypt = GibberishAES.dec(enc_text, passed_code);
      var table_existing = document.getElementById("station_details");
      var mainRow = table_existing.insertRow(0);
      var idR = mainRow.insertCell(0);
      idR.innerHTML = "ID";

      var idR = mainRow.insertCell(1);
      idR.innerHTML = "Name";

      var idR = mainRow.insertCell(2);
      idR.innerHTML = "Round Url";

      var idR = mainRow.insertCell(3);
      idR.innerHTML = "Square Url";

      var idR = mainRow.insertCell(4);
      idR.innerHTML = "Stream Url";

      var idR = mainRow.insertCell(5);
      idR.innerHTML = "Color";

      var idR = mainRow.insertCell(6);
      idR.innerHTML = "Tags";


      // var urlName = "data/malayalam.json";
      var urlName = "https://wintercheryapps.github.io/rjradiosations/stations/Malayalam.json";

      $.getJSON(urlName, function(json) {
        $.each(json, function(index, value) {
          index = index + 1;
          var row = table_existing.insertRow(index);
          var i;
          for (i = 0; i < 7; i++) {
            var cell = row.insertCell(i);
            cell.innerHTML = getValueFromJson(i, value);
          }
          console.log(value.station_name);
        });
      });

    } catch (error) {
      console.error(error);
      window.location = "error_editor.html";
    }
  });
}

function getValueFromJson(index, value) {
  if (index == 0) {
    return value.station_id;
  } else if (index == 1) {
    return value.station_name;
  } else if (index == 2) {
    return value.station_img_url;
  } else if (index == 3) {
    return value.station_img_url_square;
  } else if (index == 4) {
    return value.station_stream_url;
  } else if (index == 5) {
    return value.station_color;
  } else if (index == 6) {
    return value.station_tags;
  }
}