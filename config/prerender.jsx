var async = require("async");
var React = require("react");
var Router = require("react-router");
var ItemsStore = require("items-store/ItemsStore");
var routes = require("../app/" + __resourceQuery.substr(1) + "Routes");
var html = require("../app/prerender.html");


module.exports = function(path, readItems, scriptUrl, styleUrl, commonsUrl, callback) {

	// run the path thought react-router
	Router.run(routes, path, function(Application, state) {
		
			// prerender the application with the stores
			var application = React.withContext({
				stores: stores
			}, function() {
				return React.renderToString(<Application />);
			});

			// format the full page
			callback(null, html
				.replace("STYLE_URL", styleUrl)
				.replace("SCRIPT_URL", scriptUrl)
				.replace("COMMONS_URL", commonsUrl)
				.replace("DATA", JSON.stringify(Object.keys(stores).reduce(function(obj, name) {
					if(!stores[name].desc.local)
						obj[name] = stores[name].getData();
					return obj;
				}, {})))
				.replace("CONTENT", application));
		});
	});
};
