const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const sitemap = require('metalsmith-sitemap');
const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('date', function (date) {
    return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'My site',
            description: "My super sweet Metalsmith site on Netlify.",
            generatorname: "Metalsmith",
            generatorurl: "http://metalsmith.io/",
            generatortitle: "Check out Metalsmith!",
            hostname: "Netlify",
            hosturl: "https://netlify.com/",
            hosttitle: "Learn more about Netlify"
        }
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(drafts())
    .use(collections({
        notes: {
            pattern: 'notes/*.md',
            sortBy: 'date',
            reverse: true
        },
        projects: {
            pattern: 'projects/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(markdown())

//    .use(permalinks())

    .use(permalinks({
      relative: false,
      pattern: ':title'
    }))

    .use(layouts({
        engine: 'handlebars',
        directory: 'layouts',
        default: 'default.hbs',
        partials: 'layouts/partials'
    }))
    .use(sitemap({
        hostname: "https://jinesh.org"
    }))
    .build(function (err) {
        if (err) throw err;
    });
