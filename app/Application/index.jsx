var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var Footer = require('./Footer'),
    Nav = require('./Nav');

var Application = React.createClass({
	render: function() {
		return (
			<div className="application">
                <Nav />
				<RouteHandler />
                <Footer />
			</div>
		);
	}
});
module.exports = Application;
