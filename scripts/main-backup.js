// Get values of input.
var kaceInput 		= document.getElementById("kaceInput");
var districtInput 	= document.getElementById("districtInput");
var cbmodelInput 	= document.getElementById("cbmodelInput");
var cbpartInput 	= document.getElementById("cbpartInput");
var submitBtn 		= document.getElementById("submitBtn");
var cbmodelinvInput = document.getElementById("cbmodelinvInput");
var cbpartinvInput 	= document.getElementById("cbpartinvInput");
var quaninvInput	= document.getElementById("quaninvInput");
var kaceinvInput 	= document.getElementById("kaceinvInput");
// var to reference Firebase db/RepairList/~
var repairRef = firebase.database().ref().child("RepairList");
// var to reference Firebase db/PartList/~
var partRef = firebase.database().ref().child("PartList");

// Function to submit RepairList info to database.
	function submitForm() {
	// Form push - Submits with key -> set vaules : input values.
		repairRef.child(kaceInput.value).set({
			KACE: document.getElementById('kaceInput').value,
			District: document.getElementById('districtInput').value,
			CBModel: document.getElementById('cbmodelInput').value,
			CBPart: document.getElementById('cbpartInput').value
		});
	// Update inventory with cbpart -1 to whichever model and part was input.
		firebase.database().ref('/PartList/' + cbmodelInput.value + cbpartInput.value).once('value').then(function(snapshot) {
			var modelPull 	= snapshot.val().Model;
			var partPull 	= snapshot.val().Part;
			var quanPull 	= snapshot.val().Quantity;
			var quanInt 	= Number(quanPull) - 1
				partRef.child(cbmodelInput.value + cbpartInput.value).update({
					Quantity: quanInt
				})
		});
		window.location.reload(true);

	}
// Function to submit PartList info to database.
	function submitinvForm() {
	// Form push - Needs to pull current values and add inv submitted to them.
		firebase.database().ref('/PartList/' + cbmodelinvInput.value + cbpartinvInput.value).once('value').then(function(snapshot) {
			if (snapshot.val() === null) {
			// If inputted model, part, and PO don't exist; enter as new inventory item.
				window.alert("Added item to Inventory.")
				partRef.child(cbmodelinvInput.value + cbpartinvInput.value).set({
					KACE: document.getElementById('kaceinvInput').value,
					Model: document.getElementById('cbmodelinvInput').value,
					Part: document.getElementById('cbpartinvInput').value,
					Quantity: document.getElementById('quaninvInput').value
				})
			}
			// If model/part/po exist, update the Quantity.
			else {
			var poinvPull 		= snapshot.val().KACE;
			var modelinvPull 	= snapshot.val().Model;
			var quaninvPull 	= snapshot.val().Quantity;
			var partinvPull 	= snapshot.val().Part;
			var qiInt 			= document.getElementById('quaninvInput').value;
			var qiIntUpdate 	= Number(qiInt) + Number(quaninvPull)
				window.alert("Inventory Updated.")
				partRef.child(cbmodelinvInput.value + cbpartinvInput.value).update({
					Quantity: qiIntUpdate
				})
			}
			 
		}); 
			
	}

// JQuery to pull values to table. - Repairs
$(document).ready(function(){
	var rootRef = firebase.database().ref().child("RepairList");
	rootRef.on("child_added", snap => {
		var kace 		= snap.child("KACE").val();
		var district 	= snap.child("District").val();
		var cbmodel 	= snap.child("CBModel").val();
		var cbpart 		= snap.child("CBPart").val();

		$("#table_body").append("<tr><td>" + kace + "</td><td>" + district + 
							"</td><td>" + cbmodel + "</td><td>" + cbpart +
							"<td><button>Remove</button></td></tr>");
	});
})

// JQuery to pull values to table. - Inventory
$(document).ready(function(){
	var rootRef = firebase.database().ref().child("PartList");
	rootRef.on("child_added", snap => {
		var cbmodelinv 	= snap.child("Model").val();
		var cbpartinv 	= snap.child("Part").val();
		var quaninv 	= snap.child("Quantity").val();

		$("#invtable_body").append("<tr><td>" + cbmodelinv + "</td><td>" + cbpartinv + 
							"</td><td>" + quaninv + 
							"<td><button>Remove</button></td></tr>");
	});
})

// JQuery to pull vales to table. - TBS
$(document).ready(function(){
	var rootRef = firebase.database().ref().child("PartList");
	rootRef.on("child_added", snap => {
		var kaceinv 	= snap.child("KACE").val();
		var cbmodelinv 	= snap.child("Model").val();
		var cbpartinv 	= snap.child("Part").val();
		var quaninv 	= snap.child("Quantity").val();

		$("#tbstable_body").append("<tr><td>" + kaceinv + "</td><td>" + cbmodelinv + 
							"</td><td>" + cbpartinv + "</td><td>" + quaninv + 
							"<td><button>Remove</button></td></tr>");
	});
})











