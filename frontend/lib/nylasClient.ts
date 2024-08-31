// lib/nylasClient.js
import { envConfig } from '@/pages/api/config';
import Nylas from 'nylas';


const NylasConfig: {apiKey: string; apiUri: string} = {
  apiKey: envConfig.nylas_api_key,   
  apiUri: envConfig.nylas_api_url,
}

const nylas = new Nylas(NylasConfig);

export default nylas;