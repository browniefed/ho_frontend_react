var React = require('react/addons'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    NavigationMixin = Router.Navigation;

var SearchBox = require('hackoregon/components/Search');

var Search = React.createClass({
    mixins: [NavigationMixin],
    getInitialState: function() {
        return {
            value: ''
        };
    },
    handleSubmit: function(value) {
        if (value) {
            this.transitionTo('search-results', {keyword: value});
            this.setState({
                value: ''
            });
        }
    },
    render: function() {
        return (
            <div>
                <div> 
                    <SearchBox 
                        value={this.state.value}
                        onSubmit={this.handleSubmit}/>
                </div>
                <RouteHandler />
            </div>
        )
    }
});

module.exports = Search;