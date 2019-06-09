const { series, parallel } = require('gulp');
const chalk = require('chalk');

const compile = {
  index:        require('./compile-index')
};

const npm = {
  css: require('./npm-css')
};

const compile_tasks = [];
const npm_tasks = [];

for (const key in compile) {
  compile_tasks.push(compile[key]);

  exports[`compile:${key}`] = compile[key];
}

for (const key in npm) {
  npm_tasks.push(npm[key]);

  exports[`npm:${key}`] = npm[key];
}

function default_task (cb) {
  console.log(chalk.blue('\n\tBuild generated!\n'));

  cb();
}

for (const key in compile) {
  exports[`compile:${key}`] = compile[key];
}

exports.default = series(
  parallel(...npm_tasks),
  parallel(...compile_tasks),
  default_task
);
