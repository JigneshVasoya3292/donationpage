var donationViewModel = can.Map.extend({
	donatedamount : 400,
	donationamount: 50,
	remainingamount: 600,

	init : function() {

	},

	givenow : function() {
		var donatedamount = this.attr('donatedamount');
			donationamount = this.attr('donationamount');

		if (this.validateInput(donationamount) && donatedamount < 1000) {
			this.attr('donatedamount', donatedamount + Math.floor(donationamount));
			this.attr('remainingamount', 1000 - this.attr('donatedamount'));
			console.log("donation: " + this.attr('donatedamount'));
			this.setProgressBar();
		}
	},

	sharebuttonclicked : function() {
		FB.ui({
			method: 'share',
			display: 'popup',
			href: 'https://sarthak-04.github.io/donationCart/',
			quote: 'Yay, I donated!'
			}, function(response){});
		},

	setProgressBar : function () {
		var donatedamount = this.attr('donatedamount');
			donationamount = this.attr('donationamount'),
			progressbarelem = document.getElementsByClassName("progressbarfull"),
			width = this.attr('donatedamount') / 10;

		if (progressbarelem.length && width <= 100) {
			progressbarelem[0].style.width = width + '%';
		}
	},

	validateInput: function(inputval) {
		return Math.floor(inputval) == inputval;
	}
});

can.Component.extend({
  tag: 'st-donation',
  viewModel: donationViewModel,
  template: can.view('components/donation/donation.stache'),
  events : {
  	'inserted': function() {
  		this.viewModel.setProgressBar();
  	}
  }
});