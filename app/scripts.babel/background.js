'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);

const pages = [];

function onInstalled(details) {
  console.log(details);
  // Possibly contact API to set-up account?
  // chrome.storage.local.set(object items, function callback);
}

function onTabOpen(tab) {
  pages.push(new UrlListener(tab));
}
