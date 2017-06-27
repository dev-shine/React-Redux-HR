import _ from 'lodash';
import {CONFIG} from '../config/index';

export function isNotUserValid (path) {
  if ((_.indexOf(CONFIG.PAGEROLES, path)) === -1) {
    return true;
  } else {
    return false;
  }
}
