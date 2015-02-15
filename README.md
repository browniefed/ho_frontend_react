# Welcome to the HackOregon front end app!

## Philosophy
The core Hack Oregon application is meant to expose answers to 4 main questions about campaign finance using open data:
 * **who?**  Who is being funded, and by which PACs, Corporations, and individuals.
 * **what?**  What are the outcomes of campaign finance dollars at work?  (good or bad)
 * **when?**  When do cycles of campaign and funding take place and how does this effect the political process and civic life?
 * **where?** What does the breakdown of donors/funders look like in Oregon and how does 'place' effect the political process?

## Getting started
We're using webpack for our build system.
```
#Install webpack:
npm install -g webpack
git clone <this_repo>
cd <this_repo>

#install node packages
npm install
```

Once everything is installed run:

``` text
# start the webpack-dev-server in HMR mode
npm run hot-dev-server
# wait for the first compilation is successful

# in another terminal/console
# start the node.js server in development mode
npm run start-dev

# open this url in your browser
http://localhost:8080/
```

## Getting acquainted with things
Hack Oregon's front end is contained in an [React JS app](http://reactjs.org).

Additionally, we are using [SASS](http://sass-lang.com/) which compiles into css and [coffeescript](http://coffeescript.org).

**Adding new styles:** add a partial to the styles folder e.g. `_mypartial.scss` and then include the partial in the `main.scss` file with an import statement `@import 'mypartial';`


## Contributing
You probably have some amazing ideas, and things you'd like to contribute - we'd love to include them.  Here's how:
```bash
# fork this repo
git clone <your_fork>
git checkout -b <your_awesome_new_feature>
git branch -D master
# hack away!
```
## Wireframes
https://gomockingbird.com/mockingbird/#44apvbt/sCsPR

When you feel like you are ready for your visualization or enhancement to be included, submit a pull request.  There may be some things to change (especially if you are working on the core application) and we'll work together to get things running nicely.

<!-- If you are working on a visualization that is not one of the 'who', 'what', etc. parts of the application, pick a unique name for your visualization and then you can include everything you need under the `community` folder.  Convention is to use the name of your viz as the prefix for any components you add to the app.  E.g. if you are creating a new directive for your feature, it should live in the `app/scripts/directives/community` folder and if the route is `mynewfeature` you should call the file `myNewFeatureDir.{js/coffee}` with a directive of the same name `myNewFeatureDir`.  This can then be used as `<my-new-feature-dir></my-new-feature-div>` within your template. -->

