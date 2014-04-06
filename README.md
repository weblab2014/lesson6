# XMLHttpRequest Client/Server

Copyright (C) 2014, Uri Shaked.

## Instructions

Steps to run this project:

1. Install all node.js dependencies. Run the following command:

	npm install

2. Start the server. Run the following command:

	node server.js

3. Open your web browser and go to http://localhost:8296/

## Project structure

Actual code:
* `server.js` - The server-side (node.js) code. Utilizes the [express](http://expressjs.com/) web application framework.
* `client/index.html` - The HTML for the client-side code
* `client/highscore.js` - The javascript for the client-side code. You will find the actual XMLHttpRequest example inside.
* `client/highscore.css` - The stylesheet for the client-side code
* `client/ajax-loader.gif` - A simple spinner animation, generated using [ajaxload](http://www.ajaxload.info/).

Supporting files:
* `package.json` - A npm (node package manager) files that declares the dependencies for our node.js project. This is then file that tells npm that we use the 'express' framework, and which version we want it to install.
* `node_modules/` - This directory is automatically created by npm and contains our dependencies (e.g. the express framework)
* `.gitignore` - A file that tells git to ignore the node_modules directory (so it never gets shared)
* `.editorconfig` - Tells our editor how to indent our code (using tabs / spaces, etc.). See [editorconfig.org](http://www.editorconfig.org/) for more details.
* `README.md` - This file, written using the "Markdown" syntax. Github formats it and displays it nicely on our project page.

## License

All code released under the MIT license.
