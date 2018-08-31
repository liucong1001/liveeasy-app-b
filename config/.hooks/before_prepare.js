#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var compile = require('es6-template-strings/compile');
var resolveToString = require('es6-template-strings/resolve-to-string');

var ROOT_DIR = path.resolve(__dirname, '../../')

var env = process.env.MY_ENV || 'dev';
var envFile = 'src/environments/environment.' + env + '.ts';

var FILES = {
  SRC: "config/config.tpl.xml",
  DEST: "config.xml"
};

console.log('hooks-start: before_prepare','envFile:'+envFile);

var srcFileFull = path.join(ROOT_DIR, FILES.SRC);
var destFileFull = path.join(ROOT_DIR, FILES.DEST);
var configFileFull = path.join(ROOT_DIR, envFile);
console.log(configFileFull);

var templateData = fs.readFileSync(srcFileFull, 'utf8');
var configData = fs.readFileSync(configFileFull, 'utf8').toString()||"";
configData = configData.replace(/export[\s]*const[\s]*ENV[\s]*:[\s]*Environment[\s]*=[\s]*(\{[\s\S]+})[\s]*;*/g, "$1");
//去//注释
configData = configData.replace(/([,\s])\/\/[\s]*[\S *]*?\n+/g, "$1");
//去/**/注释
configData = configData.replace(/\/\*.*?\*\//g, "");
configData = configData.replace(/import[\s]*{.*?}[\s]*from[\s]*'.*?';*/g, "");
var config = eval("("+ configData +")") || {};
config = config['cordova'];

var compiled = compile(templateData);
var content = resolveToString(compiled, config);

fs.writeFileSync(destFileFull, content);

console.log('hooks-end: before_prepare');
