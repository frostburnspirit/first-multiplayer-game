function clearCanvas() {
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function nextFrame(animatedFunction) {
  setTimeout(() => {
    requestAnimationFrame(animatedFunction);
  }, 1000 / FPS);
}

export default {
  clearCanvas,
  nextFrame,
};
