# Tinker UI

Tinker UI is the frontend portion of Tinker. While Tinker was originally written
in Ruby, one idea I've always had, is that it would be awesome if the backend is
interchangeable. Separating the UI code is the first step in that direction.

## Philosophy

If we strip Tinker down to it's bare essentials, it's a sandboxing app. Nothing
more. All you really want to be able to do is push a stack of dependancies
(javascripts, stylesheets) in, along with the code you have written yourself,
and it should just go ahead and render that. All the UI does, is make some of
these things easier for you. The options dialog is just there for you to more
easily manage your dependancies. In the end, it should be entirely optional.

## So... what does this thing do?

The Tinker UI project provides the javascript and css necessary to build up the
Tinker interface. Ideally this is included as a submodule of the backend
project. For example, tinker.rb could have tinker-ui as a submodule, and then
provide the necessary API calls etc that the UI depends on.
