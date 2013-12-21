function OrgSearchProvider($http) {
	var myFilter = function(orgs, text) {
		if (! text) {
			return orgs;
		}
		text = text.toLowerCase();
		if (! orgs) {
			return [];
		}
		var result = [];
		for(var i = 0; i < orgs.length; i++) {
			var o = orgs[i];
			var n = o.displayName;
			if (n && (n.toLowerCase().indexOf(text) != -1)) {
				result.push(o);
			}
		}
		return result;
	};

	this.search = function(searchText, onSuccessFn) {
		console.log('searching for ' + searchText);

		var url = '../messages/search-orgs.js';
 		$http.get(url).success(function(data) {
        	var filtered = myFilter(data, searchText);
			onSuccessFn(filtered);
    	});
				/* Errors have to be handled with
					.error(function(a,b,c,d) {
						...
					})
				*
	}
};
