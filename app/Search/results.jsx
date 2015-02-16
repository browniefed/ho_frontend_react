var React = require('react/addons'),
    DocumentTitle = require('react-document-title'),
    Router = require('react-router'),
    StateMixin = Router.State,
    CampaignTile = require('hackoregon/components/CampaignTile'),
    _ = require('lodash');



var Results = React.createClass({
    mixins: [StateMixin],
    getResultQuery: function() {
        return this.getParams().keyword;
    }, 
    getDefaultProps: function() {
        return {
            campaigns: []
        }
    },
    getCampaigns: function() {
        return _.map(this.props.campaigns, function(campaign) {
            return (
                <div className="col-xs-12 col-sm-6 col-md-4" key={campaign.filer_id}>
                    <CampaignTile 
                        campaign={campaign} />
                </div>
            )
        })
    },
    render: function() {
        return (
            <DocumentTitle title={"Behind The Curtain - Results " + this.getResultQuery()}>
                <div>
                   {this.getCampaigns()}
                </div>
            </DocumentTitle>
        )
    }
});

module.exports = Results;