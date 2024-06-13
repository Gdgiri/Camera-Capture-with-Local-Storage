// Access the required DOM elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("capture");
const capturedImage = document.getElementById("capturedImage");
const context = canvas.getContext("2d");

// Access the camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing the camera", error);
  });

// Load any stored image from local storage
const savedImage = localStorage.getItem("capturedImage");
if (savedImage) {
  capturedImage.src = savedImage;
}

// Capture the image when the button is clicked
captureButton.addEventListener("click", () => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageDataURL = canvas.toDataURL("image/png");
  capturedImage.src = imageDataURL;
  localStorage.setItem("capturedImage", imageDataURL);
});
