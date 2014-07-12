var Hud = function(){
	var meterEl = this._getMeterEl();

	this.claim = 0;
	this.initTime = 60;
	this.oldMeterWidth = this.meterWidth = meterEl.offsetWidth;
	this.meterTick = (this.meterWidth / 100) / this.initTime; // Fixme Tick has wrong time interval.
};

Hud.prototype.setClaim = function(value){
	value = value < 0 ? 0 : value > 100 ? 100 : value;

	this.claim = value;
	this.updateClaimEl();
};

Hud.prototype.updateClaimEl = function(){
	var claimEl = document.getElementById('claim'),
		sheetEl = claimEl.children[0],
		flySheetEl = sheetEl.cloneNode(true);

	claimEl.appendChild(flySheetEl);

	sheetEl.innerHTML = this.claim + '%';

	// Animate
	setTimeout(function () {
		flySheetEl.classList.add('away');
	}, 100);

	// Garbage Collector
	setTimeout(function () {
		claimEl.removeChild(flySheetEl);
	}, 5000);
};

Hud.prototype.updateTimer = function () {
	var meterEl = this._getMeterEl();

	this.meterWidth -= this.meterTick;

	if (this.oldMeterWidth - this.meterWidth >= 1) {
		this.oldMeterWidth = this.meterWidth;

		if (this.meterWidth <= 0) {
			this.meterWidth = 0;

			this.onTimeOver();
		}

		if (this.meterWidth >= 0) {
			meterEl.style.setProperty('width', this.meterWidth + 'px');
		}
	}
};

Hud.prototype.onTimeOver = function(){
	// This method is called when the time is over.
};

Hud.prototype._getMeterEl = function(){
	return document.getElementById('meter');
};
