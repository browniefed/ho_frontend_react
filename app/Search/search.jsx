var React = require('react/addons'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    NavigationMixin = Router.Navigation,
    StateMixin = Router.State,
    DocumentTitle = require('react-document-title'),
    API = require('hackoregon/api/API'),
    _ = require('lodash');

var SearchBox = require('hackoregon/components/Search');


var data = {};

var Search = React.createClass({
    mixins: [NavigationMixin, StateMixin],
    getInitialState: function() {
        return {
            value: '',
            campaigns: []
        };
    },
    handleSubmit: function(value) {
        if (value) {
            this.transitionTo('search-results', {keyword: value});
            this.setState({
                value: ''
            });
            API.search(value, _.bind(function(err, res) {
                data[value] = res;
                this.setState({
                    campaigns: res
                });
            }, this));
        }
    },
    getSearchValue: function() {
        return this.getParams().keyword;
    },
    getCampaigns: function() {
        return data[this.getSearchValue()] || this.state.campaigns;
    },
    render: function() {
        return (
            <DocumentTitle title="Behind The Curtain - Search">
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
                    <div className="row">
                        <RouteHandler campaigns={this.getCampaigns()}/>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
});

module.exports = Search;
