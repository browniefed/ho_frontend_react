var React = require('react/addons'),
    DocumentTitle = require('react-document-title');


var FAQ = React.createClass({
    render: function() {
        return (
            <DocumentTitle title="Behind The Curtain - FAQ">
                <div className="container faq">
                    <h2>FAQ</h2>

                    <div>
                        <h4>Why does this information matter to me?</h4>
                        <div>
                            While it’s easy to look up a record of individual campaign finance transactions, not everyone is able to look at a spreadsheet of financial history and understand the motives and influences driving the machinery of local elections. It’s even hard for campaign professionals and journalists to do that. The Behind the Curtain app uses technology to visualize campaign finance data in a more meaningful way and -- at the best of times -- let the data tell its own story.
                            <br />
                            <br /> 
                            Ultimately, we believe that voters want to be informed, and using tools rooted in real data that can filter through the noise of campaign-driven media and third party reporting is fundamental to empowering honest democracy in the post-internet era.
                        </div>
                    </div>

                    <div>
                        <h4>I’m bored.  Is that wrong?</h4>
                        <div>
                                Well, not all campaign finance data is interesting. And there’s a lot of data here.
                                <br />
                                <br /> However, some of the time it IS interesting. With a resource like Behind the Curtain in Oregon, we now have the ability to quickly spot and share potentially impactful insights that drive our election process, but often go unnoticed.
                                <br />
                                <br /> The best part, sharing these visualizations is free and adds a powerful point of recognition to admirable or abusive campaign practices.
                                <br />
                                <br /> Just think: if people running for office knew that everyone could see what they were doing, how does that affect their choices and priorities?
                        </div>
                    </div>

                    <div>
                        <h4>
                            Why are we spending millions and millions of dollars on Broadcasting and Print media?  I watch Hulu and throw flyers in the trash.
                        </h4>
                        <div>
                            For bigger campaigns, you’re probably looking at a lot of money getting raised from a combination of sources which could include various proportions of business, PACs, large and small donor contributions. You might also notice most of that money is getting poured into printed pamphlets and TV advertising.
                            <br />
                            <br /> Campaigns spend money on two broad objectives: donor acquisition and voter acquisition. That means that when a campaign raises money from a large donor, the main objectives is to spend it on getting as many votes as possible. Most of the time, that equals spending money on media to get your attention.
                            <br />
                            <br /> In the digital world we live in, getting information out to large groups doesn’t have to be expensive. Every time that you use our program to share a point of view rooted in real data, not rhetoric, you are sending a message about where you stand as a voter. It’s free, and it sends a strong message that your vote can’t be bought with advertising dollars.
                            <br />
                            <br /> Oddly enough, if campaigns know they have the support of voters, you’re helping to free them from the influence of deep pockets they need to meet enormous advertising costs.
                        </div>
                    </div>

                    <div>
                        <h4>For data scientists, your visualizations look pretty simple.</h4>
                        <div>
                            Did you think so? We’re happy about that.
                            <br />
                            <br /> We realized after our first round of user-testing that most people aren’t used to interacting with data as a way to learn about something they don’t understand. For many of us, politics can be one of those subjects that is rooted in a lot of myth, misinformation, and intense emotional reactions. On top of that, the real impact of local politics can seem even more opaque. Making something for everyone that can use data (scary) as a way to make sense of local elections (what?) is a challenge that called for constant editing, and we killed a lot of our darlings.
                            <br />
                            <br /> All the things that we learned and built that didn’t make this initial launch, truly deserves its own blog post. Look forward to that on <a href="http://www.hackoregon.org">hackoregon.org</a>.
                        </div>
                    </div>

                    <div>
                        <h4>Is your group affiliated with anyone?</h4>
                        <div>
                            Hack Oregon is an independent non-profit and we make our own decisions and do our best to treat the data in a way that it speaks for itself.
                        </div>
                    </div>

                    <div>
                        <h4>Who is sponsoring you?</h4>
                        <div>
                            This project is possible because of enormous dedication from volunteer developers, designers, and context experts. The motivation to demonstrate the potential of what is possible when public data is transformed into a visual, easy to understand format made it so that we were able to pull this off with very little funding.
                            <br/>
                            <br/> We know that moving forward, projects like this are not sustainable without strong organizational support. If you appreciate what we’ve done, please consider signing up as a volunteer or making a contribution at <a href="http://www.hackoregon.org" target="_new">hackoregon.org</a>.

                            <br />
                            <br /> A special thanks to <a href="http://portlandcodeschool.com">Portland Code School</a>, <a href="http://periscopic.com">Periscopic</a>, and <a href="http://instrument.com">Instrument</a> who graciously allowed us to occupy their offices on many weekday evenings. A special thanks to <a href="http://portlandcodeschool.com">Portland Code School</a>, <a href="http://periscopic.com">Periscopic</a>, <a href="http://www.graphalchemist.com/">Graph Alchemist</a>, <a href="http://instrument.com">Instrument</a>, <a href="http://squishymedia.com/">Squishy Media</a> and <a href="http://www.crowdcompass.com/">Crowd Compass</a> who graciously allowed us to occupy their offices on many weekday evenings.
                        </div>
                    </div>
                    
                    <div>
                        <h4>Where did you get the data? </h4>
                        <div>
                            Campaign finance data is one of the most transparent public knowledge banks available thanks to federal and state reporting laws. All of our data comes directly from the <a href="https://secure.sos.state.or.us/orestar/GotoSearchByName.do">Oregon Secretary of State's website</a>.
                        </div>
                    </div>
               
                    <div>
                        <h4>Why have some campaigns spent more money than they have raised?</h4>
                        <div>
                            Although many incumbent campaigns have rolling accounts from previous elections, we had to start our calculations somewhere.
                            <br/>
                            <br/> The data you are seeing begins in November 2010, which is our best approximation of relevant "last election cycle" in relations to most campaigns. There's no true definition for the start of fundraising seasons for campaigns.
                            <br/>
                            <br/> If a candidate had money remaining from a campaign prior to Nov 2010, this amount is not accounted in our totals. Therefore, these campaigns may appear to have spent more than they have raised.
                            <br/>
                            <br/>
                        </div>
                    </div>
                     
                    <div>
                        <h4>How current is your data?</h4>
                        <div>
                            The Oregon Secretary of State does not have the kind of infrastructure where data is easily transferred from their website into a language we can use for analysis or web work. We can solve some this problem by running a scraper which copies text from the Oregon Secretary of State’s webpage and into our own database, although it’s far from an ideal solution.
                            <br/>
                            <br/> It’s not unusual for government websites not to have API’s (a computer to computer interface), and it’s part of a larger problem in the civic tech space. This small problem only begins to describe the barriers to having “open data” that is can be readily used for projects like this one.
                            <br/>
                            <br/> We scrape our data daily in an attempt to provide the most current information as possible. Due to the structure of their site, our scrapers do occasionally miss some of the data and we can’t guarantee that all of our data is 100% accurate and up to date. To help catch incongruities, each record generated on our site provides the number of transactions that our data is using to calculate our totals. For the most current transaction data please visit the <a href="https://secure.sos.state.or.us/orestar/GotoSearchByElection.do">Oregon Secretary of State’s website</a> and search for the campaign or candidate you are looking for.
                        </div>
                    </div>
                
                    <div>
                        <h4>How did you compute the contribution results?</h4>
                        <div>
                            Transactions for the current campaign cycle are filtered based on the way campaigns classify their contributions. After filtering by type of transaction contribution amounts are added together to get the total for that category.
                            <br />
                            <br /> Contributions from Individuals
                            <br /> Book type: "Individual"
                            <br /> Sub type: "Cash Contribution" and "In-Kind Contribution"
                            <br />
                            <br /> Contributions from Committees
                            <br /> Book type: "Political Committee" and "Political Party Committee"
                            <br /> Sub type: "Cash Contribution" and "In-Kind Contribution"
                            <br />
                            <br /> Contributions from Businesses
                            <br /> Book type: "Business Entity"
                            <br /> Sub type: "Cash Contribution" and "In-Kind Contribution"
                        </div>
                    </div>
           
                    <div>
                        <h4>How do you calculate for Cash vs In-Kind Contributions?</h4>
                        <div>
                            An in-kind contribution is a gift of services or goods, but in the transaction history these gifts are assigned a cash value. We have not made a distinction in our records between cash and cash value of gifts, but if you are curious you can <a href="https://secure.sos.state.or.us/orestar/gotoPublicTransactionSearch.do">look up the transaction history</a> to see a description on the Secretary of State's website.
                            <br />
                            <br /> As a note, we have excluded "pledges of cash" from our accounting, where the Secretary of State will include these figures in summary reports.
                        </div>
                    </div>
            
                    <div>
                        <h4>Are you open source?</h4>
                        <div>
                            Yes, absolutely.
                            <br/>
                            <br/> If you are not from Oregon, and would like information about how to use our code to build a Behind the Curtain Project in your state email us at <a href="mailto:hello@hackoregon.org">hello@hackoregon.org</a>.
                        </div>
                    </div>
                    
                    <div>
                        <h4>How can I compare candidate visualizations side by side?</h4>
                        <div>
                            We really wish that we had time to make a feature for that, but you'll have to wait for version 2.0!
                            <br/><br />
                            In the meantime, we understand that some visualizations derive entirely more meaning from strategic comparison. We encourage you to screenshot images or tell us about your creative solutions.
                            <br/>
                            <br/>
                            <a href="mailto:hello@hackoregon.org">hello@hackoregon.org</a>
                        </div>
                    </div>

                    <div>
                        <h4>Tell me more about that shaded map.</h4>
                        <div>
                            In this map, states are shaded by how much money was sent from a particular state to an Oregon Political Action Committee (PAC) or Candidate. This map represents the current election cycle (November 11, 2010 to present).
                            <br />
                            <br /> To find the amount of money contributed to or spent by Oregon PACS, we used the following transaction fields from the ORESTAR database:
                            <br />
                            <br /> Contributions: Cash contribution, in-kind contribution, items sold at fair market value, loan forgiven (non-exempt), interest/investment income
                            <br />
                            <br /> Expenditures: Cash expenditure, expenditure made by agent, personal expenditure for reimbursement, miscellaneous other receipt, lost or returned check, miscellaneous other disbursement, return or refund of contribution, uncollectable pledge of cash, uncollectable pledge of in-kind
                            <br />
                            <br /> Find out more about each of these fields <a href="http://sos.oregon.gov/elections/Documents/campaign-finance.pdf">here</a>.
                            <br />
                            <br /> We merged the contributions and expenditures from DC with Maryland to make the money flowing through DC appear more readily on the map.
                            <br />
                            <br /> Although not visualized on the statewide map, there have been many contributions from countries outside of the US, such as the UK and Australia.
                        </div>
                    </div>
                    
                </div>
            </DocumentTitle>
            );
    }
});

module.exports = FAQ;