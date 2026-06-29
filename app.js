const notation = [
  { move: "R", title: "Right", text: "Правая грань на 90 градусов по часовой стрелке. R' — правая грань обратно." },
  { move: "L", title: "Left", text: "Левая грань. L' — обратный поворот левой грани." },
  { move: "U", title: "Up", text: "Верхняя грань. U' часто делается указательным пальцем назад." },
  { move: "D", title: "Down", text: "Нижняя грань. В CFOP встречается реже, но нужна в некоторых PLL." },
  { move: "F", title: "Front", text: "Передняя грань, которая смотрит на тебя. F' — обратно." },
  { move: "B", title: "Back", text: "Задняя грань. Смотреть надо как будто ты смотришь на заднюю сторону куба." },
  { move: "2", title: "Двойной поворот", text: "R2, U2, F2 означают поворот на 180 градусов. Направление обычно неважно." },
  { move: "'", title: "Prime / штрих", text: "Штрих после буквы означает обратный ход: R' читается как R prime." },
  { move: "r", title: "Wide move", text: "Маленькая буква или Rw: крутишь две правые вертикальные прослойки вместе." },
  { move: "M", title: "Средний слой", text: "M — средний слой между L и R. В PLL часто встречаются M и M2." },
  { move: "x", title: "Поворот куба", text: "x, y, z — поворот всего кубика. x идет как R, y как U, z как F." },
  { move: "()", title: "Скобки", text: "Скобки не являются ходом. Они просто показывают удобный кусок формулы." },
];

const algorithms = [
  { id: "f2l-1", stage: "F2L", name: "Базовая правая вставка", group: "Пара готова", alg: "U R U' R'", note: "Самая частая вставка пары в правый передний слот.", diagram: "slot" },
  { id: "f2l-2", stage: "F2L", name: "Базовая левая вставка", group: "Пара готова", alg: "U' L' U L", note: "Зеркало правой вставки для левого переднего слота.", diagram: "slot" },
  { id: "f2l-3", stage: "F2L", name: "Вставка через переднюю грань", group: "Пара готова", alg: "F' U' F", note: "Короткая вставка, когда пара удобнее заходит через F.", diagram: "slot" },
  { id: "f2l-4", stage: "F2L", name: "Разделить и вставить", group: "Связана неправильно", alg: "R U R' U' R U R'", note: "Разъединяет пару, разворачивает ее и вставляет в слот.", diagram: "slot" },
  { id: "f2l-5", stage: "F2L", name: "Разделить зеркально", group: "Связана неправильно", alg: "R U' R' U2 F' U' F", note: "Полезно, когда ребро и угол склеены неудобной стороной.", diagram: "slot" },
  { id: "f2l-6", stage: "F2L", name: "Угол сверху, белый вверх", group: "Построить пару", alg: "R U2 R' U' R U R'", note: "Подводит угол так, чтобы пара собралась без разрушения креста.", diagram: "slot" },
  { id: "f2l-7", stage: "F2L", name: "Белый вверх, другой угол", group: "Построить пару", alg: "U R U2 R' U R U' R'", note: "Сначала выносит ребро, потом вставляет готовую пару.", diagram: "slot" },
  { id: "f2l-8", stage: "F2L", name: "Ребро в слоте", group: "Достать элемент", alg: "R U' R' U y' R' U R", note: "Достает неправильно стоящее ребро и не ломает готовые пары.", diagram: "slot" },
  { id: "f2l-9", stage: "F2L", name: "Угол в слоте", group: "Достать элемент", alg: "R U R' U' R U R'", note: "Достает угол, после чего пару проще собрать сверху.", diagram: "slot" },
  { id: "f2l-10", stage: "F2L", name: "Оба элемента в слоте", group: "Достать пару", alg: "R U' R' U' R U R' U2 R U' R'", note: "Для случая, когда пара застряла неправильно и ее нужно пересобрать.", diagram: "slot" },
  { id: "f2l-11", stage: "F2L", name: "Слот через sledgehammer", group: "Триггер", alg: "R' F R F'", note: "Короткий триггер для некоторых F2L-ситуаций и OLL.", diagram: "slot" },
  { id: "f2l-12", stage: "F2L", name: "Sexy move", group: "Триггер", alg: "R U R' U'", note: "Главный куберский триггер. В F2L он помогает создавать пары.", diagram: "slot" },
  { id: "f2l-13", stage: "F2L", name: "Pair into back right", group: "Задний слот", alg: "y R U' R' U R U' R'", note: "Поверни куб y и используй знакомую правую механику.", diagram: "slot" },
  { id: "f2l-14", stage: "F2L", name: "Pair into back left", group: "Задний слот", alg: "y' L' U L U' L' U L", note: "Зеркальная идея для заднего слота.", diagram: "slot" },
  { id: "f2l-15", stage: "F2L", name: "F2L через U2", group: "Построить пару", alg: "U2 R U R' U R U' R'", note: "Удобно, когда пара требует длинного подвода верхом.", diagram: "slot" },
  { id: "f2l-16", stage: "F2L", name: "F2L без перехвата", group: "Построить пару", alg: "U' R U' R' U2 R U' R'", note: "Работает как аккуратная настройка перед вставкой.", diagram: "slot" },
  { id: "f2l-17", stage: "F2L", name: "F2L через F-грань", group: "Достать элемент", alg: "U' R' F R F' R U' R'", note: "Хорошо выручает, если обычные R/U ходы неудобны.", diagram: "slot" },
  { id: "f2l-18", stage: "F2L", name: "Connected pair", group: "Связанные пары", alg: "y' R' U2 R U R' U' R", note: "Вариант из стандартной F2L-библиотеки для уже связанной пары.", diagram: "slot" },
  { id: "f2l-19", stage: "F2L", name: "Disconnected pair", group: "Раздельные пары", alg: "U R U2 R' U R U' R'", note: "Подводит элементы так, чтобы они собрались перед вставкой.", diagram: "slot" },
  { id: "f2l-20", stage: "F2L", name: "Disconnected mirror", group: "Раздельные пары", alg: "y' U' R' U2 R U' R' U R", note: "Зеркальный удобный вариант предыдущего случая.", diagram: "slot" },
  { id: "f2l-21", stage: "F2L", name: "Case 21", group: "Белый смотрит вверх", alg: "U2 R U R' U R U' R'", note: "Случай из полной F2L-библиотеки: сначала настрой верх, затем вставь пару.", diagram: "slot" },
  { id: "f2l-22", stage: "F2L", name: "Case 22", group: "Белый смотрит вверх", alg: "y' U2 R' U' R U' R' U R", note: "Зеркальный вариант: держи слот справа и работай R/U-ходами.", diagram: "slot" },
  { id: "f2l-23", stage: "F2L", name: "Case 23", group: "Белый смотрит вверх", alg: "y' U R' U2 R y R U2 R' U R U' R'", note: "Длиннее базовых случаев, но хорошо показывает идею вынести и пересобрать пару.", diagram: "slot" },
  { id: "f2l-24", stage: "F2L", name: "Case 24", group: "Белый смотрит вверх", alg: "U' R U2 R' y' R' U2 R U' R' U R", note: "Зеркало сложного случая: не спеши, разбей формулу на два куска.", diagram: "slot" },
  { id: "f2l-25", stage: "F2L", name: "Case 25", group: "Угол внизу, ребро сверху", alg: "U R U' R' d' L' U L", note: "Достает угол из слота и сразу собирает пару с ребром сверху.", diagram: "slot" },
  { id: "f2l-26", stage: "F2L", name: "Case 26", group: "Угол внизу, ребро сверху", alg: "d' L' U L d R U' R'", note: "Тот же смысл с другим расположением пары относительно слота.", diagram: "slot" },
  { id: "f2l-27", stage: "F2L", name: "Case 27", group: "Угол внизу, ребро сверху", alg: "y' R' U' R U R' U' R", note: "Короткий случай: достал, связал, вставил.", diagram: "slot" },
  { id: "f2l-28", stage: "F2L", name: "Case 28", group: "Угол внизу, ребро сверху", alg: "R U R' U' R U R'", note: "Зеркальная механика через привычный sexy move.", diagram: "slot" },
  { id: "f2l-29", stage: "F2L", name: "Case 29", group: "Угол внизу, ребро сверху", alg: "R U' R' U R U' R'", note: "Подходит, когда пара почти готова, но требует перестройки сверху.", diagram: "slot" },
  { id: "f2l-30", stage: "F2L", name: "Case 30", group: "Угол внизу, ребро сверху", alg: "y' R' U R U' R' U R", note: "Зеркальная версия предыдущего случая.", diagram: "slot" },
  { id: "f2l-31", stage: "F2L", name: "Case 31", group: "Ребро внизу, угол сверху", alg: "U' R U' R' U2 R U' R'", note: "Ребро сидит внизу, поэтому сначала освободи его через верхний слой.", diagram: "slot" },
  { id: "f2l-32", stage: "F2L", name: "Case 32", group: "Ребро внизу, угол сверху", alg: "U R U R' U2 R U R'", note: "Похож на Case 31, но верхний слой крутится в другую сторону.", diagram: "slot" },
  { id: "f2l-33", stage: "F2L", name: "Case 33", group: "Ребро внизу, угол сверху", alg: "U' R U R' d R' U' R", note: "Выносит ребро из нижнего слоя и подготавливает обычную вставку.", diagram: "slot" },
  { id: "f2l-34", stage: "F2L", name: "Case 34", group: "Ребро внизу, угол сверху", alg: "d R' U' R d' R U R'", note: "Зеркальная логика: вытащи ребро и сразу свяжи пару.", diagram: "slot" },
  { id: "f2l-35", stage: "F2L", name: "Case 35", group: "Ребро внизу, угол сверху", alg: "R U' R' d R' U R", note: "Короткий случай с d-ходом, удобен без лишних перехватов.", diagram: "slot" },
  { id: "f2l-36", stage: "F2L", name: "Case 36", group: "Ребро внизу, угол сверху", alg: "R U R' U' R U R' U' R U R'", note: "Повторяющийся триггер: полезно учить ритмом, а не буквами.", diagram: "slot" },
  { id: "f2l-37", stage: "F2L", name: "Case 37", group: "Угол и ребро внизу", alg: "R U' R' U' R U R' U2 R U' R'", note: "Оба элемента внизу: сначала достань их в верхний слой, затем вставь.", diagram: "slot" },
  { id: "f2l-38", stage: "F2L", name: "Case 38", group: "Угол и ребро внизу", alg: "R U R' U2 R U' R' U R U R'", note: "Зеркальный вариант с другим направлением верхних ходов.", diagram: "slot" },
  { id: "f2l-39", stage: "F2L", name: "Case 39", group: "Угол и ребро внизу", alg: "R U' R' d R' U' R U' R' U' R", note: "Сложный случай: после d-хода смотри, как ребро выходит на верх.", diagram: "slot" },
  { id: "f2l-40", stage: "F2L", name: "Case 40", group: "Угол и ребро внизу", alg: "R U R' U' R U' R' U2 y' R' U' R", note: "Хорошо делится на знакомый триггер и финальную вставку.", diagram: "slot" },
  { id: "f2l-41", stage: "F2L", name: "Case 41", group: "Угол и ребро внизу", alg: "R U' R' U y' R' U2 R U2 R' U R", note: "Последний стандартный F2L-случай. Учить стоит после базовых пар.", diagram: "slot" },

  { id: "oll-27", stage: "OLL", name: "Sune", group: "OCLL после креста", alg: "R U R' U R U2 R'", note: "Один угол смотрит вверх. Держи правильный угол спереди-слева.", pattern: "001111111" },
  { id: "oll-26", stage: "OLL", name: "Anti-Sune", group: "OCLL после креста", alg: "R U2 R' U' R U' R'", note: "Зеркальный Sune. Часто учится сразу вместе с Sune.", pattern: "100111111" },
  { id: "oll-21", stage: "OLL", name: "H", group: "OCLL после креста", alg: "R U R' U R U' R' U R U2 R'", note: "Ни один угол не смотрит вверх, но желтый крест уже готов.", pattern: "010111010" },
  { id: "oll-22", stage: "OLL", name: "Pi", group: "OCLL после креста", alg: "R U2 R2 U' R2 U' R2 U2 R", note: "Похоже на две фары по бокам. Держи блоки симметрично.", pattern: "000111000" },
  { id: "oll-23", stage: "OLL", name: "Headlights", group: "OCLL после креста", alg: "R2 D R' U2 R D' R' U2 R'", note: "Две желтые наклейки на одной стороне как фары.", pattern: "101111101" },
  { id: "oll-24", stage: "OLL", name: "Chameleon", group: "OCLL после креста", alg: "r U R' U' r' F R F'", note: "Два угла смотрят вверх по диагонали.", pattern: "101111010" },
  { id: "oll-25", stage: "OLL", name: "Bowtie", group: "OCLL после креста", alg: "F' r U R' U' r' F R", note: "Форма напоминает бабочку. Проверяй ориентацию перед стартом.", pattern: "010111101" },

  { id: "pll-aa", stage: "PLL", name: "Aa-perm", group: "Углы", alg: "x R' U R' D2 R U' R' D2 R2 x'", note: "Перестановка трех углов по часовой стрелке.", diagram: "perm" },
  { id: "pll-ab", stage: "PLL", name: "Ab-perm", group: "Углы", alg: "x R2 D2 R U R' D2 R U' R x'", note: "Обратная перестановка трех углов.", diagram: "perm" },
  { id: "pll-e", stage: "PLL", name: "E-perm", group: "Углы", alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", note: "Диагональная перестановка углов.", diagram: "perm" },
  { id: "pll-f", stage: "PLL", name: "F-perm", group: "Углы и ребра", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", note: "Меняет пару углов и пару ребер.", diagram: "perm" },
  { id: "pll-ga", stage: "PLL", name: "Ga-perm", group: "G perms", alg: "R2 U R' U R' U' R U' R2 D U' R' U R D'", note: "Один из четырех G-случаев. Следи за блоком 1x2.", diagram: "perm" },
  { id: "pll-gb", stage: "PLL", name: "Gb-perm", group: "G perms", alg: "R' U' R U D' R2 U R' U R U' R U' R2 D", note: "G-случай с другим направлением блока.", diagram: "perm" },
  { id: "pll-gc", stage: "PLL", name: "Gc-perm", group: "G perms", alg: "R2 U' R U' R U R' U R2 D' U R U' R' D", note: "G-случай, где легко ошибиться с D-ходом.", diagram: "perm" },
  { id: "pll-gd", stage: "PLL", name: "Gd-perm", group: "G perms", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", note: "Последний G-случай из полной PLL-библиотеки.", diagram: "perm" },
  { id: "pll-h", stage: "PLL", name: "H-perm", group: "Только ребра", alg: "M2 U M2 U2 M2 U M2", note: "Меняет противоположные ребра. Очень быстрый на M-ходах.", diagram: "perm" },
  { id: "pll-ja", stage: "PLL", name: "Ja-perm", group: "J perms", alg: "x R2 F R F' R U2 r' U r U2", note: "Меняет соседние углы и соседние ребра.", diagram: "perm" },
  { id: "pll-jb", stage: "PLL", name: "Jb-perm", group: "J perms", alg: "R U R' F' R U R' U' R' F R2 U' R'", note: "Один из самых полезных PLL для старта.", diagram: "perm" },
  { id: "pll-na", stage: "PLL", name: "Na-perm", group: "N perms", alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", note: "Диагональная перестановка двух пар.", diagram: "perm" },
  { id: "pll-nb", stage: "PLL", name: "Nb-perm", group: "N perms", alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R", note: "Зеркальный N-случай.", diagram: "perm" },
  { id: "pll-ra", stage: "PLL", name: "Ra-perm", group: "R perms", alg: "R U' R' U' R U R D R' U' R D' R' U2 R'", note: "Соседние блоки, много R/U и один D.", diagram: "perm" },
  { id: "pll-rb", stage: "PLL", name: "Rb-perm", group: "R perms", alg: "R2 F R U R U' R' F' R U2 R' U2 R", note: "Зеркало Ra, часто запоминается через форму блоков.", diagram: "perm" },
  { id: "pll-t", stage: "PLL", name: "T-perm", group: "Углы и ребра", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", note: "Очень важный PLL: быстрый, частый, узнаваемый.", diagram: "perm" },
  { id: "pll-ua", stage: "PLL", name: "Ua-perm", group: "Только ребра", alg: "R U' R U R U R U' R' U' R2", note: "Цикл трех ребер. Можно учить вместе с Ub.", diagram: "perm" },
  { id: "pll-ub", stage: "PLL", name: "Ub-perm", group: "Только ребра", alg: "R2 U R U R' U' R' U' R' U R'", note: "Обратный цикл трех ребер.", diagram: "perm" },
  { id: "pll-v", stage: "PLL", name: "V-perm", group: "Углы и ребра", alg: "R' U R' U' y R' F' R2 U' R' U R' F R F", note: "Диагональные углы плюс ребра. Узнавай по большому блоку.", diagram: "perm" },
  { id: "pll-y", stage: "PLL", name: "Y-perm", group: "Углы и ребра", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", note: "Диагональная перестановка углов и соседних ребер.", diagram: "perm" },
  { id: "pll-z", stage: "PLL", name: "Z-perm", group: "Только ребра", alg: "M' U M2 U M2 U M' U2 M2", note: "Меняет две пары соседних ребер.", diagram: "perm" },
];

const state = {
  filter: "all",
  query: "",
  favorites: new Set(JSON.parse(localStorage.getItem("cfop-favorites") || "[]")),
};

const notationGrid = document.querySelector("#notationGrid");
const algorithmGrid = document.querySelector("#algorithmGrid");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll("[data-filter]");
const statsRow = document.querySelector("#statsRow");
const trainerPanel = document.querySelector("#trainerPanel");
const trainerSelect = document.querySelector("#trainerSelect");
const nextCaseButton = document.querySelector("#nextCaseButton");

function saveFavorites() {
  localStorage.setItem("cfop-favorites", JSON.stringify([...state.favorites]));
}

function tokenize(alg) {
  return alg.split(/\s+/).filter(Boolean);
}

function renderNotation() {
  notationGrid.innerHTML = notation
    .map(
      (item) => `
        <article class="notation-card">
          <div class="move-badge">${item.move}</div>
          <div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function diagramFor(item) {
  if (item.pattern) {
    return `<div class="diagram" aria-label="Схема верхней грани">${[...item.pattern]
      .map((cell) => `<span class="${cell === "1" ? "on" : ""}"></span>`)
      .join("")}</div>`;
  }

  const className = item.diagram === "perm" ? "perm" : "slot";
  return `<div class="diagram" aria-label="Условная схема случая">
    ${Array.from({ length: 9 })
      .map((_, index) => `<span class="${index === 4 ? "on" : className}"></span>`)
      .join("")}
  </div>`;
}

function cardTemplate(item, compact = false) {
  const favorite = state.favorites.has(item.id);
  const stageClass = item.stage.toLowerCase();
  return `
    <article class="algo-card" data-id="${item.id}">
      <div class="card-top">
        <div>
          <span class="stage-tag ${stageClass}">${item.stage} · ${item.group}</span>
          <h3>${item.name}</h3>
        </div>
        <button class="fav-button ${favorite ? "active" : ""}" data-fav="${item.id}" title="В избранное" aria-label="В избранное">${favorite ? "★" : "☆"}</button>
      </div>
      ${diagramFor(item)}
      <p>${item.note}</p>
      <div class="algorithm" aria-label="Алгоритм">
        ${tokenize(item.alg).map((token) => `<span class="token">${token}</span>`).join("")}
      </div>
      ${
        compact
          ? ""
          : `<div class="card-actions">
              <button class="copy-button" data-copy="${item.alg}">Копировать формулу</button>
            </div>`
      }
    </article>
  `;
}

function filteredAlgorithms() {
  const query = state.query.trim().toLowerCase();
  return algorithms.filter((item) => {
    const matchesFilter =
      state.filter === "all" ||
      item.stage === state.filter ||
      (state.filter === "favorite" && state.favorites.has(item.id));
    const haystack = `${item.name} ${item.stage} ${item.group} ${item.alg} ${item.note}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function renderStats(list) {
  const counts = ["F2L", "OLL", "PLL"].map((stage) => {
    const count = algorithms.filter((item) => item.stage === stage).length;
    return `<span class="stat-pill">${stage}: ${count}</span>`;
  });
  statsRow.innerHTML = [
    `<span class="stat-pill">Показано: ${list.length}</span>`,
    `<span class="stat-pill">Избранное: ${state.favorites.size}</span>`,
    ...counts,
  ].join("");
}

function renderAlgorithms() {
  const list = filteredAlgorithms();
  renderStats(list);
  algorithmGrid.innerHTML = list.length
    ? list.map((item) => cardTemplate(item)).join("")
    : `<p class="empty-state">Ничего не найдено. Попробуй другой запрос или фильтр.</p>`;
}

function pickTrainerCase() {
  const stage = trainerSelect.value;
  const pool = stage === "all" ? algorithms : algorithms.filter((item) => item.stage === stage);
  const item = pool[Math.floor(Math.random() * pool.length)];
  trainerPanel.innerHTML = cardTemplate(item, true);
}

document.addEventListener("click", async (event) => {
  const copyButton = event.target.closest("[data-copy]");
  const favoriteButton = event.target.closest("[data-fav]");

  if (copyButton) {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyButton.textContent = "Скопировано";
    setTimeout(() => {
      copyButton.textContent = "Копировать формулу";
    }, 1200);
  }

  if (favoriteButton) {
    const id = favoriteButton.dataset.fav;
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
    } else {
      state.favorites.add(id);
    }
    saveFavorites();
    renderAlgorithms();
    pickTrainerCase();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    renderAlgorithms();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderAlgorithms();
});

nextCaseButton.addEventListener("click", pickTrainerCase);
trainerSelect.addEventListener("change", pickTrainerCase);

renderNotation();
renderAlgorithms();
pickTrainerCase();
