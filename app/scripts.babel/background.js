'use strict';

/**
 *  Background.js will register events on the different pages request lifecycle. https://developer.chrome.com/extensions/webRequest
 *  - The onComplete event has details about the time the request used, the headers have the size
 *  - Use ApiReporter to send data to our API.
 */

chrome.runtime.onInstalled.addListener(onInstalled);

// Request lifecycle events
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ['<all_urls>'] });
chrome.webRequest.onCompleted.addListener(onComplete, { urls: ['<all_urls>'] });
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, { urls: ['<all_urls>'] }, ["responseHeaders"]);

const requests = {};

// Should maybe assign the user a token from API here.
function onInstalled(details) {
  console.log(details);
}

function onBeforeRequest(details) {
  console.log('onBeforeRequest ', details);
  setRequestData(details.url, 'start', details);
}

function onComplete(details) { // https://developer.chrome.com/extensions/webRequest#event-onCompleted
  console.log('onComplete', details);
  if (details.fromCache === false) {
    setRequestData(details.url, 'end', details);
    reportData({
      speed: getRequestSpeed(details.url)
    });
  }
  delete details[details.url];
}

function onHeadersReceived(details) { // https://developer.chrome.com/extensions/webRequest#event-onHeadersReceived
  console.log('onHeadersReceived', details);
  setRequestData(details.url, 'headers', details);
}

function reportData(request) {
  const reporter = new ApiReporter(request);
  // return reporter.send();
}

function setRequestData(url, name, data) {
  const request = requests[url] ? requests[url] : (requests[url] = {});
  request[name] = data;
  return request;
}

function getRequestSpeed(url) {
  const request = requests[url];

  if (request) {
    const regexp = /content-length/i;

    const start = request.start.timeStamp;
    const end = request.end.timeStamp;
    const time = end - start; // milliseconds

    const sizeHeader = request.headers.responseHeaders.find((headerItem) => regexp.test(headerItem['name']));
    const size = Number(sizeHeader['value']);

    const speed = (size * 8) / time; // Todo: Fix this.

    console.log('speed bit/millisecond', speed);
  }
}
