"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();window.require=function e(t,r,n){function o(u,a){if(!r[u]){if(!t[u]){var l="function"==typeof require&&require;if(!a&&l)return l(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=r[u]={exports:{}};t[u][0].call(f.exports,function(e){var r=t[u][1][e];return o(r||e)},f,f.exports,e,t,r,n)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}({"iqwerty-to_do":[function(e,t,r){!function(e){function t(e){var r=e.loadTemplate,n=e.elementRef;_classCallCheck(this,t);var o=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r("to_do.html").for(o),o.elementRef=n,o.items=[],o}_inherits(t,e),_createClass(t,[{key:"add",value:function(){var e=this.elementRef.querySelector("input.todo");this.items.push({label:e.value,edit:!1,complete:!1}),e.value="",e.focus()}},{key:"edit",value:function(e,t){e.edit=!0,t.currentTarget.querySelector("input[type=text]").select()}},{key:"doneEditing",value:function(e,t){var r=t.currentTarget;e.label=r.value,e.edit=!1}},{key:"toggleComplete",value:function(e,t){e.complete=!e.complete,t.stopPropagation()}}])}(Component)},{}]},{},["iqwerty-to_do"]);