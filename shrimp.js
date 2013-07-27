(function() {
  if (window.shrimp) return;

  function createConsoleEl() {
    var el = document.createElement('div');
    el.style.overflowY = 'scroll';
    el.style.wordWrap = 'break-word';
    el.style.height = '180px';
    el.style.backgroundColor = '#fff';
    el.style.position = 'fixed';
    el.style.zIndex = '100000';
    el.style.bottom = '0';
    el.style.right = '0';
    el.style.left = '0';
    el.style.borderTop = '1px solid #888';
    return el;
  }

  function createLogEl(type) {
    var el = document.createElement('div');
    el.style.padding = '3px 5px';
    el.style.borderBottom = '1px solid #ddd';
    el.style.fontSize = '13px';
    el.style.fontFamily = 'Monaco,Consolas,monospace';
    el.style.color = {'log': 'black', 'error': 'red', 'info': 'blue'}[type];
    return el;
  }

  function initOrDestroyFromHash() {
    if (window.location.hash.match(/^#debug$/)) window.shrimp.init();
    else window.shrimp.destroy();
  }

  function print(options) {
    if(options.record) logs.push({type: options.type, text: options.text});
    if (typeof consoleEl === "undefined") return;
    var logEl = createLogEl(options.type);
    logEl.innerHTML = options.text;
    consoleEl.appendChild(logEl);
    consoleEl.scrollTop = 999999999;
  }

  window.shrimp = {};
  var logs = [];
  var consoleEl;
  var docmode = document.documentMode;

  window.shrimp.init = function() {
    if (typeof consoleEl !== "undefined") return;
    consoleEl = createConsoleEl();
    document.getElementsByTagName('body')[0].appendChild(consoleEl);
    for(var i = 0; i < logs.length; i++) {
      var log = logs[i];
      print({text: log.text, type: log.type, record: false});
    }
  };

  window.shrimp.destroy = function() {
    if (typeof consoleEl === "undefined") return;
    document.getElementsByTagName('body')[0].removeChild(consoleEl);
    consoleEl = undefined;
  };

  window.shrimp.log = function(text) {
    print({text: text, type: "log", record: true});
  };

  window.shrimp.info = function(text) {
    print({text: text, type: "info", record: true});
  };

  window.shrimp.error = function(text) {
    print({text: text, type: "error", record: true});
  };

  window.onerror = function(message, url, line) {
    shrimp.error(message+" Url:"+url+" Line:"+line);
  };

  if ('onhashchange' in window && (typeof docmode === "undefined" || docmode > 7 )) {
    window.addEventListener("hashchange", initOrDestroyFromHash);
  }
  initOrDestroyFromHash();
})();
