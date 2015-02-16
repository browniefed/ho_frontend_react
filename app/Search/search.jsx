var React = require('react/addons'),
    Router = require('react-rotuer'),
    RouteHandler = Router.RouteHandler,
    NavigationMixin = Router.Navigation;

var SearchBox = require('hackoregon/components/Search');

var Search = React.createClass({
    mixins: [NavigationMixin],
    handleSubmit: function(value) {
        if (value) {

        }
    },
    render: function() {
        return (
            <div>
                <div> 
                    <SearchBox onSubmit={this.handleSubmit}/>
                </div>
                <RouteHandler />
            </div>
        )
    }
});

module.exports = Search;