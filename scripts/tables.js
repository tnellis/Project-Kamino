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
							"</td><td>" + quaninv + "</td><td>" + "<td><button>Remove</button></td></tr>");
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

		$("#tbstable_body").append("<tr><td>" + kaceinv + "</td><td>" + cbmodelinv + "</td><td>" + cbpartinv + 
							"</td><td>" + quaninv + "</td><td>" + "<td><button>Remove</button></td></tr>");
	});
})