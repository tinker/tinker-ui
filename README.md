**First things first:** this repository is still heavily under construction and
as such, nothing is set in stone, everything can be changed at any time.

# Tinker UI

Tinker UI is the frontend portion of Tinker. While Tinker was originally written
in Ruby, one idea I've always had, is that it would be awesome if the backend is
interchangeable. Separating the UI code is the first step in that direction.


## So... what does this thing do?

Ideally, a standard Tinker app would be built from two components, the UI and
your backend of choice. These two would be tied together to make the final
result. This is the goal.

However, to get there we'll take a few steps. First thing on the list is to
separate (almost) all the UI-related code (css, js, templates) into this
repository, which will then be included in the existing [tinker][tinker]. Tinker
UI will provide a specification of which calls in the backend it requires on,
and it's then up to your backend of choice to implement those calls.


## How do I use it?

Tinker UI isn't supposed to be used on it's own (for now), it depends on a
backend to provide rendering of a page that includes the scripts. So the steps
that are shown here are mainly for maintainers of the backend, they should try
and integrate this into the build/deploy mechanism of choice.

### How to integrate

Ideally, you'll have this project as a submodule of your backend (for now), in
the root of the project: `git submodule add
https://github.com/chielkunkels/tinker-ui ui`. In a ruby project, this would
leave me with a working tree that looks something like this:

```
.
|- config.json
|- config.ru
|- public/
|- ui/ <- this would be the submodule
`- views/
```

I'll assume this directory structure when running commands in the rest of this
readme.

### Setting up

You will first need to install tinker-ui's dependencies, some of which come as
submodules, others which come as npm packages. Running `npm install` and `git
submodule update --init --recursive` in the tinker-ui root directory should do
the trick.

To get started with developing, the easiest thing is to use the `./bin/devsetup`
script. It takes a single argument which is the public directory of your app. In
case of a ruby app with a structure similar to the above, we might exercute a
command like `./ui/bin/devsetup public`.

### Compiling for production

To compile all the css, javascript and templates, you will have to have all
dependencies installed (covered in the next section). Once you have done that
you can simply issue:

```
$ ./ui/bin/build public
```

Where the first argument is the directory where you want the compiled files to
be placed.

### Dependencies

Tinker UI has a few dependencies, other than of course being part of your
project. A lot of these are actually only needed during development. They come
either as [npm][node] modules, or are simply included as submodules in the
project, in the `vendor` directory. Depending on your deployment strategy you
won't even have to fetch the Tinker UI submodule on your production machine, if
you deploy the precompiled files.

During development and to compile you will need to fetch Tinker UI + it's
submodules though, which you can do by running `git submodule update --init
--recursive`, this gets everything you need to compile and develop.

#### MooTools

Tinker UI is written on top of the MooTools javascript framework. You have two
options when it comes to obtaining it.

1. You can build it based on the included submodule (requires php) by running:
	`./ui/vendor/mootools-core/build > ./public/mootools.js`
2. You can simply download it from [the website][mootools]

#### Wrapup

The javascript code follows a CommonJS format, and is prepared for the browser
using [wrapup][wrapup], to install this, you need [node + npm][node]. Once you
have wrapup installed, you can compile it by using the `wrup` cli tool. In the
root of your project run:

```
$ wrup -r ./ui/src/js/init.js -o ./public/tinker.js
```

Basically you'll want to set `-o` to wherever your backend serves public assets
from (in case of most ruby projects, `/public/`). You can also use the `-w` flag
during development to make it watch for changes and auto-compile.

#### LESS

All the css is written in less modules to allow for maximal decoupling and
separation, to install this you need [node+npm][node]. Once you have less
installed, go to the root folder of your project and simply the line below to
compile the css:

```
$ lessc -x ./ui/src/css/init.less ./public/tinker.css
```

Again, this assumes the above directory structure.

#### Slab

Tinker UI uses [slab][slab] as the templating engine of choice, it allows you to
compile your templates down to javascript function, so you can use those in
production instead. I wrote a small utility script called [slab
loader][slab_loader] which allows slab to be used more easily during
development, by using synchronous XHRs and compiling on-the-fly.

When it comes to compiling for production, the easiest thing to do, is
concatenate all the slab files in `./src/tpl` into one string, and run that
through the slab cli compiler. That way we'll get a single object of template
functions, which can then be concatenated with the rest of the JS files, and
registered with `slab.register` (provided by slab-loader).

[tinker]: https://github.com/chielkunkels/tinker
[mootools]: http://mootools.net/
[wrapup]: https://github.com/kamicane/wrapup
[node]: http://nodejs.org/#download
[slab]: https://github.com/keeto/slab
[slab_loader]: https://github.com/chielkunkels/slab-loader

