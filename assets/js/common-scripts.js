/*
Background Grid
*/
grid = document.createElement('div');
grid.setAttribute("id", "grid-wrapper");
document.body.appendChild(grid);
for(i=0; i<14; i++) {
	var gridItem = document.createElement('div');
	document.getElementById('grid-wrapper').appendChild(gridItem);
}
