function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(canvas, ctx, objects, pixelsPerMeter) {
  //^ only draw when at least a part of it in frame

  for (let i = 0; i < Object.keys(objects).length; i++) {
    Object.values(objects["layer" + (i + 1)]).forEach((object) => {
      // iterates over drawing layers in the correct order
      if (object.type === "circle") {
        // code here...
        // object values: type, x, y, radius, color, opacity
        ctx.beginPath();
        ctx.fillStyle = "#" + object.color;
        ctx.arc(
          object.pos.x * pixelsPerMeter,
          canvas.height - object.pos.y * pixelsPerMeter, // flips coordinates to the way more common im math
          object.radius * pixelsPerMeter,
          0,
          Math.PI * 2
        );
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
