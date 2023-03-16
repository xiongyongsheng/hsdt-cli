"use strict";

var _require = require("child_process"),
    spawn = _require.spawn;

var Spawn = function Spawn() {
  var _len,
      args,
      _key,
      _args = arguments;

  return regeneratorRuntime.async(function Spawn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = _args[_key];
          }

          return _context.abrupt("return", new Promise(function (resolve) {
            var proc = spawn.apply(void 0, args); // 在node.js中执行shell一般用spawn，实现从主进程的输出流连通到子进程的输出流

            proc.stdout.pipe(process.stdout); // 子进程正常流搭到主进程的正常流

            proc.stderr.pipe(process.stderr); // 子进程错误流插到主进程的错误流

            proc.on("close", function () {
              resolve();
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  Spawn: Spawn
};