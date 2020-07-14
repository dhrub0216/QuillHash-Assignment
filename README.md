# QuillHash-Assignment

Architectural Structure of Project- 
Server.js->app.js->Router->Controller->Service

First server.js (HTTP server) is created.Then express app is loaded where middleware are executed. Then the file (app.js) directs to router file(index.js) which directs to router file(loginRoutes.js). Router is created to route the request received from website/Postman. Then it redirects to relevant controller(authController.js & nginxController.js). The controller manipulates with dat if required and send the request to Services(authService.js and NginxlogService.js). 

In AuthService.js, the execution of registering a user, logging in with username & password , and validation with token is carried out. 

In nginxlogService.js, the execution of fetching files and filtering with the help of different parameters is carried out.
