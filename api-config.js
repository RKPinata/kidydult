let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:4000'; //  local backend URL
} else {
  apiUrl = 'https://uploadbackend.up.railway.app'; // production backend URL
}

export default apiUrl;