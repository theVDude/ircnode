#!/usr/bin/env node
var irc = require('./client'),
    net = require('net'),
    assert = require('assert');

assert.equal(irc._pongHandler('PING :burgle'), 'PONG :burgle\r\n');

var splitTests = {
  'mike!michael@localhost PRIVMSG #test :!test action': { // normal messages
    'nick': 'mike',
    'source': '#test',
    'user': 'michael',
    'host': 'localhost',
    'channel': '#test',
    'cmd': 'test',
    'params':  ['action'],
    'data': 'mike!michael@localhost PRIVMSG #test :!test action'
  },
  'mike!michael@localhost PRIVMSG tm_test :!test action': { // test PM
    'nick': 'mike',
    'source': 'mike',
    'user': 'michael',
    'host': 'localhost',
    'channel': 'tm_test',
    'cmd': 'test',
    'params':  ['action'],
    'data': 'mike!michael@localhost PRIVMSG tm_test :!test action'
  }
};

for (var u in splitTests) {
  var actual = irc.splitcmd(u);
  var expected = splitTests[u];

  assert.deepEqual(actual, expected);
}

process.exit(0);