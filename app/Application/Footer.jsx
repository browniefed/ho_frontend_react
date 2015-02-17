var React = require('react/addons'),
    Router = require('react-router'),
    SocialButtons = require('hackoregon/components/SocialButtons'),
    Link = Router.Link;


var Footer = React.createClass({
    render: function() {
        return (
            <div className="footer" role="navigation" id="footer-nav">
              <div className="container">
                <div className=" col-sm-12 col-md-10 col-md-offset-1">
                  <div className="col-sm-12 col-md-11 col-md-offset-1">
                    <div className="row">
                      <div className="col-sm-3 social-media-thumbnails">

                          <h4>Hack Oregon</h4>
                          <SocialButtons />

                      </div>
                      <div className="col-sm-3">
                        <h4 className="underlined">ABOUT</h4>
                        <div><Link to="about">Behind the Curtain</Link></div>
                        <div><Link to="faq">FAQ</Link></div>
                      </div>
                      <div className="col-sm-3">
                        <h4 className="underlined">EXPLORE</h4>
                        <div><Link to="search">Search Campaigns</Link></div>
                        <div><Link to="oregon">View All Oregon</Link></div>

                      </div>
                      <div className="col-sm-3">
                        <h4 className="underlined">TAKE ACTION</h4>
                        <div><a href="https://secure.sos.state.or.us/orestar/vr/register.do?lang=eng">Register to Vote</a></div>
                        <div><a href="http://www.vote411.org/">Voter Guide</a></div>
                        <div><a href="http://www.hackoregon.org/">Join Us</a></div>
                      </div>
                    </div>
                    <div className="row">
                    <p></p>
                    <p></p>
                      <p className="text-center text-muted">
                        <a href="http://hackoregon.org">hackoregon.org</a> / Portland, Oregon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
});

module.exports = Footer;