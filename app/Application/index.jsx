var React = require("react");
var RouteHandler = require("react-router").RouteHandler;

var Footer = require('./Footer');

var Application = React.createClass({
	render: function() {
		return (
			<div className="application">
				<RouteHandler />
                <Footer />
			</div>
		);
	}
});
module.exports = Application;
