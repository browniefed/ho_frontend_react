var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

//Handlers
var Application = require("./Application"),
	Home = require('./Home/home'),
    FAQ = require('./Home/faq'),
    About = require('./Home/about'),
    Search = require('./Search/search'),
    SearchResult = require('./Search/results'),
    State = require('./Campaign/state');

module.exports = (
	<Route name="app" path="/" handler={Application}>
		<Route name="home" path="home" handler={Home} />
        <Route name="faq" path="faq" handler={FAQ} />
        <Route name="about" path="about" handler={About} />

        <Route name="search" path="search" handler={Search}>
            <Route name="search-results" path="search/:keyword" handler={SearchResults} />
        </Route>
        <Route name="oregon" path="oregon" handler={State} />
		<DefaultRoute handler={Home} />
	</Route>
);
