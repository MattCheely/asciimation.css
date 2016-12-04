# asciimation.css

This is a library of pure CSS ASCII animations.

## Demo

https://mattcheely.github.io/asciimation.css/


## Development

After checking out the repo, run `gulp host` and navigate to http://localhost:8080 to see the demo page. The demo will be automatically rebuilt when source files change.

### Adding animations

To add an animation, create a new file in `src/animations` with your animation's name. The animation file's format is as follows:

*Line 1: JSON with animation parameters.*

`height`: The height in lines of each animation frame (mandatory)  
`duration`: The duration of the animation (e.g. 5s) (mandatory)  
`width`: The width (in characters) of each frame. The animation builder will try to figure this out for you, even if you have some combining unicode characters, but if it doesn't work you can manually specify it here.

*Line 2: Ignored.*

*Lines 3 and up: Frames, first-to-last, whith an ignored line between each frame.*

Each line of each frame should be the same width. The animation builder will not
pad them for you. Each frame must have the same height, in lines. Frames should be
separated by a single line, which will be ignored, and can have any content in it.

If this description isn't clear to you, take a look at the existing animations,
and it should be self-evident.

