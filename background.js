function sendToTracker(url, favIconUrl, title) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:27027/currentUrl/", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  const postData = JSON.stringify({ url, favIconUrl, title });
  xmlhttp.send(postData);
}

window.setInterval(function() {
  try {
      chrome.tabs.query(
          {'active': true, 'currentWindow': true},
          function (tabs) {
              if (!tabs[0] || !tabs[0].url) {
                  sendToTracker("");
                  return;
              }
              const currentUrl = tabs[0].url;
              const favIconUrl = tabs[0].favIconUrl;
              const title = tabs[0].title;
              sendToTracker(currentUrl, favIconUrl, title);
          }
      );
  } catch(error) {
      sendToTracker(JSON.stringify(error));
  }
},
1000);
