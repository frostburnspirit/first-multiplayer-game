function initialize(player) {
  Object.assign(player, {
    type: "circle",
    x: 100,
    y: 100,
    radius: 50,
    color: "441199",
  });
  // It is not possible to edit argument directly, so attributes are added to the already existing object instead, which does work
}

function move(player, keypresses) {
  if (keypresses.up) {
    player.y += 1;
  }
  if (keypresses.down) {
    player.y -= 1;
  }
  if (keypresses.left) {
    player.x -= 1;
  }
  if (keypresses.right) {
    player.x += 1;
  }
}

export default {
  initialize,
  move,
};
