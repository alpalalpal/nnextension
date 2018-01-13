const API = 'http://server.no';

class ApiReporter {

  constructor(request) {
    this.request = request;
  }

  send() {
    return fetch(this.getUrl(), ApiReporter.getOptions());
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