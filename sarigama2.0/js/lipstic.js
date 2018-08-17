$(document)
  .ready(function() {
    $("#button")
      .click(function() {
        input = document.getElementById('file_input');
        parsePhrase = document.getElementById('parse_phrase')
        if (!input) {
          alert("Um, couldn't find the fileinput element.");
        } else if (!input.files) {
          alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!input.files[0]) {
          alert("Please select a file before clicking 'Submit'");
        } else {
          if ($('#parse_phrase')
            .val() == '') {
            alert('Input can not be left blank');
          } else {
            var file = input.files[0];
            var reader = new FileReader();

            reader.onload = function(e) {
              var data = e.target.result;
              var workbook = XLSX.read(data, {
                type: 'binary'
              });

              workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);

                var dataObject = JSON.parse(json_object);
                dataObject.forEach(function(item) {
                  // var datItemRow = JSON.parse(item);
                  console.log(item.StationName);
                  var codeValue = $('#parse_phrase')
                    .val()
                  item.StationName = GibberishAES.enc(item.StationName, codeValue)
                  item.StationNameNative = GibberishAES.enc(item.StationNameNative, codeValue)
                  item.StreamLink = GibberishAES.enc(item.StreamLink, codeValue)
                  item.ImageUrlRect = GibberishAES.enc(item.ImageUrlRect, codeValue)
                  item.ImageUrlRound = GibberishAES.enc(item.ImageUrlRound, codeValue)
                  item.StationTags = GibberishAES.enc(item.StationTags, codeValue)

                });

                console.log(JSON.stringify(dataObject));
                var blob = new Blob([JSON.stringify(dataObject)], {
                  type: "text/plain;charset=utf-8"
                });
                saveAs(blob, sheetName + ".json");
              })

            };

            reader.onerror = function(ex) {
              console.log(ex);
            };

            reader.readAsBinaryString(file);
          }
        }
      });
  });

function handleFile(url) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {
      type: "binary"
    });

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    console.log(XLSX.utils.sheet_to_json(worksheet, {
      raw: true
    }));
  }

  oReq.send();
}
