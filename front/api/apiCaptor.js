export default ({ $axios, baseUrl }) => ({
  getTest() {
    return $axios.$get(`${baseUrl}/posts`);
  },
  get(path) {
    return $axios.$get(`${baseUrl}${path}`);
  },
});
