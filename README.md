# Smart KV — an easy to use column-based key/value dumper for JSON objects

This project is a lightweight columnar data outputter for JSON key/value pairs. It is meant to be easy configurable but also easy customisable.

## How to use smart-kv

* You can clone the repository: the source code will be under smartKv directory.
* You can add the smartKv.min.js file to your application and then add the module `smartKv.kv` to your own app module. The build includes all the template in the $templateCache
so you need only this file.

## Smart Kv for developers

###The build process

1. install [node.js] (http://nodejs.org/) and run `npm install` to install the required node modules.
2. the build tasks are [Grunt](http://gruntjs.com/).
* if you run `grunt build` it will perform the following operations:
    * transform the template (.html) files into an angular module and load them in the [$templateCache](http://docs.angularjs.org/api/ng.$templateCache) (it will result with the `Template.js` file.
    * concatenate all the source files into a single one (smartKv.js)
    * minify the debug file so you have a production ready file (smartKv.min.js)
* if you run `grunt refApp` the two first steps are the same that the build task, but at the end it will simply copy
the Smart-Table.debug.js into the example-app folder (see below)
* if you run `grunt server` then the task 'grunt build' will be run, and then grunt will load up the example_app via node/connect with a live reload watcher of the underlying source

### The example app
The example app is a running example of the smart-table in action.
To run it :
* run 'grunt server'

### Running unit tests

The unit tests are not actually in place yet.  The code that is there is all still from the Smart-Table project of Laurent Renard's (https://github.com/lorenzofox3/Smart-Table) that this project was based off of.

## Inspiration

This code was inspired by, and started with a fork from, Laurent Renard's amazing Smart-Table package for AngularJS (https://github.com/lorenzofox3/Smart-Table).  Thank you Laurent for such an incredibly useful package to begin with, and a firm foundation for starting this package from.

## License

Smart Kv module is under MIT license:

> Copyright (C) 2013 Jonathan Altman.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

## Contact

For more information on Smart Kv, please contact the author at jonathan.a@gmail.com
