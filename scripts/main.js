'use strict';

// Repair form var's.
var kaceInput 			= document.getElementById("kaceInput");
var districtInput 		= document.getElementById("districtInput");
var cbmodelInput 		= document.getElementById("cbmodelInput");
var cbpartInput 		= document.getElementById("cbpartInput");
var poInput 			= document.getElementById("poInput");
// Inventory form var's.
var cbmodelinvInput 	= document.getElementById("cbmodelinvInput");
var cbpartinvInput 		= document.getElementById("cbpartinvInput");
var quaninvInput		= document.getElementById("quaninvInput");
var kaceinvInput 		= document.getElementById("kaceinvInput");
// TBS form var's.
var kacetbsInput 		= document.getElementById("kacetbsInput");
var districttbsInput 	= document.getElementById("districttbsInput");
var cbmodeltbsInput 	= document.getElementById("cbmodeltbsInput");
var cbparttbsInput 		= document.getElementById("cbparttbsInput");
var pocInput 			= document.getElementById("pocInput");
var districtSelect 		= document.getElementById("districtSelect");
// var to reference Firebase db/RepairList/~
var repairRef 			= firebase.database().ref().child("RepairList");
// var to reference Firebase db/PartList/~
var partRef				= firebase.database().ref().child("PartList");
// var to reference Google Authentication.
var provider 			= new firebase.auth.GoogleAuthProvider();

// Get authenticatoin on window load.
window.onload = function() {
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  } else {
	firebase.auth().signInWithRedirect(provider);
  }
});
}

// Sign out button for Google Account.
function signOut() {
	firebase.auth().signOut();
}; 

// Function to submit RepairList info to database.
	function submitForm() {
	// Push key-info based off pre-populated PO List using key from list.
		firebase.database().ref('/PartList/' + poInput.value).once('value').then(function(snapshot) {
		var poKey 		= snapshot.key;
		var poPull 		= snapshot.val().KACE;
		var modelPull 	= snapshot.val().Model;
		var pocPull 	= snapshot.val().POCost;
		var partPull 	= snapshot.val().Part;
		var quanPull 	= snapshot.val().Quantity;
		var quanInt 	= Number(quanPull) - 1

		var m = new Date();
		var dateString =
			("0" + (m.getMonth()+1)).slice(-2) + "/" +
			("0" + m.getDate()).slice(-2) + "/" +
    		m.getFullYear() + " " +
    		("0" + m.getHours()).slice(-2) + ":" +
    		("0" + m.getMinutes()).slice(-2) + ":" +
    		("0" + m.getSeconds()).slice(-2);
		// Form push - Submits with key {(set vaules : input values)}.
			repairRef.child(kaceInput.value).set({
				KACE: document.getElementById('kaceInput').value,
				District: document.getElementById('districtInput').value,
				CBModel: modelPull,
				CBPart: partPull,
				PO: poPull,
				POCost: pocPull,
				Time: dateString
			});
			partRef.child(poKey).update({
				Quantity: quanInt
			});
		});
	}


// Function to submit PartList info to database.
	function submitinvForm() {
		firebase.database().ref('/PartList/' + kaceinvInput.value + " " + cbpartinvInput.value).once('value').then(function(snapshot) {
		// Set dateString with current date and time MM/DD/YYYY hh:mm:ss.
			var m = new Date();
			var dateString =
			// Add 0 to front, slice it to 2 digits to keep it correct format.
				("0" + (m.getMonth()+1)).slice(-2) + "/" +
				("0" + m.getDate()).slice(-2) + "/" +
    			m.getFullYear() + " " +
    			("0" + m.getHours()).slice(-2) + ":" +
    			("0" + m.getMinutes()).slice(-2) + ":" +
    			("0" + m.getSeconds()).slice(-2);

			if (snapshot.val() == null) {
			// If PO don't exist; enter as new inventory item.
				window.alert("Added item to Inventory.")
				partRef.child(kaceinvInput.value + " " + cbpartinvInput.value).set({
					KACE: document.getElementById('kaceinvInput').value,
					Model: document.getElementById('cbmodelinvInput').value,
					Part: document.getElementById('cbpartinvInput').value,
					Quantity: document.getElementById('quaninvInput').value,
					QuantityReceived: document.getElementById('quaninvInput').value,
					Time: dateString,
					POCost: document.getElementById('pocInput').value
				})
			}
			// If PO does exist snapshot info and update.
			var poKey 			= snapshot.key;
			var quanrPull 		= snapshot.val().QuantityReceived;
			var quaninvPull 	= snapshot.val().Quantity;
			var qiInt 			= document.getElementById('quaninvInput').value;
			var quanRecUpdate 	= Number(qiInt) + Number(quanrPull)
			var quanUpdate 		= Number(qiInt) + Number(quaninvPull)
				window.alert("Inventory Updated.")
				partRef.child(poKey).update({
					QuantityReceived: quanRecUpdate,
					Quantity: quanUpdate,
					Time: dateString,
					POCost: document.getElementById('pocInput').value
				})
			 
		}); 
			
	}

// Function to submit TBS ammendments to database. - Form removed from tbs.html - Will update as needs arise.
	function submittbsForm() {
		firebase.database().ref('/PartList/' + kacetbsInput.value + " " + cbparttbsInput.value).once('value').then(function(snapshot) {

			if (snapshot.val() == null) {
				window.alert("That PO does not currently exist. Please reference the table and choose an existing PO.")

			} else {
				var poKey = snapshot.key;

				partRef.child(poKey).update({
					Model: document.getElementById('cbmodeltbsInput').value,
					Part: document.getElementById('cbparttbsInput').value,
					POCost: document.getElementById('pocInput').value

				})
			}
		});
	}
	
// JQuery to append dropdown list from fb -> PO Select.
$(document).ready(function() {
	var keys 		= [];
	var pos 		= [];
	var models 		= [];
	var parts 		= [];
	var quantities 	= [];
	var rootRef = firebase.database().ref().child("PartList");
	rootRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var keyID 		= childSnapshot.key;
			var poID 		= childSnapshot.val().KACE;
			var modelID 	= childSnapshot.val().Model;
			var partID 		= childSnapshot.val().Part;
			var quanID 		= childSnapshot.val().Quantity;
				keys.push(keyID);
				pos.push(poID);
				models.push(modelID);
				parts.push(partID);
				quantities.push(quanID);
		});
		var i;
		for (i = 0; i < keys.length; i++) {
			$("#poInput").append("<option value='" + keys[i] + "''>" + pos[i] + " | " + models[i] + " | " + parts[i] + " | (" + quantities[i] + " available)</option>");
		}
	});
})

// JQuery to pull values to table. - Repairs - Would like to have it display highest number of KACE value first.
$(document).ready(function(){
	var rootRef = firebase.database().ref().child("RepairList").orderByChild("KACE");
	rootRef.on("child_added", snap => {
		var kace 		= snap.child("KACE").val();
		var district 	= snap.child("District").val();
		var cbmodel 	= snap.child("CBModel").val();
		var cbpart 		= snap.child("CBPart").val();
		var time 		= snap.child("Time").val();

		$("#table_body").append("<tr><td><a href='https://help.oaisd.org/adminui/ticket.php?ID=" + kace + "'>" + kace + "</td><td>" + district + 
							"</td><td>" + cbmodel + "</td><td>" + cbpart +
							"</td><td>" + time + "</td></tr>");
	});
})

// JQuery to pull values to table. - Inventory - Would like to have it display highest number of KACE value first.
$(document).ready(function(){
	var repairRef = firebase.database().ref().child("RepairList");
	repairRef.on("child_added", snap => {
		var kaceRep 	= snap.child("KACE").val();
		var districtRep = snap.child("District").val();
		var cbmodelRep 	= snap.child("CBModel").val();
		var cbpartRep 	= snap.child("CBPart").val();
		var quanRep 	= snap.child("Quantity").val();
		var quanrecRep 	= snap.child("QuantityReceived").val();
		var poRep 		= snap.child("PO").val();
		var pocRep 		= snap.child("POCost").val();
		var timeRep 	= snap.child("Time").val();
		var monthRep 	= timeRep.split('/')[0];



		$("#tbstable_body").append("<tr class='task-list-row' data-kace='" + kaceRep + "' data-district='" + districtRep + "' data-po='" + poRep + "' data-date='" + monthRep + "'><td><a href='https://help.oaisd.org/adminui/ticket.php?ID=" + kaceRep + "'>" + kaceRep + 
							"</td><td>" + districtRep + "</td><td>" + cbmodelRep + 
							"</td><td>" + cbpartRep + "</td><td>$" + pocRep + 
							"</td><td><a href='https://help.oaisd.org/adminui/ticket.php?ID=" + poRep + "'>" + poRep + "</td><td>" + timeRep + "</td></tr>");
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
		var time 		= snap.child("Time").val();

		$("#invtable_body").append("<tr><td><a href='https://help.oaisd.org/adminui/ticket.php?ID=" + kaceinv + "'>" + kaceinv + "</td><td>" + cbmodelinv + 
							"</td><td>" + cbpartinv + "</td><td>" + quaninv + 
							"</td><td>" + time + "</td></tr>");
	});
})







