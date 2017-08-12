#!/usr/bin/env ts-node

import ChildProcess = require('child_process')

const ESLINT_ARGS = [
  '--cache',
  '--rulesdir=./eslint-rules',
  '--ext=.js,.ts,.jsx,.tsx',
  './script',
  './eslint-rules',
  './tslint-rules/*.ts',
  './app/{src,typings,test}',
  ...process.argv.slice(2),
]
const opts = {
  stdio: 'inherit',
}

if (process.env.CI) {
  ChildProcess.spawn('../node_modules/.bin/eslint', ESLINT_ARGS, opts)
} else {
  console.log('> Spinning up eslint_d\n')
  require('eslint_d/lib/client').lint(ESLINT_ARGS)
}
