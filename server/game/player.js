class Player {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.hp = 100;
  }

  tick() {
    // Placeholder for future per-frame logic
  }

  update(action) {
    if (!action) return;
    switch (action.type) {
      case 'move':
        this.x += action.dx;
        this.y += action.dy;
        this.x = Math.max(-400, Math.min(400, this.x));
        this.y = Math.max(-300, Math.min(300, this.y));
        break;
      case 'damage':
        this.hp -= action.amount;
        if (this.hp < 0) this.hp = 0;
        break;
    }
  }
}

module.exports = Player;
