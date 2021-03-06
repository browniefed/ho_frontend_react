var React = require('react/addons'),
    DocumentTitle = require('react-document-title'),
    Router = require('react-router'),
    StateMixin = Router.State,
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

var sortEntry = function(a, b) {
        return Number(b.sum) - Number(a.sum);
      }

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

var contributors = [
            {
                key: 'individualContributors',
                title: 'Top Individual Donors'
            },
            {
                key: 'businessContributors',
                title: 'Top Business Donors'
            },
            {
                key: 'comitteeContributors',
                title: 'Top Committee Donors'
            }
        ];


function processTransactions(transactions) {
     var contributions = {};
     
          var expenditures = {};
          var donors = {
            indiv: {},
            corp: {},
            pac: {}
          };
          var committee_codes = {};

            _.each(CONTRIBUTION, function(type){
                contributions[type] = {amount:0,number:0};
            });
          // Use contributor name as a unique key to add up total donations for each contributor
          var addDonorItem = function(type, row) {
            var payee = row['contributor_payee'];
            if (! _.has(donors[type], payee)){
              donors[type][payee] = 0;
            }
            donors[type][payee] += row.amount;

            if (type === 'pac' && _.has(row, 'contributor_payee_committee_id')) {
              committee_codes[payee] = row['contributor_payee_committee_id'];
            }
          };

          _.each(transactions, function (row) {
              var subType = row['sub_type'];
              switch (subType) {
                case 'In-Kind Contribution':
                case 'Cash Contribution':
                  var bookType = row['book_type'];
                  var contributionKey = '';
                  switch (bookType) {
                    case 'Business Entity':
                      contributionKey = CONTRIBUTION.BUSINESS;
                      addDonorItem('corp', row);
                      break;
                    case 'Political Committee':
                      contributionKey = CONTRIBUTION.PAC;
                      addDonorItem('pac', row);
                      break;
                    case 'Political Party Committee':
                      contributionKey = CONTRIBUTION.PARTY;
                      addDonorItem('pac', row);
                      break;
                    case 'NA':
                      contributionKey = CONTRIBUTION.NA;
                      break;
                    case 'Individual':
                      if (row['contributor_payee_class'] !== 'grassroots_contributor') {
                        contributionKey = CONTRIBUTION.INDIVIDUAL;
                        addDonorItem('indiv', row);
                      }
                      break;
                  }
                  if (contributionKey) {
                    contributions[contributionKey].amount += Number(row['amount']);
                    contributions[contributionKey].number += 1;
                  }
                  if (row['contributor_payee_class'] === 'grassroots_contributor') {
                    contributions[CONTRIBUTION.GRASSROOTS].amount += Number(row['amount']);
                    contributions[CONTRIBUTION.GRASSROOTS].number += 1;
                  }
                  break;
                case 'Cash Expenditure':
                  var purposeCodes = (row['purpose_codes'] || '').split('; ');
                  _.each(purposeCodes,function (purposeCode) {
                    if (!_.has(expenditures, purposeCode)) {
                      expenditures[purposeCode] = 0;
                    }
                    expenditures[purposeCode] += (Number(row['amount']) / purposeCodes.length);
                  });
                  break;

              }
            });

          donors.indiv = _.map(donors.indiv, function(amount, donor){
            return {contributor_payee: donor, sum: amount};
          });
          donors.indiv.sort(sortEntry);

          donors.corp = _.map(donors.corp, function(amount, donor){
            return {contributor_payee: donor, sum: amount};
          });
          donors.corp.sort(sortEntry);

          donors.pac = _.map(donors.pac, function(amount, donor) {
            return {contributor_payee: donor, sum: amount};
          })
          donors.pac.sort(sortEntry);

          _.each(donors.pac, function(val) {
            if (_.has(committee_codes, val.payee)) {
              val['filer_id'] = committee_codes[val.payee];
            }
          });

          expenditures = _.map(expenditures, function(val, key) {
            return {
                purpose_code: key,
                total: val
            };
          });
      
          return {contributions:contributions,expenditures:expenditures, donors: donors};
}


var Campaign = React.createClass({
    mixins: [StateMixin],
    getInitialState: function() {
        return {
            title: ''
        };
    },
    componentDidMount: function() {
        var campaignId = this.getParams().campaignId;
        /* General Sum Statistics */
        API.getCommitteeDataById(campaignId, _.bind(function(err, res){
            this.setState({
                campaignData: res[0],
                title: res[0].candidate_name
            })
        }, this));

        /* Money State map*/
        API.getStateDataById(campaignId , _.bind(function(err, res){
            this.setState({
                moneyByState: res
            })
        }, this));

        // /* Funding Expenditurs*/
        API.getDateDataById(campaignId, _.bind(function(err, res){
            this.setState({
                fundingExpenditures: res
            })
        }, this));

        /* All other stuff, top contributors, spending, etc*/
        API.getTransactionDataById(campaignId, _.bind(function(err, res) {
            var data = processTransactions(res);
            this.setState({
                contributions: data.contributions,
                individualContributors: data.donors.indiv,
                businessContributors: data.donors.corp,
                comitteeContributors: data.donors.pac,
                spending: data.expenditures
            })
        }, this))



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
                <Spending 
                    dataSet={this.state.spending}
                />
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
                    key={key}
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
        var contributionElements = _.map(contributors, function(contributor) {
            if (_.isEmpty(this.state[contributor.key])) {
                return null;
            }

            return (
                <div className="col-sm-6 col-xs-12">
                    <Contributors
                        key={contributor.key}
                        title={contributor.title}
                        contributors={this.state[contributor.key]}
                    />
                </div>
            )
        }, this)
        return (
            <div className="row">
                {contributionElements}
            </div>  
        );
    },
    getRaised: function() {
        if (this.state.campaignData) {
            return (
                    <Raised 
                        amount={CurrencyFormat(this.state.campaignData.in || this.state.campaignData.total)}
                    />
            )
        }
        return null;
    },
    getSpent: function() {
        if (this.state.campaignData) {
            return (
                    <Spent 
                        amount={CurrencyFormat(this.state.campaignData.out || this.state.campaignData.total_spent)}
                    />
            )
        }
        return null;
    },
    getGrassrootsRadial: function() {
        if (this.state.campaignData) {
            return (
                    <GrassRootsRadial 
                        percent={(this.state.campaignData.total_grass_roots/this.state.campaignData.in) || (this.state.campaignData.grassroots/this.state.campaignData.total)}
                    />
            )
        }
        return null;
    },
    getInDistrictRadial: function() {
        if (this.state.campaignData) {
            return (
                    <InDistrictRadial 
                        percent={(this.state.campaignData.from_within/this.state.campaignData.in) || (this.state.campaignData.instate)}
                    />
            )
        }
        return null;
    },
    render: function() {
        return (
            <DocumentTitle title={"Behind The Curtain - " + (this.state.title || '')}>
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

module.exports = Campaign;