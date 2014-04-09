# tinker-ui

Tinker UI provides the UI for the Tinker frontend. It should be used with a
compatible Tinker Client.

## Usage

```shell
$ git clone --recursive https://github.com/tinker/tinker-client.git
$ cd tinkr-client
$ npm install
$ bin/build path/to/public/dir
```

This will drop the compiled javascript `tinker.app.js` and css `tinker.app.css`
in the specified directory

## Development

There's also a small watch script to help ease development. It watches the
javascript and css and will compile when something changes.

```
$ bin/watch
```
