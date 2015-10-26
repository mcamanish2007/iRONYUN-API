var frisby = require('C:/Users/root/AppData/Roaming/npm/node_modules/frisby');
var helpers = require('../lib/helper');
var logger = require('../lib/logger');
var config = require('../config');
var log = logger.log;

describe("User Api Tests", function() {

log.info('Going to run User Api Tests on ' + config.api_url);

log.info('Going to run user login api test.' );

frisby.create('User Login')
    .post(config.api_url+'login?username=admin&pwd=password',  
        { json: true},
        { headers: { 'Content-Type': 'application/json' }})
        .timeout(10000)
            .afterJSON(function(login_status) {
                log.info('The user login status is: ' + login_status);
                expect(login_status).toBeTruthy();            
            })
            .expectStatus(200)
            .expectHeader('Content-Type', 'application/json')
            .expectHeaderContains('Content-Type', 'json')
    .toss();  
});
