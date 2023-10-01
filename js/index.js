document.addEventListener("DOMContentLoaded", () => {
  const recordButton = document.querySelector(".record-button");
  const closeButton = document.querySelector(".close-button");
  const settingsButton = document.querySelector(".settings-button");
  const videoToggle = document.querySelector(".videoSelect");
  const audioToggle = document.querySelector(".audioSelect");

  let audioEnabled = audioToggle.checked;
  let videoEnabled = videoToggle.checked;

  recordButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request_recording", audioEnabled, videoEnabled },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);

            alert("Hello world");
          } else {
            console.log(chrome.runtime.lastError, "error line 14");
          }
        }
      );
    });
  });

  closeButton.addEventListener("click", () => {
    window.close();
  });
});
