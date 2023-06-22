export default ({ $axios, baseUrl }) => ({

  getRoomInfo(id){
    return $axios.$get(`${baseUrl}/${id}`);
  },

  setSettings(item) {
    return $axios.post(`${baseUrl}/xx`, item, {
      headers: {
        'Content-Type': 'application/ld+json',
      },
    })
  },
});
