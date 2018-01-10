'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, {urls: ['<all_urls>']});
chrome.webRequest.onCompleted.addListener(onComplete, {urls: ['<all_urls>']});

const requests = [];

function onInstalled(details) {
  console.log(details);
  // Possibly contact API to set-up account?
  // chrome.storage.local.set(object items, function callback);
}

function onBeforeRequest(details){
  console.log('request start: ',details);
  requests.push(details);
}

function onComplete(details) { // https://developer.chrome.com/extensions/webRequest#event-onCompleted
  console.log('done with' ,details);
}

