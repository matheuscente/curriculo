export async function getData(url) {
    const token = sessionStorage.getItem('token')

    const  data  = await axios.get(url, {
      headers: {
        Authorization: token
      }
    });
    return data;
  }