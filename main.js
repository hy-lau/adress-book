let app = new Vue({

	el: '#app',
	data: {
		users: [],
		genderButton: '',
		nameInput: '',
		locationInput: '',
		pseudoInput: '',

	},
	created: function () {
		let url = 'https://randomuser.me/api/?results=100&nat=fr';
		this.$http.get(url).then(function (response) {
			this.users = response.body.results;
		})
	},
	computed: {
		filteredUsers: function () {

			let filteredArray = this.users;

			// FILTER BY GENDER
			if (this.genderButton === 'women') {
				let filteredArray = this.users.filter(function (elt) {
					return elt.gender === 'female';
				});
				return filteredArray;
			} else if (this.genderButton === 'men') {
				filteredArray = this.users.filter(function (elt) {
					return elt.gender === 'male';
				});
				return filteredArray;


				// FILTER BY NAME
			} else if (this.nameInput.length > 0) {

				let regexName = new RegExp(app.nameInput, "i");
				filteredArray = this.users.filter(function (elt) {
					return regexName.test(elt.name.first)
						||
						regexName.test(elt.name.last);
				})
			}

			// FILTER BY LOCATION
			else if (this.locationInput.length > 0) {

				let regexLocation = new RegExp(app.locationInput, "i");
				filteredArray = this.users.filter(function (elt) {
					return regexLocation.test(elt.location.city)
						||
						regexLocation.test(elt.location.postcode);
				})
			}

			// FILTER BY PSEUDO 

			else if (this.pseudoInput.length > 0) {
				let regexPseudo = new RegExp(app.pseudoInput, "i");

				filteredArray = this.users.filter(function (elt) {
					return regexPseudo.test(elt.login.username);
				})
			}

			return filteredArray;
		}



	},
	filters: {
		ageFilter: function (dob) {

			let today = new Date();
			let birthDate = new Date(dob);
			// console.log(birthDate);

			let age = today.getFullYear() - birthDate.getFullYear();
			let month = today.getMonth() - birthDate.getMonth();

			if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		},
		capitalize: function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	},
	methods: {
		deleteUser: function (user) {
			let position = this.users.indexOf(user);
			this.users.splice(position, 1);
		}
	}

})