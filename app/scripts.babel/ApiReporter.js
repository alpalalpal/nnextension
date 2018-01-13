const API = 'https://server.io';

class ApiReporter {

  constructor(request) {
    this.request = request;
  }

  send() {
    return fetch(ApiReporter.getUrl(), ApiReporter.getOptions());
  }

  static getUrl(endpoint = '') {
    return `${API}/${endpoint}`;
  }

  static getOptions(options = {}) {
    return {
      ...options
    };
  }

}