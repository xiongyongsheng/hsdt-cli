"use strict";

var axios = require("../api.request");

var getRepoList = function getRepoList(params) {
  return axios.request({
    url: "https://api.github.com/users/xiongyongsheng/repos",
    params: params,
    method: "get"
  });
};

module.exports = {
  getRepoList: getRepoList
};