import packageJson from '../package.json';

const BASE_URL_LOCAL = 'http://10.0.2.2:8000'; // https://10.0.2.2
//const BASE_URL_NORMAL_NETWORK = 'https://192.168.1.50';
//const BASE_URL_HOTSPOT_NETWORK = 'https://192.168.142.213'; //https://192.168.78.213';

const BASE_URL = BASE_URL_LOCAL; //Switch when needed

const APP_VERSION = packageJson.version; //Maybe not good in production

export {BASE_URL, APP_VERSION};
