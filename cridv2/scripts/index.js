$(document).ready(function(){
	var rootRef = firebase.database().ref().child("Users");
	rootRef.on("child_added", snap => {
		var name = snap.child("Name").val();
		var email = snap.child("Email").val();
	});
})