var donationViewModel = can.Map.extend({
	donatedamount : 400,
	donationamount: 50,
	remainingamount: 600,

	init : function() {

	},

	givenow : function() {
		var donatedamount = this.attr('donatedamount'),
			donationamount = this.attr('donationamount'),
			amountobeadded;

		if (this.validateInput(donationamount) && donatedamount < 1000) {
			amountobeadded = donatedamount + Math.floor(donationamount);
			amountobeadded = amountobeadded > 1000 ? 1000 : amountobeadded;
			this.attr('donatedamount', amountobeadded);
			this.attr('remainingamount', 1000 - this.attr('donatedamount'));
			console.log("donation: " + this.attr('donatedamount'));
			this.setProgressBar();
		}
	},

	sharebuttonclicked : function() {
		FB.ui({
			method: 'share',
			display: 'popup',
			href: 'https://jigneshvasoya3292.github.io/donationpage/',
			quote: 'Yay, I donated!'
			}, 
			function(response){
				if (response && !response.error_message) {
			      console.log('Posted Successfully');
			    } else {
			      console.log('Failed while posting' + JSON.stringify(response));
			    }
			});

		window.open('https://twitter.com/share?text=' + encodeURIComponent('Yay, I donated!'));
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
