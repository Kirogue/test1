class Player {
  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.hp = 100;
  }

  update(action) {
    if (!action) return;
    switch (action.type) {
      case 'move':
        this.x += action.dx;
        this.y += action.dy;
        break;
      case 'damage':
        this.hp -= action.amount;
        if (this.hp < 0) this.hp = 0;
        break;
    }
  }
}

module.exports = Player;
