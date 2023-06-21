export default ({ $axios, baseUrl }) => ({
  getTest() {
    return $axios.$get(`${baseUrl}/posts`);
  },
  get(path) {
    return $axios.$get(`${baseUrl}${path}`);
  },

  setSettings(item) {
    return $axios.post(`${baseUrl}/xx`, item, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
  },
});
