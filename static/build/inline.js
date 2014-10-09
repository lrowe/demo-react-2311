require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// ie8 compat.
var tags = [
"article",
"aside",
"figcaption",
"figure",
"footer",
"header",
"hgroup",
"nav",
"section"];
for (var i=0, l=tags.length; i < l; i++) {
    document.createElement(tags[i]);
}

// Use a separate tracker for dev / test
var ga = require('google-analytics');
var trackers = {'www.encodeproject.org': 'UA-47809317-1'};
var tracker = trackers[document.location.hostname] || 'UA-47809317-2';
ga('create', tracker, {'cookieDomain': 'none', 'siteSpeedSampleRate': 100});
ga('send', 'pageview');

// Need to know if onload event has fired for safe history api usage.
window.onload = function () {
    window._onload_event_fired = true;
};

var $script = require('scriptjs');
$script.path('/static/build/');
$script('https://login.persona.org/include.js', 'persona');


},{"google-analytics":undefined,"scriptjs":undefined}],"google-analytics":[function(require,module,exports){
(function (global){
'use strict';
/* global ga */
global.ga = global.ga || function () {
    (ga.q = ga.q || []).push(arguments);
};
ga.l = +new Date();
module.exports = global.ga;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"scriptjs":[function(require,module,exports){
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */

(function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
})('$script', function () {
  var doc = document
    , head = doc.getElementsByTagName('head')[0]
    , s = 'string'
    , f = false
    , push = 'push'
    , readyState = 'readyState'
    , onreadystatechange = 'onreadystatechange'
    , list = {}
    , ids = {}
    , delay = {}
    , scripts = {}
    , scriptpath
    , urlArgs

  function every(ar, fn) {
    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
    return 1
  }
  function each(ar, fn) {
    every(ar, function (el) {
      return !fn(el)
    })
  }

  function $script(paths, idOrDone, optDone) {
    paths = paths[push] ? paths : [paths]
    var idOrDoneIsDone = idOrDone && idOrDone.call
      , done = idOrDoneIsDone ? idOrDone : optDone
      , id = idOrDoneIsDone ? paths.join('') : idOrDone
      , queue = paths.length
    function loopFn(item) {
      return item.call ? item() : list[item]
    }
    function callback() {
      if (!--queue) {
        list[id] = 1
        done && done()
        for (var dset in delay) {
          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
        }
      }
    }
    setTimeout(function () {
      each(paths, function loading(path, force) {
        if (path === null) return callback()
        path = !force && path.indexOf('.js') === -1 && !/^https?:\/\//.test(path) && scriptpath ? scriptpath + path + '.js' : path
        if (scripts[path]) {
          if (id) ids[id] = 1
          return (scripts[path] == 2) ? callback() : setTimeout(function () { loading(path, true) }, 0)
        }

        scripts[path] = 1
        if (id) ids[id] = 1
        create(path, callback)
      })
    }, 0)
    return $script
  }

  function create(path, fn) {
    var el = doc.createElement('script'), loaded
    el.onload = el.onerror = el[onreadystatechange] = function () {
      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
      el.onload = el[onreadystatechange] = null
      loaded = 1
      scripts[path] = 2
      fn()
    }
    el.async = 1
    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
    head.insertBefore(el, head.lastChild)
  }

  $script.get = create

  $script.order = function (scripts, id, done) {
    (function callback(s) {
      s = scripts.shift()
      !scripts.length ? $script(s, id, done) : $script(s, callback)
    }())
  }

  $script.path = function (p) {
    scriptpath = p
  }
  $script.urlArgs = function (str) {
    urlArgs = str;
  }
  $script.ready = function (deps, ready, req) {
    deps = deps[push] ? deps : [deps]
    var missing = [];
    !each(deps, function (dep) {
      list[dep] || missing[push](dep);
    }) && every(deps, function (dep) {return list[dep]}) ?
      ready() : !function (key) {
      delay[key] = delay[key] || []
      delay[key][push](ready)
      req && req(missing)
    }(deps.join('|'))
    return $script
  }

  $script.done = function (idOrDone) {
    $script([null], idOrDone)
  }

  return $script
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHJvd2UvZHJpdmUvZGV2ZWwvZW5jb2RlL2VuY29kZWQvc3JjL2VuY29kZWQvc3RhdGljL2lubGluZS5qcyIsIi9Vc2Vycy9scm93ZS9kcml2ZS9kZXZlbC9lbmNvZGUvZW5jb2RlZC9ub2RlX21vZHVsZXMvZ29vZ2xlLWFuYWx5dGljcy5qcyIsIi9Vc2Vycy9scm93ZS9kcml2ZS9kZXZlbC9lbmNvZGUvZW5jb2RlZC9ub2RlX21vZHVsZXMvc2NyaXB0anMvZGlzdC9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsY0FBYztBQUNkLElBQUksSUFBSSxHQUFHO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxZQUFZO0FBQ1osUUFBUTtBQUNSLFFBQVE7QUFDUixRQUFRO0FBQ1IsUUFBUTtBQUNSLEtBQUs7QUFDTCxTQUFTLENBQUMsQ0FBQztBQUNYLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDckMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDOztBQUVELHdDQUF3QztBQUN4QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNyQyxJQUFJLFFBQVEsR0FBRyxDQUFDLHVCQUF1QixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzFELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQztBQUN0RSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1RSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUV2QixxRUFBcUU7QUFDckUsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7SUFDekIsTUFBTSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUN0QyxDQUFDLENBQUM7O0FBRUYsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMvQixPQUFPLENBQUMsc0NBQXNDLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7QUMvQjNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8vIGllOCBjb21wYXQuXG52YXIgdGFncyA9IFtcblwiYXJ0aWNsZVwiLFxuXCJhc2lkZVwiLFxuXCJmaWdjYXB0aW9uXCIsXG5cImZpZ3VyZVwiLFxuXCJmb290ZXJcIixcblwiaGVhZGVyXCIsXG5cImhncm91cFwiLFxuXCJuYXZcIixcblwic2VjdGlvblwiXTtcbmZvciAodmFyIGk9MCwgbD10YWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnc1tpXSk7XG59XG5cbi8vIFVzZSBhIHNlcGFyYXRlIHRyYWNrZXIgZm9yIGRldiAvIHRlc3RcbnZhciBnYSA9IHJlcXVpcmUoJ2dvb2dsZS1hbmFseXRpY3MnKTtcbnZhciB0cmFja2VycyA9IHsnd3d3LmVuY29kZXByb2plY3Qub3JnJzogJ1VBLTQ3ODA5MzE3LTEnfTtcbnZhciB0cmFja2VyID0gdHJhY2tlcnNbZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWVdIHx8ICdVQS00NzgwOTMxNy0yJztcbmdhKCdjcmVhdGUnLCB0cmFja2VyLCB7J2Nvb2tpZURvbWFpbic6ICdub25lJywgJ3NpdGVTcGVlZFNhbXBsZVJhdGUnOiAxMDB9KTtcbmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG5cbi8vIE5lZWQgdG8ga25vdyBpZiBvbmxvYWQgZXZlbnQgaGFzIGZpcmVkIGZvciBzYWZlIGhpc3RvcnkgYXBpIHVzYWdlLlxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cuX29ubG9hZF9ldmVudF9maXJlZCA9IHRydWU7XG59O1xuXG52YXIgJHNjcmlwdCA9IHJlcXVpcmUoJ3NjcmlwdGpzJyk7XG4kc2NyaXB0LnBhdGgoJy9zdGF0aWMvYnVpbGQvJyk7XG4kc2NyaXB0KCdodHRwczovL2xvZ2luLnBlcnNvbmEub3JnL2luY2x1ZGUuanMnLCAncGVyc29uYScpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIGdhICovXG5nbG9iYWwuZ2EgPSBnbG9iYWwuZ2EgfHwgZnVuY3Rpb24gKCkge1xuICAgIChnYS5xID0gZ2EucSB8fCBbXSkucHVzaChhcmd1bWVudHMpO1xufTtcbmdhLmwgPSArbmV3IERhdGUoKTtcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmdhO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIvKiFcbiAgKiAkc2NyaXB0LmpzIEpTIGxvYWRlciAmIGRlcGVuZGVuY3kgbWFuYWdlclxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvc2NyaXB0LmpzXG4gICogKGMpIER1c3RpbiBEaWF6IDIwMTQgfCBMaWNlbnNlIE1JVFxuICAqL1xuXG4oZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSB0aGlzW25hbWVdID0gZGVmaW5pdGlvbigpXG59KSgnJHNjcmlwdCcsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50XG4gICAgLCBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAsIHMgPSAnc3RyaW5nJ1xuICAgICwgZiA9IGZhbHNlXG4gICAgLCBwdXNoID0gJ3B1c2gnXG4gICAgLCByZWFkeVN0YXRlID0gJ3JlYWR5U3RhdGUnXG4gICAgLCBvbnJlYWR5c3RhdGVjaGFuZ2UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJ1xuICAgICwgbGlzdCA9IHt9XG4gICAgLCBpZHMgPSB7fVxuICAgICwgZGVsYXkgPSB7fVxuICAgICwgc2NyaXB0cyA9IHt9XG4gICAgLCBzY3JpcHRwYXRoXG4gICAgLCB1cmxBcmdzXG5cbiAgZnVuY3Rpb24gZXZlcnkoYXIsIGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBhci5sZW5ndGg7IGkgPCBqOyArK2kpIGlmICghZm4oYXJbaV0pKSByZXR1cm4gZlxuICAgIHJldHVybiAxXG4gIH1cbiAgZnVuY3Rpb24gZWFjaChhciwgZm4pIHtcbiAgICBldmVyeShhciwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gIWZuKGVsKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiAkc2NyaXB0KHBhdGhzLCBpZE9yRG9uZSwgb3B0RG9uZSkge1xuICAgIHBhdGhzID0gcGF0aHNbcHVzaF0gPyBwYXRocyA6IFtwYXRoc11cbiAgICB2YXIgaWRPckRvbmVJc0RvbmUgPSBpZE9yRG9uZSAmJiBpZE9yRG9uZS5jYWxsXG4gICAgICAsIGRvbmUgPSBpZE9yRG9uZUlzRG9uZSA/IGlkT3JEb25lIDogb3B0RG9uZVxuICAgICAgLCBpZCA9IGlkT3JEb25lSXNEb25lID8gcGF0aHMuam9pbignJykgOiBpZE9yRG9uZVxuICAgICAgLCBxdWV1ZSA9IHBhdGhzLmxlbmd0aFxuICAgIGZ1bmN0aW9uIGxvb3BGbihpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5jYWxsID8gaXRlbSgpIDogbGlzdFtpdGVtXVxuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxsYmFjaygpIHtcbiAgICAgIGlmICghLS1xdWV1ZSkge1xuICAgICAgICBsaXN0W2lkXSA9IDFcbiAgICAgICAgZG9uZSAmJiBkb25lKClcbiAgICAgICAgZm9yICh2YXIgZHNldCBpbiBkZWxheSkge1xuICAgICAgICAgIGV2ZXJ5KGRzZXQuc3BsaXQoJ3wnKSwgbG9vcEZuKSAmJiAhZWFjaChkZWxheVtkc2V0XSwgbG9vcEZuKSAmJiAoZGVsYXlbZHNldF0gPSBbXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVhY2gocGF0aHMsIGZ1bmN0aW9uIGxvYWRpbmcocGF0aCwgZm9yY2UpIHtcbiAgICAgICAgaWYgKHBhdGggPT09IG51bGwpIHJldHVybiBjYWxsYmFjaygpXG4gICAgICAgIHBhdGggPSAhZm9yY2UgJiYgcGF0aC5pbmRleE9mKCcuanMnKSA9PT0gLTEgJiYgIS9eaHR0cHM/OlxcL1xcLy8udGVzdChwYXRoKSAmJiBzY3JpcHRwYXRoID8gc2NyaXB0cGF0aCArIHBhdGggKyAnLmpzJyA6IHBhdGhcbiAgICAgICAgaWYgKHNjcmlwdHNbcGF0aF0pIHtcbiAgICAgICAgICBpZiAoaWQpIGlkc1tpZF0gPSAxXG4gICAgICAgICAgcmV0dXJuIChzY3JpcHRzW3BhdGhdID09IDIpID8gY2FsbGJhY2soKSA6IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBsb2FkaW5nKHBhdGgsIHRydWUpIH0sIDApXG4gICAgICAgIH1cblxuICAgICAgICBzY3JpcHRzW3BhdGhdID0gMVxuICAgICAgICBpZiAoaWQpIGlkc1tpZF0gPSAxXG4gICAgICAgIGNyZWF0ZShwYXRoLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfSwgMClcbiAgICByZXR1cm4gJHNjcmlwdFxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlKHBhdGgsIGZuKSB7XG4gICAgdmFyIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpLCBsb2FkZWRcbiAgICBlbC5vbmxvYWQgPSBlbC5vbmVycm9yID0gZWxbb25yZWFkeXN0YXRlY2hhbmdlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICgoZWxbcmVhZHlTdGF0ZV0gJiYgISgvXmN8bG9hZGUvLnRlc3QoZWxbcmVhZHlTdGF0ZV0pKSkgfHwgbG9hZGVkKSByZXR1cm47XG4gICAgICBlbC5vbmxvYWQgPSBlbFtvbnJlYWR5c3RhdGVjaGFuZ2VdID0gbnVsbFxuICAgICAgbG9hZGVkID0gMVxuICAgICAgc2NyaXB0c1twYXRoXSA9IDJcbiAgICAgIGZuKClcbiAgICB9XG4gICAgZWwuYXN5bmMgPSAxXG4gICAgZWwuc3JjID0gdXJsQXJncyA/IHBhdGggKyAocGF0aC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHVybEFyZ3MgOiBwYXRoO1xuICAgIGhlYWQuaW5zZXJ0QmVmb3JlKGVsLCBoZWFkLmxhc3RDaGlsZClcbiAgfVxuXG4gICRzY3JpcHQuZ2V0ID0gY3JlYXRlXG5cbiAgJHNjcmlwdC5vcmRlciA9IGZ1bmN0aW9uIChzY3JpcHRzLCBpZCwgZG9uZSkge1xuICAgIChmdW5jdGlvbiBjYWxsYmFjayhzKSB7XG4gICAgICBzID0gc2NyaXB0cy5zaGlmdCgpXG4gICAgICAhc2NyaXB0cy5sZW5ndGggPyAkc2NyaXB0KHMsIGlkLCBkb25lKSA6ICRzY3JpcHQocywgY2FsbGJhY2spXG4gICAgfSgpKVxuICB9XG5cbiAgJHNjcmlwdC5wYXRoID0gZnVuY3Rpb24gKHApIHtcbiAgICBzY3JpcHRwYXRoID0gcFxuICB9XG4gICRzY3JpcHQudXJsQXJncyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB1cmxBcmdzID0gc3RyO1xuICB9XG4gICRzY3JpcHQucmVhZHkgPSBmdW5jdGlvbiAoZGVwcywgcmVhZHksIHJlcSkge1xuICAgIGRlcHMgPSBkZXBzW3B1c2hdID8gZGVwcyA6IFtkZXBzXVxuICAgIHZhciBtaXNzaW5nID0gW107XG4gICAgIWVhY2goZGVwcywgZnVuY3Rpb24gKGRlcCkge1xuICAgICAgbGlzdFtkZXBdIHx8IG1pc3NpbmdbcHVzaF0oZGVwKTtcbiAgICB9KSAmJiBldmVyeShkZXBzLCBmdW5jdGlvbiAoZGVwKSB7cmV0dXJuIGxpc3RbZGVwXX0pID9cbiAgICAgIHJlYWR5KCkgOiAhZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVsYXlba2V5XSA9IGRlbGF5W2tleV0gfHwgW11cbiAgICAgIGRlbGF5W2tleV1bcHVzaF0ocmVhZHkpXG4gICAgICByZXEgJiYgcmVxKG1pc3NpbmcpXG4gICAgfShkZXBzLmpvaW4oJ3wnKSlcbiAgICByZXR1cm4gJHNjcmlwdFxuICB9XG5cbiAgJHNjcmlwdC5kb25lID0gZnVuY3Rpb24gKGlkT3JEb25lKSB7XG4gICAgJHNjcmlwdChbbnVsbF0sIGlkT3JEb25lKVxuICB9XG5cbiAgcmV0dXJuICRzY3JpcHRcbn0pO1xuIl19
