all:
	build-dependencies build-base bash
	apk add nodejs nodejs-npm 
	npm -g install nodemon
	npm install 
	cleanup