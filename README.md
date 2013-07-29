shrimp-logger
=============
shrimp is a lightweight JavaScript logging/debugging tool that provides:
- a consistent console UI accross IE8+, Chrome, Firefox, and Safari
- easy access to non-developers such as users or QA testers (just append `#debug` to the URL)

### The problem
Internet Explorer (even IE10) developer tools do not show useful information when logging objects.
For example:

![screen shot 2013-07-27 at 11 26 48 am](https://f.cloud.github.com/assets/158675/867512/fcfe269a-f703-11e2-96dc-986293807962.png)

### The solution

When the shrimp log is opened, this is what it looks like in all supported browsers:

![screen shot 2013-07-27 at 3 14 47 pm](https://f.cloud.github.com/assets/158675/867541/4ee71f60-f70a-11e2-9210-f363a61b31ad.png)

### Install

Include `shrimp.js` on your page. It has no external dependencies.

- [shrimp.js](https://raw.github.com/6/shrimp/master/src/shrimp.js) (~3KB, uncompressed)
- [shrimp.min.js](https://raw.github.com/6/shrimp/master/src/shrimp.min.js) (~0.4KB, compressed and gzipped)

### Usage

- `shrimp.log(object)` - text/object will appear in black
- `shrimp.error(object)` - text/object will appear in red
- `shrimp.info(object)` - text/object will appear in blue

shrimp will record all logs even while the console is closed. To open the console, append `#debug` to the URL.
