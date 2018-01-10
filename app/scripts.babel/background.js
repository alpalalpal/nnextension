'use strict';

chrome.runtime.onInstalled.addListener(onInstalled);

function onInstalled(details) {
  console.log(details);
}
