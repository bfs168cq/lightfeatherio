# ReadMe for lightfeatherio

Introduction

The project is created for code challenge within 48 hours. Folllowing technologies are used.

1. Asp.net Core 8.0 Web API
2. JWT token authentication
3. React 18.2 for front-end
4. React Bootstrap 5.x for form rendering
5. React axios for http request

Following Tools are used

1. Visual Studio 2022 Community version
2. VSCode
3. Docker Desktop
4. Newly created github account
5. Git bash

Instruction to run the project

1. Install docker desktop - https://docs.docker.com/desktop/install/windows-install/
2. Start docker desktop.
3. Download the project code through git clone or zip download
4. Open DOS prompt, and change path to apps subfolder
5. Run the command "docker-compose build". This will build and publish two applications (front=end and back-end) to docker desktop. The process will take a while. Note: due to PC power, sometimes you may need to re-run the command if failed due to some network error.
6. RUn command "docker-compose up". This will start both frontend application and backend web api application. Note: it might take a while depending on your PC power.
7. Open browser to http://localhost:3000
8. Enjoy the demo. The default login is display on the login page.

