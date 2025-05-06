export default class Api {
  async getData(url, options) {
    const data = await axios.get(url, options);
    return data;
  }

  async postData(url, data) {
    const token = sessionStorage.getItem("token");

    const returnData = await axios.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return returnData;
  }

  async patchData(url, data) {
    const token = sessionStorage.getItem("token");

    const returnData = await axios.patch(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return returnData;
  }

  async deleteData(url) {
    const token = sessionStorage.getItem("token");

    const returnData = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });
    return returnData;
  }
}
