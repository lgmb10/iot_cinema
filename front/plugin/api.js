import apiCaptor from "../api/apiCaptor";

export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const captor = apiCaptor({
    $axios,
    baseUrl: process.env.APICAPTOR_URL,
  });
  // Set baseURL to something different

  // Inject to context as $api
  inject("api", captor);
}
