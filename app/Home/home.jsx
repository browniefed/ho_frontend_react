var React = require('react/addons'),
	Router = require('react-router'),
	Link = Router.Link;

var LandingSearchIcon = require('hackoregon/icons/LandingSearch'),
	LandingOregonIcon = require('hackoregon/icons/LandingOregon');

var Home = React.createClass({

	render: function() {
		return (
			<div className="container home">

			  <div className="row">
			    <div className="col-xs-12">
			      <img className="header img-responsive" src="/images/new_logo_3.png" alt="Behind the Curtain" />
			    </div>
			  </div>


			  <h3>Lifting the Veil Off Local Campaign Finance</h3>
			  <div className="container">
			    <div className="row">
			      <div className="center-block">
			        <div className="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-3 search-home">
			          <Link to="search">
			          <div className="spacer">
			          	<LandingSearchIcon className="img-responsive" />
			          </div>
			          </Link>
			        </div>
			        <div className="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-0 col-md-3 view-all">
			          <Link to="oregon">
			          <div className="spacer">
			          	<LandingOregonIcon className="img-responsive" />
			          </div>
			          </Link>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
});


module.exports = Home;