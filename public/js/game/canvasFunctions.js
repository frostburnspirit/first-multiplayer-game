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

function draw(ctx, objects) {
  for (let i = 0; i < Object.keys(objects).length; i++) {
    Object.values(objects["layer" + (i + 1)]).forEach((object) => {
      // iterates over drawing layers in the correct order
      if (object.type === "circle") {
        console.log("Hello from player object in draw function!");
        // code here...
      }
      // code for other types of objects (rectangles, images, text, etc)
    });
  }
}

function nextFrame(animatedFunction, framerate) {
  throw new Error("Scripts stopped for debugging purposes.");
  setTimeout(() => {
    requestAnimationFrame(animatedFunction);
  }, 1000 / framerate);
}

export default { clearCanvas, draw, nextFrame };
