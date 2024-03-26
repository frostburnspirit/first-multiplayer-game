function update(player, offset, canvas, pixelsPerMeter) {
  offset.x =
    (offset.x + player.pos.x) / 2 - canvas.width / (pixelsPerMeter * 4);
  offset.y =
    (offset.y + player.pos.y) / 2 - canvas.height / (pixelsPerMeter * 4);
  // adjust for framerate and player acceleration (should follow perfectly when acceleration is 0)
}

export default { update };
