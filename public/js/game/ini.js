const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");
const fps = 10;
const resolution = 1;

function ini() {
  window.focus;
  canvas.height = innerHeight * 0.8 * resolution; // 0.8 based on canvas taking 80% of the viewport height
  canvas.width = canvas.height * 1.5;
  // ctx.imageSmoothingEnabled = false;
}

export default {
  canvas,
  ctx,
  fps,
  ini,
};
