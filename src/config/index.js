import config_development from './development'
import config_production from './production'

let CONFIG = config_development


console.log( process )

console.log( process.env.NODE_ENV )

if( process.env.NODE_ENV === 'production' ){
  CONFIG = config_production;
}

console.log( CONFIG )

export {CONFIG}