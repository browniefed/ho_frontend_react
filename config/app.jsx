var React = require("react");
var Router = require("react-router");
var routes = require("../app/" + __resourceQuery.substr(1) + "Routes");

require("./../public/styles/main.scss");


Router.run(routes, Router.HistoryLocation, function(Application, state) {
	React.render(<Application />, document.getElementById("content"));
});
