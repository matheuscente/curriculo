export default class Api {
  async getData(url, options) {
    const data = await axios.get(url, options);
    return data;
  }

  async postData(url, data, options) {

    const returnData = await axios.post(url, data, options);
    return returnData;
  }

  async patchData(url, data, options) {
    const returnData = await axios.patch(url, data, options);
    return returnData;
  }

  async deleteData(url, options) {
    const returnData = await axios.delete(url, options);
    return returnData;
  }
}
