var React = require('react/addons'),
    Router = require('react-router'),
    Link = Router.Link,
    StateMixin = Router.State;

var Nav = React.createClass({
    mixins: [StateMixin],
    render: function() {
        return (
            <nav className="navbar navbar-default" role="navigation" id="main-nav">
                <div className="container">
                  <Link to="home" className="navbar-brand navbar-left">
                    <img className="tiny-logo" src="/images/new_logo_1.png" />
                  </Link>
                  <div className="navbar-header" id='nav-header'>
                    <ul className="nav navbar-nav navbar-right">
                        <li className={this.isActive('search') ? 'selected' : ''}><div><Link to="search">Search</Link></div></li>
                        <li className={this.isActive('oregon') ? 'selected' : ''}><div><Link to="oregon">Oregon</Link></div></li>
                        <li className={this.isActive('about') ? 'selected' : ''}><div><Link to="about">About</Link></div></li>
                        <li className={this.isActive('faq') ? 'selected' : ''}><div><Link to="faq">FAQ</Link></div></li>
                    </ul>
                  </div>
                </div>
            </nav>             
        )
    }
});

module.exports = Nav;