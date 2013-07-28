shrimp-logger
=============
shrimp is a lightweight JavaScript logging/debugging tool that provides:
- a consistent console UI accross IE8+, Chrome, Firefox, and Safari
- easy access to non-developers such as users or QA testers (just append `#debug` to the URL)

### The problem
Internet Explorer (even IE10) developer tools do not show useful information when logging objects.

This is a screenshot of `console.log` output on IE10 developer tools:

![screen shot 2013-07-27 at 11 26 48 am](https://f.cloud.github.com/assets/158675/867512/fcfe269a-f703-11e2-96dc-986293807962.png)

### The solution

When the shrimp log is opened, this is what it looks like in all supported browsers:

![screen shot 2013-07-27 at 3 14 47 pm](https://f.cloud.github.com/assets/158675/867541/4ee71f60-f70a-11e2-9210-f363a61b31ad.png)

### Download

- [shrimp.js](https://raw.github.com/6/shrimp-logger/master/src/shrimp.js) (uncompressed, ~3KB)

### Usage

Include `shrimp.js` on your page. It has no external dependencies. Then use the following methods in your JS code:
- `shrimp.log(object)` - text/object will appear in black
- `shrimp.error(object)` - text/object will appear in red
- `shrimp.info(object)` - text/object will appear in blue

shrimp will record all logs even while it's closed. To open the console, append `#debug` to the URL.
