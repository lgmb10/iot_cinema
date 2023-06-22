export default ({ $axios, baseUrl }) => ({

  getRoomInfo(id){
    return $axios.$get(`${baseUrl}/${id}`);
  },

  getAllInfo(){
    return $axios.$get(`${baseUrl}`);
  },

  getSensorsRanges(id){
    return $axios.$get(`${baseUrl}/ranges/${id}`);
  },

  setSensorsRanges(id, item) {
    return $axios.put(`${baseUrl}/ranges/${id}`, item, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
});
