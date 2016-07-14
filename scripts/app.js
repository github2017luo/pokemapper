(function (document) {
    'use strict';
    var app = document.querySelector('#app');
    app.fbid = "";
          // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBmkBdp9qZFRQIanKoFWvj_bZo7USflQnE",
        authDomain: "pokemapper.firebaseapp.com",
        databaseURL: "https://pokemapper.firebaseio.com",
        storageBucket: "pokemapper.appspot.com",
    	};
    firebase.initializeApp(config);

	firebase.auth().signInAnonymously().catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    console.log("user Logged to FB" + uid);
	    app.fbid = uid;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	  // ...
	});

    var pokerray = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran♀","Nidorina","Nidoqueen","Nidoran♂","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
    
    app.pokerray2 = pokerray;
    app.latt = 42.689;
    app.long = -83.138;

	app.findme = function() {

	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	            var pos = {
	              lat: position.coords.latitude,
	              lng: position.coords.longitude
	        	};
	        	console.log("Supports, and works");
	        	app.latt = pos.lat;
	        	app.long = pos.lng;
	         }, function() {
	            
	          });
	        } 
	    else {
	          // Browser doesn't support Geolocation
	          handleLocationError(false, infoWindow, map.getCenter());
	        }
	};

	app.helplaunch = function() {
		this.$.help.open();
	};


    app.submittofb = function() {
    	var choseloc = false;

    	if (app.latt != 42.689 && app.long != -83.138) { 
    		choseloc = true;
    		if (app.var && choseloc) {
		    	console.log(app.var);
		    	console.log(app.latt);
		    	console.log(app.long);
		    	console.log(app.fbid);
		    	
		    	var postData = {
		    		poke: app.var,
		    		lat: app.latt,
		    		long: app.long,
		    		user: app.fbid
	    		};
	    		this.$.thankyou.open(); 
	    		return firebase.database().ref().child('userPoints').push(postData);

    		}
    		else { this.$.selectpokenote.open(); }
    	}
    	else { this.$.maperror.open(); }


    };

   
    
    })(document);