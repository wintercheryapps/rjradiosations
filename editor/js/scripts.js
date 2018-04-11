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