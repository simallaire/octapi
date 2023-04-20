import ReactDOM from 'react-dom/client'
import './index.css'
import Body from './Root';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import axios from 'axios';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common = {
  'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
   'Content-Type': 'application/json'
  }

  
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Body/>
)
