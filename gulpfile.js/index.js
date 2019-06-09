const { series, parallel } = require('gulp');
const chalk = require('chalk');

const compile = {
  index:        require('./compile-index')
};

const compile_tasks = [];

for (const key in compile) {
  compile_tasks.push(compile[key]);
}

function default_task (cb) {
  console.log(chalk.blue('\n\tBuild generated!\n'));

  cb();
}

for (const key in compile) {
  exports[`compile:${key}`] = compile[key];
}

exports.default = series(
  parallel(...compile_tasks),
  default_task
);
