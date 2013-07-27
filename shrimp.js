(function() {
  if (window.shrimp) return;

  function createElementWithCSS(elementType, css) {
    var el = document.createElement(elementType);
    for (var attribute in css) el.style[attribute] = css[attribute];
    return el;
  }

  function createConsoleEl() {
    return createElementWithCSS('div', {
      'height': '180px',
      'position': 'fixed',
      'zIndex': '100000',
      'bottom': '0',
      'right': '0',
      'left': '0',
      'overflowY': 'scroll',
      'wordWrap': 'break-word',
      'borderTop': '1px solid #888',
      'backgroundColor': 'white'
    });
  }

  function createLogEl(type) {
    return createElementWithCSS('div', {
      'padding': '3px 5px',
      'borderBottom': '1px solid #ddd',
      'fontSize': '13px',
      'fontFamily': 'Monaco,Consolas,monospace',
      'color': {'log': 'black', 'error': 'red', 'info': 'blue'}[type]
    });
  }

  function initOrDestroyFromHash() {
    if (window.location.hash.match(/^#debug$/)) window.shrimp.init();
    else window.shrimp.destroy();
  }

  function print(options) {
    if(options.record) logs.push({type: options.type, text: options.text});
    if (typeof consoleEl === "undefined") return;
    var logEl = createLogEl(options.type);
    var stringifiedText;
    if ('JSON' in window && window.JSON.stringify) {
      stringifiedText = window.JSON.stringify(options.text);
    }
    logEl.innerHTML = stringifiedText || options.text;
    consoleEl.appendChild(logEl);
    consoleEl.scrollTop = 999999999;
  }

  window.shrimp = {};
  var logs = [];
  var consoleEl;
  var docmode = document.documentMode;
  var bodyEl = document.getElementsByTagName('body')[0];

  window.shrimp.init = function() {
    if (typeof consoleEl !== "undefined") return;
    consoleEl = createConsoleEl();
    bodyEl.appendChild(consoleEl);
    for(var i = 0; i < logs.length; i++) {
      var log = logs[i];
      print({text: log.text, type: log.type, record: false});
    }
  };

  window.shrimp.destroy = function() {
    if (typeof consoleEl === "undefined") return;
    bodyEl.removeChild(consoleEl);
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
    if ('addEventListener' in window) window.addEventListener("hashchange", initOrDestroyFromHash, false);
    else if ('attachEvent' in window) window.attachEvent("onhashchange", initOrDestroyFromHash);
  }
  initOrDestroyFromHash();
})();
