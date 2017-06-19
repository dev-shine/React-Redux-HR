import config_development from './development'
import config_production from './production'

let CONFIG = config_development

if( process.env.NODE_ENV === 'production' ){
  CONFIG = config_production;
}

export {CONFIG}