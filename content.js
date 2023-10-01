console.log("Hi, I have been injected");

var recorder = null;

function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  

  recorder.stop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  };

  recorder.ondataavailable = function (event) {
    let recorderBlob = event.data;
    let url = URL.createObjectURL(recorderBlob);

    let link = document.createElement("a");

    link.style.display = "none";
    link.href = url;
    link.download = "screen-recording.webm";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    //place for redirection
    //This is where the download page for the helpmeout will be.
    window.location.href = "https://google.com";
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("requesting recording");

    sendResponse(`processed: ${message.action}`);
    sendResponse(`processed: ${message.audioEnabled}`);
    sendResponse(`processed: ${message.videoEnabled}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: message.audioEnabled,
        video: message.videoEnabled,
      })
      .then((stream) => {
        onAccessApproved(stream);
      });
  }
});
