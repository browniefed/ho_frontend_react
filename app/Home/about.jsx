var React = require('react/addons'),
    DocumentTitle = require('react-document-title');


var About = React.createClass({
    render: function() {
        return (
                <DocumentTitle title="Behind The Curtain - About">
                    <div className="container about">
                        <div className="row">
                            <div className="col-xs-10 col-xs-offset-1">
                                <h2>Our Approach</h2>

                                <p>Behind the Curtain is created by Hack Oregon, a community-powered nonprofit focused on building transparency projects to promote engagement, awareness, and quality of life through data-inspired web projects.  We are committed to transparency for government, privacy for citizens, and a non-partisan and open-source approach to everything we make.</p>

                                <h2>Behind the Curtain is cute, but also important.</h2>

                                <p>
                                    We know that when it comes to public data, transparency doesn’t always equal clarity.  The industry standard for design and technology products today is quite amazing. Most of us expect a charming, responsive, well-executed application just to order a pizza or to book a hotel.
                                    <br /><br />
                                    Most government web technology is a world away from the private sector. The creative and technical talent powering professional web development teams is competitive and expensive. At a time when school districts are struggling to find funding to serve healthy and nutritious lunches, it’s understandable that tax-payer money isn't being used to fund slick data apps.
                                    <br /><br />
                                    In many ways, we have only begun to scratch the surface of how democratization of information can affect our relationship with the place we live.
                                    <br /><br />
                                    Cities are complex organizational structures and —- as you can imagine —- they generate a lot of data. Though much of it is technically “transparent,” it takes a combination of hard work and insight to make data clear.
                                    <br /><br />
                                    Hack Oregon is able to take on projects that are fundamentally needed, but perhaps aren't a natural fit for venture-capital backed business models and shouldn't compete for tax payer dollars.
                                    <br /><br />
                                    It works because we reach across community platforms to bring together special teams of volunteer-professionals for each project we take on. Our process emphasizes visual thinking and interdisciplinary collaboration; while some may call it experimental, we are excited to see what happens when you design for equity of information. Would people trust the system more if they knew what went on behind the curtain? Would they take action if they saw a clear path to change?
                                    <br /><br />
                                    The way we see it, if knowledge is power— data is accountability.
                                    <br />
                                    We’re claiming our power, Oregon.
                                    <br />
                                    <a href="http://www.hackoregon.org/">Join us.</a>
                                </p>
                            </div>
                        </div>
                    </div>    
                </DocumentTitle>    
                );
    }
});

module.exports = About;