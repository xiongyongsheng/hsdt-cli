"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var path = require("path");

var fs = require("fs-extra");

var chalk = require("chalk");

var Inquirer = require("inquirer");

var ora = require("ora");

var api = require("../api/interface/index");

var util = require("util");

var downloadGitRepo = require("download-git-repo");

var figlet = require("figlet");

var cwd = process.cwd();

var Creator =
/*#__PURE__*/
function () {
  function Creator(projectName, options) {
    _classCallCheck(this, Creator);

    this.projectName = projectName;
    this.options = options;
  }

  _createClass(Creator, [{
    key: "create",
    value: function create() {
      var isOverwrite;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.handleDirectory());

            case 2:
              isOverwrite = _context.sent;

              if (isOverwrite) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              _context.next = 7;
              return regeneratorRuntime.awrap(this.getCollectRepo());

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getCollectRepo",
    value: function getCollectRepo() {
      var loading, _ref, list, collectTemplateNameList, _ref2, choiceTemplateName;

      return regeneratorRuntime.async(function getCollectRepo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              loading = ora("正在获取模版信息...");
              loading.start();
              _context2.next = 4;
              return regeneratorRuntime.awrap(api.getRepoList());

            case 4:
              _ref = _context2.sent;
              list = _ref.data;
              loading.succeed();
              collectTemplateNameList = list.filter(function (item) {
                return item.topics.includes("template");
              }).map(function (item) {
                return item.name;
              });
              _context2.next = 10;
              return regeneratorRuntime.awrap(new Inquirer.prompt([{
                name: "choiceTemplateName",
                type: "list",
                message: "请选择模版",
                choices: collectTemplateNameList
              }]));

            case 10:
              _ref2 = _context2.sent;
              choiceTemplateName = _ref2.choiceTemplateName;
              console.log("选择了模版：" + choiceTemplateName);
              this.downloadTemplate(choiceTemplateName);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "downloadTemplate",
    value: function downloadTemplate(choiceTemplateName) {
      var templateUrl, loading;
      return regeneratorRuntime.async(function downloadTemplate$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.downloadGitRepo = util.promisify(downloadGitRepo);
              templateUrl = "xiongyongsheng/".concat(choiceTemplateName);
              loading = ora("正在拉取模版...");
              loading.start();
              _context3.next = 6;
              return regeneratorRuntime.awrap(this.downloadGitRepo(templateUrl, path.join(cwd, this.projectName)));

            case 6:
              loading.succeed();
              this.showTemplateHelp();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "showTemplateHelp",
    value: function showTemplateHelp() {
      console.log("\r\nSuccessfully created project ".concat(chalk.cyan(this.projectName)));
      console.log("\r\n  cd ".concat(chalk.cyan(this.projectName), "\r\n"));
      console.log("  npm install");
      console.log("  npm run dev\r\n");
      console.log("\n        \r\n\n        ".concat(chalk.green.bold(figlet.textSync("SUCCESS", {
        font: "isometric4",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 120,
        whitespaceBreak: true
      })), "\n    "));
    }
  }, {
    key: "handleDirectory",
    value: function handleDirectory() {
      var targetDirectory, _ref3, isOverwrite;

      return regeneratorRuntime.async(function handleDirectory$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              targetDirectory = path.join(cwd, this.projectName); // 如果目录中存在了需要创建的目录

              if (!fs.existsSync(targetDirectory)) {
                _context4.next = 18;
                break;
              }

              if (!this.options.force) {
                _context4.next = 7;
                break;
              }

              _context4.next = 5;
              return regeneratorRuntime.awrap(fs.remove(targetDirectory));

            case 5:
              _context4.next = 18;
              break;

            case 7:
              _context4.next = 9;
              return regeneratorRuntime.awrap(new Inquirer.prompt([{
                name: "isOverwrite",
                type: "list",
                message: "是否强制覆盖已存在的同名目录？",
                choices: [{
                  name: "覆盖",
                  value: true
                }, {
                  name: "不覆盖",
                  value: false
                }]
              }]));

            case 9:
              _ref3 = _context4.sent;
              isOverwrite = _ref3.isOverwrite;

              if (!isOverwrite) {
                _context4.next = 16;
                break;
              }

              _context4.next = 14;
              return regeneratorRuntime.awrap(fs.remove(targetDirectory));

            case 14:
              _context4.next = 18;
              break;

            case 16:
              console.log(chalk.red.bold("不覆盖文件夹，创建终止"));
              return _context4.abrupt("return", false);

            case 18:
              return _context4.abrupt("return", true);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Creator;
}();

module.exports = function _callee(projectName, options) {
  var creator;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          creator = new Creator(projectName, options);
          _context5.next = 3;
          return regeneratorRuntime.awrap(creator.create());

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};