var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//Handlers
var Application = require("./Application"),
	Home = require('./Home/home');

module.exports = (
	<Route name="app" path="/" handler={Application}>
		<Route name="home" path="home" handler={Home} />
		<DefaultRoute handler={Home} />
	</Route>
);
