// Единый источник данных — карточки методов и калькулятор берут ratio отсюда
const METHODS = [
  {
    id: "pourover",
    name: "Пуровер (V60)",
    taste: "Чистый, с выраженной кислотностью",
    grind: "Средне-мелкий",
    time: "2:30–3:30",
    ratio: 16,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M13 8h22l-9 14h-4z"/><line x1="24" y1="22" x2="24" y2="25"/><rect x="15" y="25" width="18" height="14" rx="2"/></svg>`
  },
  {
    id: "frenchpress",
    name: "Френч-пресс",
    taste: "Плотный, маслянистый",
    grind: "Крупный",
    time: "~4 мин",
    ratio: 15,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="14" y="14" width="18" height="26" rx="2"/><circle cx="23" cy="8" r="3"/><line x1="23" y1="11" x2="23" y2="17"/><path d="M32 20h4v10h-4"/></svg>`
  },
  {
    id: "aeropress",
    name: "Аэропресс",
    taste: "Концентрированный, гибкий",
    grind: "Мелко-средний",
    time: "1:30–2:00",
    ratio: 15,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="16" y="16" width="16" height="22" rx="1"/><rect x="13" y="9" width="22" height="6" rx="1"/><line x1="24" y1="9" x2="24" y2="4"/></svg>`
  },
  {
    id: "espresso",
    name: "Эспрессо",
    taste: "Насыщенный, с крема",
    grind: "Очень мелкий",
    time: "25–30 сек",
    ratio: 2,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M15 22h16l-2 12a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z"/><path d="M31 24h3a3 3 0 0 1 0 6h-3"/><ellipse cx="24" cy="39" rx="11" ry="2"/><path d="M20 16c0-2 2-2 2-4s-2-2-2-4"/><path d="M27 16c0-2 2-2 2-4s-2-2-2-4"/></svg>`
  },
  {
    id: "coldbrew",
    name: "Колд брю",
    taste: "Мягкий, низкая кислотность",
    grind: "Крупный",
    time: "12–18 часов",
    ratio: 8,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><rect x="16" y="16" width="16" height="22" rx="2"/><rect x="14" y="11" width="20" height="5" rx="1"/><rect x="29" y="27" width="6" height="6" rx="1" transform="rotate(15 32 30)"/></svg>`
  },
  {
    id: "mokapot",
    name: "Мока-пот",
    taste: "Крепкий, похож на эспрессо",
    grind: "Средне-мелкий",
    time: "4–5 мин",
    ratio: 10,
    icon: `<svg class="method-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M15 40h18l-2-10h-14z"/><path d="M16 30l3-10h10l3 10z"/><circle cx="24" cy="17" r="2"/><path d="M33 32h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/></svg>`
  }
];

function renderMethodCards() {
  const grid = document.getElementById("methods-grid");
  grid.innerHTML = METHODS.map(m => `
    <article class="method-card">
      ${m.icon}
      <h3>${m.name}</h3>
      <p class="taste">${m.taste}</p>
      <div class="method-stats">
        <div>Помол<strong>${m.grind}</strong></div>
        <div>Время<strong>${m.time}</strong></div>
        <div>Пропорция<strong>1 : ${m.ratio}</strong></div>
      </div>
    </article>
  `).join("");
}

function populateMethodSelect() {
  const select = document.getElementById("calc-method");
  select.innerHTML = METHODS.map(m => `<option value="${m.id}">${m.name} (1:${m.ratio})</option>`).join("");
}

function setupCalculator() {
  const select = document.getElementById("calc-method");
  const waterInput = document.getElementById("calc-water");
  const coffeeInput = document.getElementById("calc-coffee");
  const note = document.getElementById("calc-note");

  function currentRatio() {
    const method = METHODS.find(m => m.id === select.value);
    return method ? method.ratio : 15;
  }

  function fromWater() {
    const ratio = currentRatio();
    const water = parseFloat(waterInput.value);
    if (!isNaN(water) && water > 0) {
      coffeeInput.value = (water / ratio).toFixed(1);
      note.textContent = `${water} мл воды на ${(water / ratio).toFixed(1)} г кофе при 1:${ratio}`;
    }
  }

  function fromCoffee() {
    const ratio = currentRatio();
    const coffee = parseFloat(coffeeInput.value);
    if (!isNaN(coffee) && coffee > 0) {
      waterInput.value = Math.round(coffee * ratio);
      note.textContent = `${coffee} г кофе на ${Math.round(coffee * ratio)} мл воды при 1:${ratio}`;
    }
  }

  waterInput.addEventListener("input", fromWater);
  coffeeInput.addEventListener("input", fromCoffee);
  select.addEventListener("change", () => {
    if (waterInput.value) fromWater();
    else if (coffeeInput.value) fromCoffee();
  });

  // стартовые значения для выбранного по умолчанию метода
  waterInput.value = 300;
  fromWater();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMethodCards();
  populateMethodSelect();
  setupCalculator();
});
