// import fs from 'fs-extra'
// import _debug from 'debug'
// import webpackCompiler from '../build/webpack-compiler'
// import webpackConfig from '../build/webpack.config'
// import config from '../config'

// const debug = _debug('app:bin:compile')
// const paths = config.utils_paths

// ;(async function () {
//   try {
//     debug('Run compiler')
//     const stats = await webpackCompiler(webpackConfig)
//     if (stats.warnings.length && config.compiler_fail_on_warning) {
//       debug('Config set to fail on warning, exiting with status code "1".')
//       process.exit(1)
//     }
//     debug('Copy static assets to dist folder.')
//     fs.copySync(paths.client('static'), paths.dist())
//   } catch (e) {
//     debug('Compiler encountered an error.', e)
//     process.exit(1)
//   }
// })()




import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config.development'
import logger from '../lib/logger'

//const chalk = require('chalk')
//const path = require('path')
//const webpack = require('webpack')
//const logger = require('../lib/logger')



//const webpackConfig = require('../build/webpack.config.development')
//const project = require('../../project.config')


const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold('development')))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info(`Copying static assets from ./static to .dist.`)
    fs.copySync(
      path.resolve(__dirname, '../src', 'static'),
      path.resolve(__dirname, '..', 'dist')
    )
    return stats
  })
  .then((stats) => {
    if (false) {
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Compiler finished successfully! See .dist.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))

compile()
