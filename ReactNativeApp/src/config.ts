import packageJson from '../package.json';

const BASE_URL_LOCAL = 'http://10.0.2.2:8000'; 
const BASE_URL_REMOTE = 'http://192.168.1.50:8000';

const BASE_URL = BASE_URL_REMOTE; //Switch when needed

const APP_VERSION = packageJson.version;

export { BASE_URL, APP_VERSION };
  
