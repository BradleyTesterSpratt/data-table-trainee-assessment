window.addEventListener("load", getJson);

function getJson()
{
	$.getJSON('data.json', function (data) 
	{ 
		//create an array of dates
		var dates=Object.keys(data);
		//create an array of channels
		var channels=Object.keys(data["2009-01"]);
		//get the table
		var table = document.getElementById("table");
		//create the body of the table
		var body = document.createElement('TBODY');
		//for each date
		for (var d=0; d<dates.length; d++)
		{
			//create a row
			var newRow = document.createElement('TR');
			//create a row heading
			var newHead = document.createElement('TD');
			//get text for heading
			var headText = formatDate(dates[d]);
			//append the text to the heading
			newHead.appendChild(headText);
			//append the heading to the row
			newRow.appendChild(newHead);
			//for each channel
			for (var i = 0; i < channels.length; i++)
			{
				//create a new cell entry
				var newCell = document.createElement('TD');
				//get the text for the cell
				var newText = document.createTextNode(data[dates[d]][channels[i]]);
				//add the text to the cell
				newCell.appendChild(newText);
				//append the new cell to the row
				newRow.appendChild(newCell);
			}
			//append the row to the table body
			body.appendChild(newRow);
		}
		//append the table body to the table
		table.appendChild(body);
	});
}

function formatDate(input)
{
	//define months of the year
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	//split the input
	var split = input.split("-");
	//create output
	var output = document.createTextNode(months[split[1]-1]+" "+split[0]);
	return output;
}

/*simple sort code edited from 
https://www.w3schools.com/howto/howto_js_sort_table.asp
*/
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


