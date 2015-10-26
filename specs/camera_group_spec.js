var frisby = require('C:/Users/root/AppData/Roaming/npm/node_modules/frisby');
var helpers = require('../lib/helper');
var logger = require('../lib/logger');
var config = require('../config');
var log = logger.log;


describe("Camera Group Api Tests", function() {

log.info('Going to run Camera Group Api Tests on ' + config.api_url);

var random_number = helpers.randomInt(1000000, 9999999).toString()
var camera_group_name = "camera_group" + random_number
var camera_group_description = "camera_description" + random_number

log.info('Going to run create camera group api test.');

// create camera group
frisby.create('Create camera group')
	.post(config.api_url+ 'cameragrps/?createTime=2015-08-26 20:12:12&description='+camera_group_description+'&groupName='+camera_group_name+'&cameraId=1,2&isSysDefault=false')
        .expectStatus(200)
            .afterJSON(function(id) {
                log.info('The id for the created camera group is: ' + id);
                expect(id).toEqual(jasmine.any(Number));
      
                // delete camera group
                log.info('Going to run delete camera group api test.');
                    frisby.create('Delete the Camera Group Test.')
                        .delete(config.api_url+ 'cameragrps/'+id+'?requestUserId=1')
                            .expectStatus(200)
                        .toss();
                    })          
    .toss();

log.info('Going to run Ensure Camera Group Api Test.' );

frisby.create('Ensure Camera Groups')
    .get(config.api_url+'cameragrps/50/')
        .expectStatus(200)
        .expectHeader('content-type', 'application/json')
        .expectHeaderContains('Content-Type', 'json')
        .expectJSON(
            {
                cameraGroupId: 50,
	            isDeleted: false,
	            type: 'SELF'
            }
        )
    .toss();
});
