var React = require('react/addons'),
    DocumentTitle = require('react-document-title'),
    API = require('hackoregon/api/API'),
    _ = require('lodash'),
    CurrencyFormat = require('hackoregon/utils/CurrencyFormat');

var Section = require('hackoregon/components/campaign/Section'),
    Content = require('hackoregon/components/campaign/Content'),
    Header = require('hackoregon/components/campaign/Header'),
    HeaderTitle = require('hackoregon/components/campaign/HeaderTitle'),
    Title = require('hackoregon/components/campaign/Title'),
    Subtitle = require('hackoregon/components/campaign/Subtitle');

var CampaignDetails = require('hackoregon/components/campaign/CampaignDetails'),
    Raised = require('hackoregon/components/campaign/Raised'),
    Spent = require('hackoregon/components/campaign/Spent'),
    GrassRootsRadial = require('hackoregon/components/campaign/GrassRootsRadial'),
    InDistrictRadial = require('hackoregon/components/campaign/InDistrictRadial'),
    StateMoney = require('hackoregon/components/svg/StateMoney'),
    FundingExpenditures = require('hackoregon/components/svg/FundingExpenditures'),
    Spending = require('hackoregon/components/svg/Spending'),
    Contributors = require('hackoregon/components/campaign/Contributors'),
    WhoGiving = require('hackoregon/components/svg/WhoGiving');


var data = {};


//SHOW THESE IN THE UI
var UIINDEX = {
          PAC: {label: 'PAC', icon: 'pac'},
          Business:   {label: 'Business', icon: 'corporate'},
          Grassroots: {label: 'Grass Roots', icon: 'grassroot'},
          Individual: {label: 'Large Donors', icon: 'individual'},
          Party:      {label: 'Party', icon: 'party'},
        };

//THESE ARE KEYS FOR INDEX
     var CONTRIBUTION = {
      PAC: 'PAC',
      BUSINESS: 'Business',
      GRASSROOTS: 'Grassroots',
      INDIVIDUAL: 'Individual',
      PARTY: 'Party',
      UNION: 'Union',
      NA: 'NA'
    };

//Backend Strings to map to UIIndex eventuall
    var keyMap = {
        'Political Committee': CONTRIBUTION.PAC,
        'Large Donor': CONTRIBUTION.INDIVIDUAL,
        'Grassroot': CONTRIBUTION.GRASSROOTS,
        'Political Party Committee': CONTRIBUTION.PARTY,
        'Business Entity': CONTRIBUTION.BUSINESS,
        'Labor Organization': CONTRIBUTION.UNION,
        'Other': CONTRIBUTION.NA
      }

function processDataForGroups(data) {
      var result = {};
      _.each(data, function(val) {
        var key = keyMap[val['contribution_type']];
        if(key) {
          if (!_.has(result, key)) {
            result[key] = { amount: 0 };
          }
          result[key].amount += val.total;
        }
      });
      return result;
}



var State = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {

        /* General Sum Statistics */
        API.getAllOregonSum(_.bind(function(err, res){
            this.setState({
                campaignData: res[0]
            })
        }, this));
        /* Get Statics For Group Contributors*/
        API.getOregonByContributions(_.bind(function(err, res){
            this.setState({
                contributions: processDataForGroups(res)
            })
        }, this));

        /* Spending Chart */
        API.getOregonByPurposeCodes(_.bind(function(err, res) {
            this.setState({
                spending: res
            })
        }, this));

        /* Money State map*/
        API.getOregonInByState(_.bind(function(err, res){
            this.setState({
                moneyByState: res
            })
        }, this));

        /* Funding Expenditurs*/
        API.getStateSumByDate(_.bind(function(err, res){
            this.setState({
                fundingExpenditures: res
            })
        }, this));

        /* Individal Top Donors */
        API.getOregonIndividualContributors(_.bind(function(err, res){
            this.setState({
                individualContributors: res
            })
        }, this));
        /* Business Top Donors */
        API.getOregonBusinessContributors(_.bind(function(err, res){
            this.setState({
                businessContributors: res
            })
        }, this));
        /* Committee Top Donors */
        API.getOregonCommitteeContributors(_.bind(function(err, res){
            this.setState({
                comitteeContributors: res
            })
        }, this));



    },

    getFundingExpendituresElement: function() {
        if (this.state.fundingExpenditures) {
            return (
                <FundingExpenditures fundingExpenditures={this.state.fundingExpenditures} />
            )
        }
        return null;
    },
    getSpendingElement: function() {
        if (this.state.spending) {
            return (
                <Spending dataSet={this.state.spending}/>
            )
        }

        return null;
    },
    getMoneyByState: function() {
        if (this.state.moneyByState) {
            return (
                <StateMoney 
                    money={this.state.moneyByState}
                />
            )   
        }

        return null;
    },
    getWhoChartMax: function() {
        return _.max(this.state.contributions, function(contribution) {
            return contribution.amount;
        }).amount;
    },
    getWhoGivings: function() {
        return _.map(UIINDEX, function(who, key) {
            return (
                <WhoGiving 
                    title={who.label}
                    icon={"icon-" + who.icon}
                    max={this.getWhoChartMax()}
                    amount={this.state.contributions[key].amount}
                />
            )
        }, this)
    },
    getWhoChart: function() {
        if (!this.state.contributions) {
            return null;
        }

        return (
            <div className="who-chart">
                {this.getWhoGivings()}
            </div>
        );
    },
    getTopContributors: function() {
        return (
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <Contributors
                        key="individual"
                        title="Top Individual Donors"
                        contributors={this.state.individualContributors}
                    />
                </div>
                <div className="col-sm-6 col-xs-12">
                    <Contributors
                        key="business"
                        title="Top Business Donors"
                        contributors={this.state.businessContributors}
                    />
                </div>
                <div className="col-sm-6 col-xs-12">
                    <Contributors
                        key="committee"
                        title="Top Committee Donors"
                        contributors={this.state.comitteeContributors}
                    />
                </div>

            </div>  
        );
    },
    getRaised: function() {
        if (this.state.campaignData) {
            return (
                    <Raised 
                        amount={CurrencyFormat(this.state.campaignData.in)}
                    />
            )
        }
        return null;
    },
    getSpent: function() {
        if (this.state.campaignData) {
            return (
                    <Spent 
                        amount={CurrencyFormat(this.state.campaignData.out)}
                    />
            )
        }
        return null;
    },
    getGrassrootsRadial: function() {
        if (this.state.campaignData) {
            return (
                    <GrassRootsRadial 
                        percent={this.state.campaignData.total_grass_roots/this.state.campaignData.in}
                    />
            )
        }
        return null;
    },
    getInDistrictRadial: function() {
        if (this.state.campaignData) {
            return (
                    <InDistrictRadial 
                        percent={this.state.campaignData.from_within/this.state.campaignData.in}
                    />
            )
        }
        return null;
    },
    render: function() {
        return (
            <DocumentTitle title="Behind The Curtain - Oregon Summary Page">
                <div className="campaign-detail container">
                    <div className="col-md-9 col-md-offset-1">
                    <Section>
                        <Header>
                            <HeaderTitle>{this.state.title}</HeaderTitle>
                        </Header>
                        <Content>
                            <div className="col-md-4">
                              <img className="campaign-photo" width="100%" src="/images/icons/genderless.svg" />
                              <p>Submit your campaign photo <a href="mailto:hello@hackoregon.com?Subject=Campaign%20photo" target="_top">here</a>.</p>
                            </div>
                            <div className="col-md-2">
                                <div className="party party-"></div>
                            </div>
                            <CampaignDetails>
                                <div className="row">
                                    {this.getRaised()}
                                </div>
                                <div className="row spent-row">
                                    {this.getSpent()}
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        {this.getGrassrootsRadial()}
                                    </div>
                                    <div>
                                        {this.getInDistrictRadial()}
                                    </div>
                                </div>
                            </CampaignDetails>
                        </Content>
                    </Section>
                <Section>
                      <div className="col-xs-5 col-xs-offset-6 grassroots-fact">
                        <h4>Did you know the statewide average for grassroots funding is usually less than 13%?</h4>
                      </div>
                      </Section>
                    <Section>
                        <Header>
                            <Title>
                                Who's Giving?
                                <Subtitle>This visualization is calculated by total dollars, not total people.</Subtitle>
                            </Title>
                        </Header>
                        <Content>
                            <div>
                                {this.getWhoChart()}
                            </div>
                            <div>
                                {this.getTopContributors()}
                            </div>
                        </Content>
                    </Section>
                    <Section>
                        <Header>
                            <Title>
                                What Are They Spending Money On?
                                <Subtitle>Did you know campaigns self select these categories?</Subtitle>
                            </Title>
                        </Header>
                        <Content>
                            <div className="row">
                                {this.getSpendingElement()}
                            </div>
                        </Content>
                    </Section>
                    <Section>
                        <Header>
                            <Title>
                                When Are They Raising & Spending Money?
                                <Subtitle>You can tell a lot about the life cycle of a campaign by looking at their transaction volume and patterns.</Subtitle>
                            </Title>
                            
                        </Header>
                        <Content>
                            {this.getFundingExpendituresElement()}
                        </Content>
                    </Section>
                    <Section>
                        <Header>
                            <Title>
                                Is the Money Local?
                                <Subtitle>This election year, Oregon has received contributions from all 50 states.</Subtitle>
                            </Title>
                            
                        </Header>
                        <Content>
                            <div className="money-by-state" />
                            {this.getMoneyByState()}
                        </Content>
                    </Section>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
});

module.exports = State;