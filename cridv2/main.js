// Get values of input.
var kaceInput 		= document.getElementById("kaceInput");
var districtInput 	= document.getElementById("districtInput");
var cbmodelInput 	= document.getElementById("cbmodelInput");
var cbpartInput 	= document.getElementById("cbpartInput");
var submitBtn 		= document.getElementById("submitBtn");
var cbmodelinvInput = document.getElementById("cbmodelinvInput");
var cbpartinvInput 	= document.getElementById("cbpartinvInput");
var quaninvInput	= document.getElementById("quaninvInput");


// Function to submit RepairList info to database.
	function submitForm() {
	// var to reference Firebase db/RepairList/~
		var repairRef = firebase.database().ref().child("RepairList");
	
	// Form push - Submits with key > set vaules : input values.
		$(document).ready(function(){
			var kace 		= $('#kaceInput').val();
			var district 	= $('#districtInput').val();
			var cbmodel 	= $('#cbmodelInput').val();
			var cbpart 		= $('#cbpartInput').val();
			repairRef.push({kace: kac, district: district, cbmodel: cbmodel, cbpart: cbpart });
		})
	// Update inventory with cbpart -1 to whichever part was input.


	/* Second form push - Submits with key > all keys with data - need set value names.
		// Repair data to submit.
		var repairData = {
			KACE: kaceInput,
			District: districtInput,
			CBModel: cbmodelInput,
			CBPart: cbpartInput
		};

		// Write repairData to RepairList/new entry.
		var updates = {};
		updates['/RepairList/' + repairRef] = repairData;

		return firebase.database().ref().update(updates);
	*/
	
	/* Original form push - did everything as a seperate key.
		var firebaseRef = firebase.database().ref().child("RepairList");

		var kace = kaceInput.value;
		firebaseRef.push("KACE").set(kace);
	
		var district = districtInput.value;
		firebaseRef.push("District").set(district);

		var cbmodel = cbmodelInput.value;
		firebaseRef.push("CBModel").set(cbmodel);

		var cbpart = cbpartInput.value;
		firebaseRef.push("CBPart").set(cbpart);
	*/	
	}
// Function to submit PartList info to database.
	function submitinvForm() {
		// var to reference Firebase db/PartList/~
		var partRef = firebase.database().ref().child("PartList");

		// Form push - Needs to pull current values and add inv submitted to them.
		
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

//J Query to pull values to table. - Inventory
$(document).ready(function(){
	var rootRef = firebase.database().ref().child("PartList");
	rootRef.on("child_added", snap => {
		var cbmodelinv 	= snap.child("Model").val();
		var cbpartinv 	= snap.child("Part").val();
		var quaninv 	= snap.child("Quantity").val();

		$("#invtable_body").append("<tr><td>" + cbmodelinv + "</td><td>" + cbpartinv + 
							"</td><td>" + quaninv + "</td>" + "<td><button>Remove</button></td></tr>");
	});
})




