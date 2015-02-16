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
            <div className="container search">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="text-center search">Search Campaigns</h1>
                    </div>
                </div>
                <div className="row"> 
                    <SearchBox 
                        value={this.state.value}
                        onSubmit={this.handleSubmit}/>
                </div>
                <div>
                    <RouteHandler />
                </div>
            </div>
        )
    }
});

module.exports = Search;