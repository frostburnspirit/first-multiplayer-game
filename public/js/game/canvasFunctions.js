function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(ctx, objects) {
  for (let i = 0; i < Object.keys(objects).length; i++) {
    Object.values(objects["layer" + (i + 1)]).forEach((object) => {
      // iterates over drawing layers in the correct order
      if (object.type === "circle") {
        // code here...
        // object values: type, x, y, radius, color, opacity
        ctx.beginPath();
        ctx.fillStyle = "#" + object.color;
        ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
        // ctx.stroke();
        ctx.fill();
      }
      // code for other types of objects (rectangles, images, text, etc)
    });
  }
}

function nextFrame(animatedFunction, framerate) {
  setTimeout(() => {
    requestAnimationFrame(animatedFunction);
  }, 1000 / framerate);
}

export default { clearCanvas, draw, nextFrame };
