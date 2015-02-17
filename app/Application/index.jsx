var React = require("react"),
    Router = require('react-router'),
    StateMixin = Router.State,
    RouteHandler = Router.RouteHandler;

var Footer = require('./Footer'),
    Nav = require('./Nav');

var Application = React.createClass({
    mixins: [StateMixin],
    getNav: function() {
        if (!this.isActive('home')) {
            return (
                <Nav />
            )
        }
        return null;
    },
	render: function() {
		return (
			<div className="application content">
                {this.getNav()}
				<RouteHandler />
                <Footer />
			</div>
		);
	}
});
module.exports = Application;
