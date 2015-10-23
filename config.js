/*
Included reference.
*/
var helper = require('./shared/helper.js');
var login = require('./shared/login.js');
var htmlReporter = require('./lib/node_modules/protractor-html-screenshot-reporter');
var path = require('path');

var appUrl = 'https://172.16.15.136/CityEyes/login.zul';

/*
A reference configuration file.
*/
exports.config = {
    /* ----- How to setup Selenium ----- 
    There are three ways to specify how to use Selenium. Specify one of the
    following: 
    1. seleniumServerJar - to start Selenium Standalone locally.
    2. seleniumAddress - to connect to a Selenium server which is already
    running.
    3. sauceUser/sauceKey - to use remote Selenium servers via SauceLabs.
    
    /*    
    The location of the selenium standalone server .jar file.
    */
    seleniumServerJar: './lib/selenium-server-standalone-2.43.1.jar',

    //seleniumAddress: 'http://localhost:4444/wd/hub',

    /*
    The port to start the selenium server on, or null if the server should
    find its own unused port.
    */
    //seleniumPort: null,

    /*
    Chromedriver location is used to help the selenium standalone server
    find chromedriver. This will be passed to the selenium jar as
    the system property webdriver.chrome.driver. If null, selenium will
    attempt to find chromedriver using PATH.
    */
    //chromeDriver: './lib/chromedriver',

    // If chromeOnly is true, we dont need to stand the selenium server.
    // If you want to test with firefox, then set this to false and change the browserName
    chromeOnly: false,

    capabilities: {
        'browserName': 'chrome',
        'platform': 'ANY',
        'version': 'ANY',
        'chromeOptions': {
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': process.cwd() + '/downloads/',
                },
            },
        },
    },

    /*repo
    The timeout for each script run on the browser. This should be longer
    than the maximum time your application needs to stabilize between tasks.
    */
    allScriptsTimeout: 240000,
    getPageTimeout: 240000,
    allScriptsTimeout: 240000,

    /*
    ----- What Tests To Run -----
    Spec patterns are relative to the location of this config.
    */
    specs: [
        'shared/spec-helper.js',
        'appTests/appKup/smokeTest/bvt_Test.js'
    ],

    /*
    A base URL for your application under test. Calls to protractor.get()
    with relative paths will be prepended with this.
    */
    baseUrl: appUrl,

    /*
    ----- Options to be passed to minijasminenode -----
    */
    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 240000
    },

    /*
    Object Global Parameters.
    */
    params: {
        language: {
            // app languages will be 'English', 'ChineseTraditional' & 'ChineseSimplified'
            appLanguage: 'English',
        },
        login: {
            url: appUrl,
            user: 'admin',
            password: 'password',
            userEmail: 'manish@ironyun.com',
        },
    },

    /*
    A callback function called once protractor is ready and available, and
    before the specs are executed
    You can specify a file containing code to run by setting onPrepare to
    the filename string.
    */
    onPrepare: function () {
        require('./lib/node_modules/jasmine-reporters');
        // add a reporter
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
        // add a reporter and store screenshots to `screenshots`
        jasmine.getEnv().addReporter(new htmlReporter({
            baseDirectory: 'reports', pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                return path.join(capabilities.caps_.browserName, descriptions.join('-'));
            }
        }));
        // sets the amount of time to wait before throwing an exception that it cannot find the element on the page.
        browser.manage().timeouts().implicitlyWait(5000);
        // sets the amount of time to wait for a page load to complete before throwing an error. If the timeout is negative, page loads can be indefinite.
        browser.manage().timeouts().pageLoadTimeout(240000);
        // ignore synchronize with the page when the service is communicating with the api
        browser.ignoreSynchronization = true;
        // browse application url
        browser.get(appUrl, 10000);
        // delete cookies
        browser.manage().deleteAllCookies();
        // set browser window
        browser.manage().window().maximize();
        // user login
        login('correct', browser.params.login.user, browser.params.login.password);
    }
};
