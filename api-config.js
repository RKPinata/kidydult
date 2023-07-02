let apiUrl = '';

if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:4000'; // Replace with your local backend URL
} else {
  apiUrl = 'https://uploadbackend.up.railway.app'; // Replace with your production backend URL
}

export default apiUrl;