# VivoDash Angular
## Responsive, agularjs, bootstrap powered admin style dashboard

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/)) (version v7.1.0)
* [Bower](http://bower.io) (version 1.8.0)
* [Gulp](http://gulpjs.com) (version 3.9.1)

### Installation
1. Clone the repository: `git clone https://github.com/xcodersun/vivodash.git`
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on [http://localhost:8888](http://localhost:8888).

Ensure your preferred web server points towards the `dist` directory.

### Development
Continue developing the dashboard further by editing the `src` directory. With the `gulp` command, any file changes made will automatically be compiled into the specific location within the `dist` directory.

#### Modules & Packages
By default, VivoDash Angular includes [`ui.bootstrap`](http://angular-ui.github.io/bootstrap/), [`ui.router`](https://github.com/angular-ui/ui-router) and [`ngCookies`](https://docs.angularjs.org/api/ngCookies), [`angular chart.js`](https://jtblin.github.io/angular-chart.js/#reactive). 

If you'd like to include any additional modules/packages not included with VivoDash Angular, add them to your `bower.json` file and then update the `src/index.html` file, to include them in the minified distribution output.

## Credits
VivoDash Anuglar
* [Alex Sun](https://github.com/xcodersun)

rdash-angular
* [Elliot Hesp](https://github.com/Ehesp)
* [Leonel Samayoa](https://github.com/lsamayoa)
* [Mathew Goldsborough](https://github.com/mgoldsborough)
* [Ricardo Pascua Jr](https://github.com/rdpascua)
