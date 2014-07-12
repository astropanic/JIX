var Hud = function(){
	this.claim = 0;
};

Hud.prototype.setClaim = function(value){
	value = value < 0 ? 0 : value > 100 ? 100 : value;

	this.claim = value;
	this.updateClaimEl();
};

Hud.prototype.updateClaimEl = function() {
	var claimEl = document.getElementById('claim'),
		sheetEl = claimEl.children[0],
		flySheetEl = sheetEl.cloneNode(true);

	claimEl.appendChild(flySheetEl);

	sheetEl.innerHTML = this.claim + '%';

	// Animate
	setTimeout(function () {
		flySheetEl.className += ' away';
	}, 100);

	// Garbage Collector
	setTimeout(function () {
		claimEl.removeChild(flySheetEl);
	}, 5000);
};
