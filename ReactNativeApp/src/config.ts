import packageJson from '../package.json';

const BASE_URL_LOCAL = 'https://10.0.2.2'; 
const BASE_URL_REMOTE = 'https://192.168.1.50';
const BASE_URL_HOTSPOT= 'https://192.168.78.213';

const BASE_URL = BASE_URL_HOTSPOT; //Switch when needed

const APP_VERSION = packageJson.version; //Maybe not good in production

export { BASE_URL, APP_VERSION };
  
