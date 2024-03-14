function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(ctx) {
  ctx.beginPath();
  ctx.arc(
    200 + Math.random() * 200,
    100 + Math.random() * 200,
    100,
    0,
    Math.PI * 2
  );
  ctx.fill();
  ctx.stroke();
}

function nextFrame(animatedFunction, framerate) {
  setTimeout(() => {
    requestAnimationFrame(animatedFunction);
  }, 1000 / framerate);
}

export default { clearCanvas, drawCircle, nextFrame };
