// Единый источник данных — карточки методов и калькулятор берут ratio отсюда
const METHODS = [
  {
    id: "pourover",
    name: "Пуровер (V60)",
    taste: "Чистый, с выраженной кислотностью",
    grind: "Средне-мелкий",
    time: "2:30–3:30",
    ratio: 16
  },
  {
    id: "frenchpress",
    name: "Френч-пресс",
    taste: "Плотный, маслянистый",
    grind: "Крупный",
    time: "~4 мин",
    ratio: 15
  },
  {
    id: "aeropress",
    name: "Аэропресс",
    taste: "Концентрированный, гибкий",
    grind: "Мелко-средний",
    time: "1:30–2:00",
    ratio: 15
  },
  {
    id: "espresso",
    name: "Эспрессо",
    taste: "Насыщенный, с крема",
    grind: "Очень мелкий",
    time: "25–30 сек",
    ratio: 2
  },
  {
    id: "coldbrew",
    name: "Колд брю",
    taste: "Мягкий, низкая кислотность",
    grind: "Крупный",
    time: "12–18 часов",
    ratio: 8
  },
  {
    id: "mokapot",
    name: "Мока-пот",
    taste: "Крепкий, похож на эспрессо",
    grind: "Средне-мелкий",
    time: "4–5 мин",
    ratio: 10
  }
];

function renderMethodCards() {
  const grid = document.getElementById("methods-grid");
  grid.innerHTML = METHODS.map(m => `
    <article class="method-card">
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
