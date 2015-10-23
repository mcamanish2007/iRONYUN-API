var frisby = require('C:/Users/IY0034/AppData/Roaming/npm/node_modules/frisby');
var helpers = require('./helper');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var random_number = helpers.randomInt(1000000, 9999999).toString()
var camera_group_name = "camera_group" + random_number
var camera_group_description = "camera_description" + random_number


frisby.create('Ensure camera groups')
  .get('https://172.16.22.165/CityEyes/rest/cameragrps/50/')
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


frisby.create('User Login')
  .post('https://172.16.22.165/CityEyes/rest/login?username=admin&pwd=password',  
    { json: true},
    { headers: { 'Content-Type': 'application/json' }})
    .timeout(500) 
    .expectStatus(200)
    .expectHeader('Content-Type', 'application/json')
    .expectHeaderContains('Content-Type', 'json')
  .toss();


frisby.create('Create Camera Group')
	.post('https://172.16.22.165/CityEyes/rest/cameragrps/?createTime=2015-08-26 20:12:12&description='+camera_group_description+'&groupName='+camera_group_name+'&cameraId=1,2&isSysDefault=false')
        .expectStatus(200) 
        .toss();

frisby.create('DELETE Camera Group')
  .delete('https://172.16.22.165/CityEyes/rest/cameragrps/164?requestUserId=1')
  .expectStatus(400)
  .toss();
