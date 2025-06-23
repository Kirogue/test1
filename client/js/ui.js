const hudEl = document.getElementById('hud');

export function updateHUD(state) {
  hudEl.textContent = `Players: ${state.length}`;
}
