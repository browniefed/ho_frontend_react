var React = require('react/addons'),
    DocumentTitle = require('react-document-title'),
    API = require('hackoregon/api/API');

var Section = require('hackoregon/components/campaign/Section'),
    Content = require('hackoregon/components/campaign/Content'),
    Header = require('hackoregon/components/campaign/Header'),
    Title = require('hackoregon/components/campaign/Title'),
    Subtitle = require('hackoregon/components/campaign/Subtitle');

var CampaignDetails = require('hackoregon/components/campaign/CampaignDetails'),
    Raised = require('hackoregon/components/campaign/Raised'),
    Spent = require('hackoregon/components/campaign/Spent'),
    GrassRootsRadial = require('hackoregon/components/campaign/GrassRootsRadial'),
    InDistrictRadial = require('hackoregon/components/campaign/InDistrictRadial');


var data = {};



var State = React.createClass({
    componentDidMount: function() {

    },
    render: function() {
        return (
            <DocumentTitle title="Behind The Curtain - Oregon Summary Page">
                <div className="campaign-detail">
                    <Section>
                        <Header>
                            <Title>Oregon Summary</Title>
                        </Header>
                        <Content>
                            <div className="col-md-4">
                              <img className="campaign-photo" width="100%" src="/images/icons/landing_oregon.svg" />
                              <p>Submit your campaign photo <a href="mailto:hello@hackoregon.com?Subject=Campaign%20photo" target="_top">here</a>.</p>
                            </div>
                            <CampaignDetails>
                                <div>
                                    <Raised amount={100} />
                                    <Spent amount={100} />
                                </div>
                                <div>
                                    <GrassRootsRadial 
                                        percent={.12}
                                    />
                                    <InDistrictRadial 
                                        percent={.29}
                                    />
                                </div>
                            </CampaignDetails>
                        </Content>
                    </Section>
                    <Section>
                        <Header>
                            <Title>Who's Giving?</Title>
                            <Subtitle>This visualization is calculated by total dollars, not total people.</Subtitle>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Title>What Are They Spending Money On?</Title>
                            <Subtitle>Did you know campaigns self select these categories?</Subtitle>
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <Title>When Are They Raising & Spending Money?</Title>
                            <Subtitle>You can tell a lot about the life cycle of a campaign by looking at their transaction volume and patterns.</Subtitle>
                        </Header>
                        
                    </Section>
                    <Section>
                        <Header>
                            <Title>Is the Money Local?</Title>
                            <Subtitle>This election year, Oregon has received contributions from all 50 states.</Subtitle>
                        </Header>
                    </Section>
                </div>
            </DocumentTitle>
        )
    }
});

module.exports = State;