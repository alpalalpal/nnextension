'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ['<all_urls>']});
chrome.webRequest.onCompleted.addListener(onComplete, {urls: ['<all_urls>']});
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders);

function onInstalled(details) {
  console.log(details);
  // Possibly contact API to set-up account?
  // chrome.storage.local.set(object items, function callback);
}

function onBeforeRequest(details){
  console.log('request start: ',details);
}

function onComplete(details) { // https://developer.chrome.com/extensions/webRequest#event-onCompleted
  console.log('done with' ,details);
}

function onBeforeSendHeaders(details){
  debugger;
}

function reportData(request) {
  const reporter = new ApiReporter(request);
  return reporter.send();
}
/*
* example of details object captured in onBeforeRequest and onComplete:
frameId: 0
initiator: "https://www.vg.no"
method: "GET"
parentFrameId: -1
requestId: "70160"
tabId: 664
timeStamp: 1515654956345.388
type: "xmlhttprequest"
url: "https://direkte.vg.no/feed-module/536f61035152f7314000007e/verbatim/since/1515654740000?types=vgtv,text,article,twitter,photo&limit=2

Seems like we cannot see size of request yet
* */

