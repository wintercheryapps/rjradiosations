function validate_and_generate() {
  passphrase=document.getElementsByName("passphrase")[0].value;
  if(passphrase.length<32){
    alert("Enter a valid passphrase which has minimum length of 32 !!");
  }else{
    const file = document.querySelector('[type=file]').files;
    Papa.parse(file, {
	complete: function(results) {
		console.log("Finished:", results.data);
	}
});
  }

}
