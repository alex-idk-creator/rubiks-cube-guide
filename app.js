const COLORS = {
  U: "#f5d34b",
  F: "#35a66f",
  R: "#e64c43",
  L: "#f39a35",
  B: "#2f6fdd",
  D: "#f7f7f2",
  dim: "#d9e0e7",
  ink: "#17202a",
  line: "#202b36",
  slot: "#0f8b8d",
  corner: "#f59f2f",
  edge: "#2f6fdd",
  pair: "#29a66a",
};

const notation = [
  { move: "R", title: "Правая грань", face: "R", dir: "cw", text: "Передняя грань смотрит на тебя. Крути правый слой вверх по стрелке." },
  { move: "R'", title: "Правая обратно", face: "R", dir: "ccw", text: "Та же правая грань, но стрелка идет вниз: это обратный ход." },
  { move: "L", title: "Левая грань", face: "L", dir: "cw", text: "Крути левый слой по стрелке. На фронтальной схеме он слева." },
  { move: "L'", title: "Левая обратно", face: "L", dir: "ccw", text: "Левый слой в обратную сторону. Отличие видно только по стрелке." },
  { move: "U", title: "Верхняя грань", face: "U", dir: "cw", text: "Крути верхний слой по стрелке, не меняя хват кубика." },
  { move: "U'", title: "Верхняя обратно", face: "U", dir: "ccw", text: "Верхний слой идет в обратную сторону относительно U." },
  { move: "F", title: "Передняя грань", face: "F", dir: "cw", text: "Крути всю переднюю грань, которая смотрит прямо на тебя." },
  { move: "F'", title: "Передняя обратно", face: "F", dir: "ccw", text: "Та же передняя грань, только вращение в обратную сторону." },
  { move: "D", title: "Нижняя грань", face: "D", dir: "cw", text: "Крути нижний слой по стрелке. Куб держи так же, белый снизу." },
  { move: "D'", title: "Нижняя обратно", face: "D", dir: "ccw", text: "Нижний слой обратно. Встречается в некоторых PLL." },
  { move: "B", title: "Задняя грань", face: "B", dir: "cw", text: "Задняя грань находится за кубиком. Пунктир показывает, что слой сзади." },
  { move: "B'", title: "Задняя обратно", face: "B", dir: "ccw", text: "Задняя грань в обратную сторону. Смотри на пунктирный задний слой." },
  { move: "R2", title: "Двойной ход", face: "R", dir: "double", text: "R2 значит повернуть правую грань два раза, на 180 градусов." },
  { move: "U2", title: "Верх на 180", face: "U", dir: "double", text: "U2 — верхний слой на пол-оборота. Направление неважно." },
  { move: "M", title: "Средний слой", face: "M", dir: "ccw", text: "Крути средний вертикальный слой между левой и правой гранью." },
  { move: "M'", title: "Средний обратно", face: "M", dir: "cw", text: "Тот же средний слой, но в обратную сторону." },
  { move: "M2", title: "Средний на 180", face: "M", dir: "double", text: "Средний слой поворачивается два раза." },
  { move: "r", title: "Широкий R", face: "Rw", dir: "cw", text: "Крути правую грань вместе со средним слоем. В формулах это маленькая r." },
  { move: "r'", title: "Широкий R обратно", face: "Rw", dir: "ccw", text: "Два правых слоя идут обратно." },
  { move: "d", title: "Широкий D", face: "Dw", dir: "cw", text: "Крути нижний слой вместе со средним горизонтальным слоем." },
  { move: "d'", title: "Широкий D обратно", face: "Dw", dir: "ccw", text: "Два нижних слоя идут обратно." },
  { move: "x", title: "Поворот x", face: "cube", dir: "turn", text: "Поверни весь куб как ход R: это смена хвата, не формула грани." },
  { move: "y", title: "Поворот y", face: "cube", dir: "turn", text: "Поверни весь куб вокруг вертикальной оси, как верхний слой U." },
  { move: "z", title: "Поворот z", face: "cube", dir: "turn", text: "Поверни весь куб вокруг передней оси, как ход F." },
];

const lessons = [
  {
    id: "notation",
    title: "1. Сначала выучи язык ходов",
    text: "Без R, U, F и штриха формулы выглядят как шум. Начни с визуальных карточек ниже.",
    action: "Открыть обозначения",
    target: "#notation",
  },
  {
    id: "f2l-basic",
    title: "2. F2L: думай парой, а не формулой",
    text: "Всегда ищи три вещи: угол, ребро и слот. Остальное на схемах приглушено.",
    action: "Показать F2L",
    filter: "F2L",
  },
  {
    id: "oll-cross",
    title: "3. OLL только после желтого креста",
    text: "Здесь оставлены только 7 OCLL. Ты уже умеешь делать крест новичковым способом.",
    action: "Показать 7 OLL",
    filter: "OLL",
  },
  {
    id: "pll-start",
    title: "4. PLL учи слоями",
    text: "Начни с H, Ua, Ub, T, Jb. Потом добавляй остальные, когда распознавание стало спокойным.",
    action: "Показать PLL",
    filter: "PLL",
  },
];

const finderOptions = {
  F2L: [
    { id: "f2l-ready", label: "Пара уже сверху", text: "угол и ребро стоят вместе", match: (item) => item.stage === "F2L" && item.visual?.pair },
    { id: "f2l-white-up", label: "Белый цвет сверху", text: "угол смотрит белым наверх", match: (item) => item.stage === "F2L" && (item.group.includes("Белый вверх") || item.name.includes("Угол белым вверх")) },
    { id: "f2l-edge-slot", label: "Ребро в слоте", text: "ребро застряло внизу", match: (item) => item.stage === "F2L" && (item.name.includes("Ребро в слоте") || item.group.includes("Ребро внизу")) },
    { id: "f2l-corner-slot", label: "Угол в слоте", text: "угол уже сидит внизу", match: (item) => item.stage === "F2L" && (item.name.includes("Угол в слоте") || item.group.includes("Угол внизу")) },
    { id: "f2l-wrong-pair", label: "Склеено неправильно", text: "пара есть, но цвета не совпали", match: (item) => item.stage === "F2L" && item.visual?.wrong },
  ],
  OLL: [
    { id: "oll-one", label: "Один угол желтый", text: "похоже на Sune", match: (item) => item.stage === "OLL" && (item.name.includes("Sune")) },
    { id: "oll-none", label: "Нет готовых углов", text: "H или Pi", match: (item) => item.stage === "OLL" && ["H", "Pi"].includes(item.name) },
    { id: "oll-headlights", label: "Есть фары", text: "две желтые сбоку рядом", match: (item) => item.stage === "OLL" && item.name.includes("Headlights") },
    { id: "oll-diagonal", label: "Диагональ", text: "готовые углы по диагонали", match: (item) => item.stage === "OLL" && ["Chameleon", "Bowtie"].includes(item.name) },
  ],
  PLL: [
    { id: "pll-edges", label: "Только ребра", text: "углы уже стоят правильно", match: (item) => item.stage === "PLL" && item.group.includes("Только ребра") },
    { id: "pll-block", label: "Есть готовый блок", text: "собранная сторона или пара", match: (item) => item.stage === "PLL" && (item.visual?.blocks || []).some((block) => !["none", "corners", "edges"].includes(block)) },
    { id: "pll-corners", label: "Проблема с углами", text: "ребра не главное", match: (item) => item.stage === "PLL" && item.group.includes("Углы") },
    { id: "pll-no-block", label: "Блоков нет", text: "диагональные случаи", match: (item) => item.stage === "PLL" && (item.visual?.blocks || []).includes("none") },
  ],
};

const stageInfo = {
  Cross: {
    title: "Крест",
    eyebrow: "Шаг 1",
    text: "Собери белый крест так, чтобы боковые цвета ребер совпали с центрами. Формулы здесь не нужны: важна проверка цветов.",
  },
  F2L: {
    title: "F2L",
    eyebrow: "Шаг 2",
    text: "Найди белый угол, подходящее ребро и слот. Схема должна показывать реальные цвета пары и центра.",
  },
  OLL: {
    title: "OLL после креста",
    eyebrow: "Шаг 3",
    text: "Желтый крест уже готов. Осталось развернуть только углы верхнего слоя: здесь ровно 7 OCLL.",
  },
  PLL: {
    title: "PLL",
    eyebrow: "Шаг 4",
    text: "Верх уже желтый. Теперь распознай блоки и переставь элементы верхнего слоя.",
  },
};

const stageOrder = ["Cross", "F2L", "OLL", "PLL"];

const algorithms = [
  { id: "f2l-1", stage: "F2L", level: "start", name: "Правая вставка", group: "База", alg: "U R U' R'", note: "Готовая пара сверху. Поставь ее над правым передним слотом и вставь.", visual: { type: "f2l", slot: "FR", corner: "UFR", edge: "UR", pair: true } },
  { id: "f2l-2", stage: "F2L", level: "start", name: "Левая вставка", group: "База", alg: "U' L' U L", note: "Зеркальная вставка в левый передний слот.", visual: { type: "f2l", slot: "FL", corner: "UFL", edge: "UL", pair: true } },
  { id: "f2l-3", stage: "F2L", level: "start", name: "Вставка через F", group: "База", alg: "F' U' F", note: "Короткая вставка, когда пара удобнее заходит через переднюю грань.", visual: { type: "f2l", slot: "FR", corner: "UF", edge: "UR", pair: true } },
  { id: "f2l-4", stage: "F2L", level: "start", name: "Sexy move", group: "Триггер", alg: "R U R' U'", note: "Главный триггер. Запомни как один жест, он постоянно строит и разбирает пары.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "UF" } },
  { id: "f2l-5", stage: "F2L", level: "start", name: "Sledgehammer", group: "Триггер", alg: "R' F R F'", note: "Еще один короткий жест. Полезен в F2L и OLL.", visual: { type: "f2l", slot: "FR", corner: "UF", edge: "FR" } },
  { id: "f2l-6", stage: "F2L", level: "start", name: "Разделить пару", group: "Пара склеена неправильно", alg: "R U R' U' R U R'", note: "Пара есть, но склеена неверно. Сначала разъедини ее, потом вставь.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "UR", wrong: true } },
  { id: "f2l-7", stage: "F2L", level: "start", name: "Угол белым вверх", group: "Построить пару", alg: "R U2 R' U' R U R'", note: "Белая наклейка угла сверху. Сначала заставь угол встретиться с ребром.", visual: { type: "f2l", slot: "FR", corner: "U", edge: "UR" } },
  { id: "f2l-8", stage: "F2L", level: "start", name: "Ребро в слоте", group: "Достать элемент", alg: "R U' R' U y' R' U R", note: "Ребро застряло внизу. Вытащи его в верхний слой, не ломая готовое.", visual: { type: "f2l", slot: "FR", corner: "UFR", edge: "FR" } },
  { id: "f2l-9", stage: "F2L", level: "start", name: "Угол в слоте", group: "Достать элемент", alg: "R U R' U' R U R'", note: "Угол сидит в слоте. Вытащи его наверх, потом собери пару нормально.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "UR" } },
  { id: "f2l-10", stage: "F2L", level: "more", name: "Оба элемента в слоте", group: "Достать пару", alg: "R U' R' U' R U R' U2 R U' R'", note: "Оба элемента застряли неправильно. Сначала выводим их в верхний слой.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "FR", wrong: true } },
  { id: "f2l-11", stage: "F2L", level: "more", name: "Задний правый слот", group: "Задние слоты", alg: "y R U' R' U R U' R'", note: "Задние слоты легче решать, повернув куб и используя знакомую механику.", visual: { type: "f2l", slot: "BR", corner: "UBR", edge: "UR", pair: true } },
  { id: "f2l-12", stage: "F2L", level: "more", name: "Задний левый слот", group: "Задние слоты", alg: "y' L' U L U' L' U L", note: "Зеркальная работа с задним слотом.", visual: { type: "f2l", slot: "BL", corner: "UBL", edge: "UL", pair: true } },
  { id: "f2l-13", stage: "F2L", level: "all", name: "F2L через U2", group: "Построить пару", alg: "U2 R U R' U R U' R'", note: "Длинный подвод верхом перед обычной вставкой.", visual: { type: "f2l", slot: "FR", corner: "U", edge: "UF" } },
  { id: "f2l-14", stage: "F2L", level: "all", name: "F2L без перехвата", group: "Построить пару", alg: "U' R U' R' U2 R U' R'", note: "Настройка верхнего слоя без перехвата кубика.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "UB" } },
  { id: "f2l-15", stage: "F2L", level: "all", name: "F2L через F-грань", group: "Достать элемент", alg: "U' R' F R F' R U' R'", note: "Полезно, когда обычные R/U ходы неудобны.", visual: { type: "f2l", slot: "FR", corner: "UF", edge: "FR" } },
  { id: "f2l-16", stage: "F2L", level: "all", name: "Connected pair", group: "Связанные пары", alg: "y' R' U2 R U R' U' R", note: "Пара связана, но стоит неудобно. Доведи ее над слот.", visual: { type: "f2l", slot: "FL", corner: "UFL", edge: "UL", pair: true } },
  { id: "f2l-17", stage: "F2L", level: "all", name: "Disconnected pair", group: "Раздельные пары", alg: "U R U2 R' U R U' R'", note: "Угол и ребро отдельно сверху: сначала сделай пару.", visual: { type: "f2l", slot: "FR", corner: "U", edge: "UR" } },
  { id: "f2l-18", stage: "F2L", level: "all", name: "Disconnected mirror", group: "Раздельные пары", alg: "y' U' R' U2 R U' R' U R", note: "То же с другой стороны.", visual: { type: "f2l", slot: "FL", corner: "U", edge: "UL" } },
  { id: "f2l-19", stage: "F2L", level: "all", name: "Case 19", group: "Белый вверх", alg: "U2 R U R' U R U' R'", note: "Белая наклейка сверху: сначала собери пару, затем вставляй.", visual: { type: "f2l", slot: "FR", corner: "U", edge: "UF" } },
  { id: "f2l-20", stage: "F2L", level: "all", name: "Case 20", group: "Белый вверх", alg: "y' U2 R' U' R U' R' U R", note: "Зеркальный вариант.", visual: { type: "f2l", slot: "FL", corner: "U", edge: "UL" } },
  { id: "f2l-21", stage: "F2L", level: "all", name: "Case 21", group: "Белый вверх", alg: "y' U R' U2 R y R U2 R' U R U' R'", note: "Сложный случай: разбей на подготовку пары и финальную вставку.", visual: { type: "f2l", slot: "FR", corner: "UB", edge: "UR" } },
  { id: "f2l-22", stage: "F2L", level: "all", name: "Case 22", group: "Белый вверх", alg: "U' R U2 R' y' R' U2 R U' R' U R", note: "Зеркало сложного случая. Смотри на путь пары, а не на всю строку сразу.", visual: { type: "f2l", slot: "FL", corner: "UB", edge: "UL" } },
  { id: "f2l-23", stage: "F2L", level: "all", name: "Case 23", group: "Угол внизу, ребро сверху", alg: "U R U' R' d' L' U L", note: "Угол внизу, ребро сверху. Сначала вытащи угол в рабочую зону.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "UF" } },
  { id: "f2l-24", stage: "F2L", level: "all", name: "Case 24", group: "Угол внизу, ребро сверху", alg: "d' L' U L d R U' R'", note: "Похожий случай с другим расположением пары относительно слота.", visual: { type: "f2l", slot: "FL", corner: "FL", edge: "UL" } },
  { id: "f2l-25", stage: "F2L", level: "all", name: "Case 25", group: "Угол внизу, ребро сверху", alg: "y' R' U' R U R' U' R", note: "Коротко: достал, связал, вставил.", visual: { type: "f2l", slot: "FL", corner: "FL", edge: "UF" } },
  { id: "f2l-26", stage: "F2L", level: "all", name: "Case 26", group: "Угол внизу, ребро сверху", alg: "R U R' U' R U R'", note: "Зеркальная механика через привычный триггер.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "UR" } },
  { id: "f2l-27", stage: "F2L", level: "all", name: "Case 27", group: "Угол внизу, ребро сверху", alg: "R U' R' U R U' R'", note: "Пара почти готова, но требует перестройки верхом.", visual: { type: "f2l", slot: "FR", corner: "UF", edge: "UR" } },
  { id: "f2l-28", stage: "F2L", level: "all", name: "Case 28", group: "Угол внизу, ребро сверху", alg: "y' R' U R U' R' U R", note: "Зеркальная версия предыдущего случая.", visual: { type: "f2l", slot: "FL", corner: "UL", edge: "UF" } },
  { id: "f2l-29", stage: "F2L", level: "all", name: "Case 29", group: "Ребро внизу, угол сверху", alg: "U' R U' R' U2 R U' R'", note: "Ребро сидит внизу. Освободи его и собери пару сверху.", visual: { type: "f2l", slot: "FR", corner: "UFR", edge: "FR" } },
  { id: "f2l-30", stage: "F2L", level: "all", name: "Case 30", group: "Ребро внизу, угол сверху", alg: "U R U R' U2 R U R'", note: "То же, но верх уводится в другую сторону.", visual: { type: "f2l", slot: "FL", corner: "UFL", edge: "FL" } },
  { id: "f2l-31", stage: "F2L", level: "all", name: "Case 31", group: "Ребро внизу, угол сверху", alg: "U' R U R' d R' U' R", note: "Выносит ребро из нижнего слоя и готовит обычную вставку.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "FR" } },
  { id: "f2l-32", stage: "F2L", level: "all", name: "Case 32", group: "Ребро внизу, угол сверху", alg: "d R' U' R d' R U R'", note: "Зеркальная логика: вытащи ребро и свяжи пару.", visual: { type: "f2l", slot: "FL", corner: "UL", edge: "FL" } },
  { id: "f2l-33", stage: "F2L", level: "all", name: "Case 33", group: "Ребро внизу, угол сверху", alg: "R U' R' d R' U R", note: "Короткий случай с d-ходом. Следи за ребром в слоте.", visual: { type: "f2l", slot: "FR", corner: "UF", edge: "FR" } },
  { id: "f2l-34", stage: "F2L", level: "all", name: "Case 34", group: "Ребро внизу, угол сверху", alg: "R U R' U' R U R' U' R U R'", note: "Повторяющийся ритм. Учи как движение, не как набор букв.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "FR" } },
  { id: "f2l-35", stage: "F2L", level: "all", name: "Case 35", group: "Угол и ребро внизу", alg: "R U' R' U' R U R' U2 R U' R'", note: "Оба элемента внизу. Выведи их наверх и собери пару.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "FR", wrong: true } },
  { id: "f2l-36", stage: "F2L", level: "all", name: "Case 36", group: "Угол и ребро внизу", alg: "R U R' U2 R U' R' U R U R'", note: "Зеркальный вариант с другим направлением верхних ходов.", visual: { type: "f2l", slot: "FL", corner: "FL", edge: "FL", wrong: true } },
  { id: "f2l-37", stage: "F2L", level: "all", name: "Case 37", group: "Угол и ребро внизу", alg: "R U' R' d R' U' R U' R' U' R", note: "После d-хода смотри, как ребро выходит наверх.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "FR", wrong: true } },
  { id: "f2l-38", stage: "F2L", level: "all", name: "Case 38", group: "Угол и ребро внизу", alg: "R U R' U' R U' R' U2 y' R' U' R", note: "Делится на знакомый триггер и финальную вставку.", visual: { type: "f2l", slot: "FR", corner: "FR", edge: "FR", pair: true } },
  { id: "f2l-39", stage: "F2L", level: "all", name: "Case 39", group: "Угол и ребро внизу", alg: "R U' R' U y' R' U2 R U2 R' U R", note: "Продвинутый случай. Учить после базовых пар.", visual: { type: "f2l", slot: "FL", corner: "FL", edge: "FL", pair: true } },
  { id: "f2l-40", stage: "F2L", level: "all", name: "Case 40", group: "Пара почти готова", alg: "U R U' R' U' F' U F", note: "Используй, когда F-вставка делает меньше лишних движений.", visual: { type: "f2l", slot: "FR", corner: "UFR", edge: "UF", pair: true } },
  { id: "f2l-41", stage: "F2L", level: "all", name: "Case 41", group: "Пара почти готова", alg: "U' L' U L U F U' F'", note: "Зеркальная версия через левую руку и переднюю грань.", visual: { type: "f2l", slot: "FL", corner: "UFL", edge: "UF", pair: true } },
  { id: "f2l-42", stage: "F2L", level: "all", name: "Case 42", group: "Учебный контроль", alg: "R U' R' U F' U' F", note: "Дополнительный учебный вариант для полного набора: сравни цвета пары, поставь ее над слотом и вставь без угадывания.", visual: { type: "f2l", slot: "FR", corner: "UR", edge: "UF", pair: true } },

  { id: "oll-27", stage: "OLL", level: "start", name: "Sune", group: "OCLL", alg: "R U R' U R U2 R'", note: "Один угол уже желтый сверху. Остальные углы развернутся этой формулой.", visual: { type: "oll", top: "010111110", sides: ["F1", "R0", "R2"], hold: "готовый угол спереди-слева" } },
  { id: "oll-26", stage: "OLL", level: "start", name: "Anti-Sune", group: "OCLL", alg: "R U2 R' U' R U' R'", note: "Зеркальный Sune. Сравни боковые желтые наклейки перед стартом.", visual: { type: "oll", top: "010111011", sides: ["F1", "L0", "L2"], hold: "готовый угол спереди-справа" } },
  { id: "oll-21", stage: "OLL", level: "more", name: "H", group: "OCLL", alg: "R U2 R' U' R U R' U' R U' R'", note: "На верхней грани нет готовых углов, но желтый крест уже есть.", visual: { type: "oll", top: "010111010", sides: ["F0", "F2", "B0", "B2"], hold: "без желтых углов сверху, фары на двух сторонах" } },
  { id: "oll-22", stage: "OLL", level: "more", name: "Pi", group: "OCLL", alg: "R U2 R2 U' R2 U' R2 U2 R", note: "Нет готовых углов сверху. Отличается парой боковых желтых наклеек на одной стороне.", visual: { type: "oll", top: "010111010", sides: ["F0", "F2"], hold: "фары на одной стороне" } },
  { id: "oll-23", stage: "OLL", level: "more", name: "Headlights", group: "OCLL", alg: "R2 D' R U2 R' D R U2 R", note: "Два угла уже желтые сверху на одной стороне. Держи боковые фары слева.", visual: { type: "oll", top: "110111110", sides: ["L0", "L2"], hold: "фары слева" } },
  { id: "oll-24", stage: "OLL", level: "more", name: "Chameleon", group: "OCLL", alg: "r U R' U' r' F R F'", note: "Два готовых угла по диагонали. Ориентируйся по боковым желтым.", visual: { type: "oll", top: "011111110", sides: ["F2", "B0"], hold: "желтые углы по диагонали" } },
  { id: "oll-25", stage: "OLL", level: "more", name: "Bowtie", group: "OCLL", alg: "F' r U R' U' r' F R", note: "Два готовых угла рядом, но боковые желтые образуют форму бабочки.", visual: { type: "oll", top: "010111111", sides: ["F0", "R2"], hold: "форма бабочки по боковым наклейкам" } },

  { id: "pll-h", stage: "PLL", level: "start", name: "H-perm", group: "Только ребра", alg: "M2 U M2 U2 M2 U M2", note: "Меняет противоположные ребра. Углы уже правильные.", visual: { type: "pll", kind: "edges-opposite", blocks: ["corners"], arrows: "opposite" } },
  { id: "pll-ua", stage: "PLL", level: "start", name: "Ua-perm", group: "Только ребра", alg: "R U' R U R U R U' R' U' R2", note: "Цикл трех ребер по верхнему слою.", visual: { type: "pll", kind: "edges-cycle-cw", blocks: ["corners"], arrows: "cw" } },
  { id: "pll-ub", stage: "PLL", level: "start", name: "Ub-perm", group: "Только ребра", alg: "R2 U R U R' U' R' U' R' U R'", note: "Обратный цикл трех ребер.", visual: { type: "pll", kind: "edges-cycle-ccw", blocks: ["corners"], arrows: "ccw" } },
  { id: "pll-t", stage: "PLL", level: "start", name: "T-perm", group: "Углы и ребра", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", note: "Один из самых важных PLL. Есть понятный готовый блок.", visual: { type: "pll", kind: "t", blocks: ["back"], arrows: "swap" } },
  { id: "pll-jb", stage: "PLL", level: "start", name: "Jb-perm", group: "J perms", alg: "R U R' F' R U R' U' R' F R2 U' R'", note: "Частый PLL с длинным готовым блоком.", visual: { type: "pll", kind: "j", blocks: ["left"], arrows: "adjacent" } },
  { id: "pll-z", stage: "PLL", level: "more", name: "Z-perm", group: "Только ребра", alg: "M' U M2 U M2 U M' U2 M2", note: "Меняет две пары соседних ребер.", visual: { type: "pll", kind: "edges-cross", blocks: ["corners"], arrows: "cross" } },
  { id: "pll-aa", stage: "PLL", level: "more", name: "Aa-perm", group: "Углы", alg: "x R' U R' D2 R U' R' D2 R2 x'", note: "Три угла по кругу, ребра не главное.", visual: { type: "pll", kind: "corners-cw", blocks: ["edges"], arrows: "cw" } },
  { id: "pll-ab", stage: "PLL", level: "more", name: "Ab-perm", group: "Углы", alg: "x R2 D2 R U R' D2 R U' R x'", note: "Три угла в обратную сторону.", visual: { type: "pll", kind: "corners-ccw", blocks: ["edges"], arrows: "ccw" } },
  { id: "pll-y", stage: "PLL", level: "more", name: "Y-perm", group: "Углы и ребра", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", note: "Диагональная перестановка углов и соседних ребер.", visual: { type: "pll", kind: "diagonal", blocks: ["none"], arrows: "diagonal" } },
  { id: "pll-f", stage: "PLL", level: "all", name: "F-perm", group: "Углы и ребра", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", note: "Меняет соседнюю пару углов и ребер.", visual: { type: "pll", kind: "f", blocks: ["front"], arrows: "swap" } },
  { id: "pll-e", stage: "PLL", level: "all", name: "E-perm", group: "Углы", alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", note: "Диагональная перестановка углов. Готовых соседних блоков нет.", visual: { type: "pll", kind: "corners-diagonal", blocks: ["none"], arrows: "diagonal" } },
  { id: "pll-ja", stage: "PLL", level: "all", name: "Ja-perm", group: "J perms", alg: "x R2 F R F' R U2 r' U r U2", note: "Зеркальная J-перестановка.", visual: { type: "pll", kind: "j", blocks: ["right"], arrows: "adjacent" } },
  { id: "pll-ra", stage: "PLL", level: "all", name: "Ra-perm", group: "R perms", alg: "R U' R' U' R U R D R' U' R D' R' U2 R'", note: "Соседние блоки и один D-ход.", visual: { type: "pll", kind: "r", blocks: ["right"], arrows: "swap" } },
  { id: "pll-rb", stage: "PLL", level: "all", name: "Rb-perm", group: "R perms", alg: "R2 F R U R U' R' F' R U2 R' U2 R", note: "Зеркало Ra.", visual: { type: "pll", kind: "r", blocks: ["left"], arrows: "swap" } },
  { id: "pll-v", stage: "PLL", level: "all", name: "V-perm", group: "Углы и ребра", alg: "R' U R' U' y R' F' R2 U' R' U R' F R F", note: "Диагональные углы плюс ребра. Ищи крупный готовый блок.", visual: { type: "pll", kind: "v", blocks: ["back"], arrows: "diagonal" } },
  { id: "pll-na", stage: "PLL", level: "all", name: "Na-perm", group: "N perms", alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", note: "Две диагональные пары.", visual: { type: "pll", kind: "n", blocks: ["none"], arrows: "diagonal" } },
  { id: "pll-nb", stage: "PLL", level: "all", name: "Nb-perm", group: "N perms", alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R", note: "Зеркальный N-случай.", visual: { type: "pll", kind: "n", blocks: ["none"], arrows: "diagonal" } },
  { id: "pll-ga", stage: "PLL", level: "all", name: "Ga-perm", group: "G perms", alg: "R2 U R' U R' U' R U' R2 D U' R' U R D'", note: "У G-perm всегда есть маленький блок. Начинай с поиска блока.", visual: { type: "pll", kind: "g", blocks: ["right"], arrows: "cycle" } },
  { id: "pll-gb", stage: "PLL", level: "all", name: "Gb-perm", group: "G perms", alg: "R' U' R U D' R2 U R' U R U' R U' R2 D", note: "G-случай с блоком в другом месте.", visual: { type: "pll", kind: "g", blocks: ["front"], arrows: "cycle" } },
  { id: "pll-gc", stage: "PLL", level: "all", name: "Gc-perm", group: "G perms", alg: "R2 U' R U' R U R' U R2 D' U R U' R' D", note: "Следи за D-ходом и блоком.", visual: { type: "pll", kind: "g", blocks: ["left"], arrows: "cycle" } },
  { id: "pll-gd", stage: "PLL", level: "all", name: "Gd-perm", group: "G perms", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", note: "Последний G-случай.", visual: { type: "pll", kind: "g", blocks: ["back"], arrows: "cycle" } },
];

const verifiedF2LSource = [
  { n: 1, group: "Free Pairs", alg: "U R U' R'", fl: "lllllgllgllwgglggloollooloollwgglggloollooloo", alts: ["U R U' R'", "R' F R F'", "y' r' U' R U M'"] },
  { n: 2, group: "Free Pairs", alg: "F R' F' R", fl: "llllllloolgggglgglwlllooloolgggglgglwlllooloo", alts: ["F R' F' R", "y' U' R' U R", "U' F' U F"] },
  { n: 3, group: "Free Pairs", alg: "F' U' F", fl: "lllollllgllwgglgglolllooloollwgglgglolllooloo", alts: ["F' U' F", "y' R' U' R", "y L' U' L"] },
  { n: 4, group: "Free Pairs", alg: "R U R'", fl: "lgllllllollggglgglwlllooloollggglgglwlllooloo", alts: ["R U R'", "y' f R f'", "y F U F'"] },
  { n: 5, group: "Disconnected Pairs", alg: "U' R U R' U2 R U' R'", fl: "lgllllllgllwgglgglolllooloollwgglgglolllooloo", alts: ["U' R U R' U2 R U' R'", "F2 L' U' L U F2", "U' R U R' U' R U2 R'"] },
  { n: 6, group: "Disconnected Pairs", alg: "U' r U' R' U R U r'", fl: "lllollllollggglgglwlllooloollggglgglwlllooloo", alts: ["U' r U' R' U R U r'", "y' U R' U' R U2 R' U R", "d R' U' R U2 R' U R"] },
  { n: 7, group: "Disconnected Pairs", alg: "U' R U2 R' U' R U2 R'", fl: "lllgllllgllwgglgglolllooloollwgglgglolllooloo", alts: ["U' R U2 R' U' R U2 R'", "M' U' M U2 r U' r'", "U' R U2 R' U2 R U' R'"] },
  { n: 8, group: "Disconnected Pairs", alg: "d R' U2 R U R' U2 R", fl: "lollllllollggglgglwlllooloollggglgglwlllooloo", alts: ["d R' U2 R U R' U2 R", "r' U2 R2 U R2 U r", "y' U R' U2 R U2 R' U R"] },
  { n: 9, group: "Disconnected Pairs", alg: "U' R U' R' U F' U' F", fl: "lollllllgllwgglgglolllooloollwgglgglolllooloo", alts: ["U' R U' R' U F' U' F", "F R U R' U' F' R U' R'", "U' R U' R' d R' U' R"] },
  { n: 10, group: "Disconnected Pairs", alg: "U' R U R' U R U R'", fl: "lllgllllollggglgglwlllooloollggglgglwlllooloo", alts: ["U' R U R' U R U R'", "U2 R U' R' U' R U R'", "d R' U R d' R U R'"] },
  { n: 11, group: "Connected Pairs", alg: "U' R U2 R' U F' U' F", fl: "lllllollgllwgglgglogllooloollwgglgglogllooloo", alts: ["U' R U2 R' U F' U' F", "y' R U2 R2 U' R2 U' R'", "U' R U2 R' d R' U' R"] },
  { n: 12, group: "Connected Pairs", alg: "R U' R' U R U' R' U2 R U' R'", fl: "lllllllgologgglgglwlllooloologgglgglwlllooloo", alts: ["R U' R' U R U' R' U2 R U' R'", "R' U2 R2 U R2 U R", "U R U' R' U' R U R' U' R U R'"] },
  { n: 13, group: "Connected Pairs", alg: "y' U R' U R U' R' U' R", fl: "llllllloglgwgglgglolllooloolgwgglgglolllooloo", alts: ["y' U R' U R U' R' U' R", "M' U' R U R' U2 R U' r'", "R U' R' U R' F R F' R U' R'"] },
  { n: 14, group: "Connected Pairs", alg: "U' R U' R' U R U R'", fl: "lllllgllollggglgglwollooloollggglgglwollooloo", alts: ["U' R U' R' U R U R'", "R U2 R' U2 R U R' U2 R U' R'", "U' R2 D R' U R D' R2"] },
  { n: 15, group: "Connected Pairs", alg: "R' D' R U' R' D R U R U' R'", fl: "lllllllgglowgglgglolllooloolowgglgglolllooloo", alts: ["R' D' R U' R' D R U R U' R'", "M U r U' r' U' M'", "R U R' U2 R U' R' U R U' R'"] },
  { n: 16, group: "Connected Pairs", alg: "R U' R' U2 F' U' F", fl: "lllllollollggglgglwgllooloollggglgglwgllooloo", alts: ["R U' R' U2 F' U' F", "R U' R' U2 y' R' U' R", "U M' U R U' r' U' R U R'"] },
  { n: 17, group: "Connected Pairs", alg: "R U2 R' U' R U R'", fl: "lllllgllwllogglgglgollooloollogglgglgollooloo", alts: ["R U2 R' U' R U R'", "y2 L U2 L' U' L U L'", "R U R' U' R U2 R' U2 R U R'"] },
  { n: 18, group: "Connected Pairs", alg: "y' R' U2 R U R' U' R", fl: "lllllllowlgogglgglglllooloolgogglgglglllooloo", alts: ["y' R' U2 R U R' U' R", "y L' U2 L U L' U' L", "F' U2 F U F' U' F"] },
  { n: 19, group: "Disconnected Pairs", alg: "U R U2 R' U R U' R'", fl: "lgllllllwllogglgglglllooloollogglgglglllooloo", alts: ["U R U2 R' U R U' R'", "U R U2 R2 F R F'", "d f R2 f' U f R' f'"] },
  { n: 20, group: "Disconnected Pairs", alg: "y' U' R' U2 R U' R' U R", fl: "lllollllwllogglgglglllooloollogglgglglllooloo", alts: ["y' U' R' U2 R U' R' U R", "U' R U' R2 F R F' R U' R'", "y U' L' U2 L U' L' U L"] },
  { n: 21, group: "Disconnected Pairs", alg: "U2 R U R' U R U' R'", fl: "lllgllllwllogglgglglllooloollogglgglglllooloo", alts: ["U2 R U R' U R U' R'", "R U' R' U2 R U R'", "R B U2 B' R'"] },
  { n: 22, group: "Disconnected Pairs", alg: "r U' r' U2 r U r'", fl: "lollllllwllogglgglglllooloollogglgglglllooloo", alts: ["r U' r' U2 r U r'", "F' L' U2 L F", "y' U2 R' U' R U' R' U R"] },
  { n: 23, group: "Connected Pairs", alg: "U R U' R' U' R U' R' U R U' R'", fl: "lllllllgwloogglgglgllloolooloogglgglglllooloo", alts: ["U R U' R' U' R U' R' U R U' R'", "R U R' U2 R U R' U' R U R'", "U2 R2 U2 R' U' R U' R2"] },
  { n: 24, group: "Connected Pairs", alg: "F U R U' R' F' R U' R'", fl: "lllllollwllogglgglggllooloollogglgglggllooloo", alts: ["F U R U' R' F' R U' R'", "U' R U R2 F R F' R U' R'", "y' R' U' R U2 R' U' R U R' U' R"] },
  { n: 25, group: "Corner In Slot", alg: "U' R' F R F' R U R'", fl: "lllllgllllllgglggglollooooolllgglggglollooooo", alts: ["U' R' F R F' R U R'", "R' F' R U R U' R' F", "U' F' R U R' U' R' F R"] },
  { n: 26, group: "Corner In Slot", alg: "U R U' R' F R' F' R", fl: "lllllllollglgglgggllllooooolglgglgggllllooooo", alts: ["U R U' R' F R' F' R", "R S' R' U R S R'", "U R U R' U' y L' U' L"] },
  { n: 27, group: "Corner In Slot", alg: "R U' R' U R U' R'", fl: "lllllgllllllgglggwlolloogoolllgglggwlolloogoo", alts: ["R U' R' U R U' R'", "F' U' F U2 R U' R'", "y' f R' f' U f R' f'"] },
  { n: 28, group: "Corner In Slot", alg: "R U R' U' F R' F' R", fl: "lllllllollglgglggolllloowoolglgglggolllloowoo", alts: ["R U R' U' F R' F' R", "y L' U L U' L' U L", "F' U F U' F' U F"] },
  { n: 29, group: "Corner In Slot", alg: "R' F R F' U R U' R'", fl: "lllllllollglgglggwlllloogoolglgglggwlllloogoo", alts: ["R' F R F' U R U' R'", "y L' U' L U L' U' L", "y' R' U' R U R' U' R"] },
  { n: 30, group: "Corner In Slot", alg: "R U R' U' R U R'", fl: "lllllgllllllgglggololloowoolllgglggololloowoo", alts: ["R U R' U' R U R'", "U' R U2 R' U2 R U R'", "U' F R' F' R2 U R'"] },
  { n: 31, group: "Edge In Slot", alg: "U' R' F R F' R U' R'", fl: "llllllllwlloggogglgllgooloolloggogglgllgooloo", alts: ["U' R' F R F' R U' R'", "R U' R' U y' R' U R", "F' U F R U2 R'"] },
  { n: 32, group: "Edge In Slot", alg: "U R U' R' U R U' R' U R U' R'", fl: "llllllllwlloggggglglloooloolloggggglglloooloo", alts: ["U R U' R' U R U' R' U R U' R'", "R U R' U' R U R' U' R U R'", "R2 U R2 U R2 U2 R2"] },
  { n: 33, group: "Edge In Slot", alg: "U' R U' R' U2 R U' R'", fl: "llllllllgllwggggglolloooloollwggggglolloooloo", alts: ["U' R U' R' U2 R U' R'", "y R' D R U' R' D' R", "R U R' U' R U' R' U R U' R'"] },
  { n: 34, group: "Edge In Slot", alg: "U R U R' U2 R U R'", fl: "llllllllollgggggglwlloooloollgggggglwlloooloo", alts: ["U R U R' U2 R U R'", "U' R U2 R' U R U R'", "U R' D' R U' R' D R"] },
  { n: 35, group: "Edge In Slot", alg: "U' R U R' U F' U' F", fl: "llllllllgllwggogglollgooloollwggogglollgooloo", alts: ["U' R U R' U F' U' F", "U' R U R' d R' U' R", "U2 R U R' F R' F' R"] },
  { n: 36, group: "Edge In Slot", alg: "U F' U' F U' R U R'", fl: "llllllllollgggogglwllgooloollgggogglwllgooloo", alts: ["U F' U' F U' R U R'", "U2 R' F R F' U2 R U R'", "R2 u R U R' U' u' R' U R'"] },
  { n: 37, group: "Pieces In Slot", alg: "R2 U2 F R2 F' U2 R' U R'", fl: "llllllllllllggoggglllgooooolllggoggglllgooooo", alts: ["R2 U2 F R2 F' U2 R' U R'", "R' F R F' R U' R' U R U' R' U2 R U' R'", "R U2 R' U R U2 R' U F' U' F"] },
  { n: 38, group: "Pieces In Slot", alg: "R U' R' U' R U R' U2 R U' R'", fl: "llllllllllllgggggwlllooogoolllgggggwlllooogoo", alts: ["R U' R' U' R U R' U2 R U' R'", "R U R' U' R U2 R' U' R U R'", "R2 U2 R' U' R U' R' U2 R'"] },
  { n: 39, group: "Pieces In Slot", alg: "R U' R' U R U2 R' U R U' R'", fl: "llllllllllllgggggolllooowoolllgggggolllooowoo", alts: ["R U' R' U R U2 R' U R U' R'", "R U2 R U R' U R U2 R2", "R U R' U2 R U' R' U R U R'"] },
  { n: 40, group: "Pieces In Slot", alg: "r U' r' U2 r U r' R U R'", fl: "llllllllllllggoggwlllgoogoolllggoggwlllgoogoo", alts: ["r U' r' U2 r U r' R U R'", "F' L' U2 L F R U R'", "R U' R' F R U R' U' F' R U' R'"] },
  { n: 41, group: "Pieces In Slot", alg: "R U' R' r U' r' U2 r U r'", fl: "llllllllllllggoggolllgoowoolllggoggolllgoowoo", alts: ["R U' R' r U' r' U2 r U r'", "R U' R' F' L' U2 L F", "R U R' U' y M U' R' F R U M'"] },
];

const verifiedF2LGroupNames = {
  "Free Pairs": "Свободные пары",
  "Disconnected Pairs": "Раздельные пары",
  "Connected Pairs": "Собранные пары",
  "Corner In Slot": "Угол в слоте",
  "Edge In Slot": "Ребро в слоте",
  "Pieces In Slot": "Оба в слоте",
};

function f2lLevelByPosition(position) {
  if (position <= 8) return "start";
  if (position <= 18) return "more";
  return "all";
}

function f2lAttrsForSource(group, mirror = false) {
  const map = {
    "Free Pairs": { corner: "top", white: "side", edge: "top", pair: "ready" },
    "Disconnected Pairs": { corner: "top", white: "side", edge: "top", pair: "separate" },
    "Connected Pairs": { corner: "top", white: "side", edge: "top", pair: "ready" },
    "Corner In Slot": { corner: "slot", white: "slot", edge: "top", pair: "separate" },
    "Edge In Slot": { corner: "top", white: "side", edge: "slot", pair: "separate" },
    "Pieces In Slot": { corner: "slot", white: "slot", edge: "slot", pair: "wrong" },
  };
  return { ...(map[group] || map["Disconnected Pairs"]), slot: mirror ? "left" : "right" };
}

function sourceCaseName(source) {
  const special = {
    2: "F2L 2 · вставка через F",
    3: "F2L 3 · трёхходовка через F",
    4: "F2L 4 · трёхходовка через R",
  };
  return special[source.n] || `F2L ${source.n}`;
}

function applyVerifiedF2LData() {
  const f2lItems = algorithms.filter((item) => item.stage === "F2L");
  const first = verifiedF2LSource[0];
  const verifiedCases = [
    {
      source: first,
      name: "Правая вставка",
      group: "База",
      alg: first.alg,
      note: "Формула SpeedCubeDB F2L 1. На модели цветные только физический угол, ребро и центры слота; белая наклейка угла сбоку.",
      mirror: false,
      attrs: f2lAttrsForSource(first.group, false),
    },
    {
      source: first,
      name: "Левая вставка",
      group: "База",
      alg: "U' L' U L",
      note: "Зеркало правой вставки: тот же физический угол и ребро, но в левый передний слот.",
      mirror: true,
      attrs: f2lAttrsForSource(first.group, true),
    },
    ...verifiedF2LSource.slice(1).map((source) => ({
      source,
      name: sourceCaseName(source),
      group: verifiedF2LGroupNames[source.group] || source.group,
      alg: source.alg,
      note: `Формула сверена со SpeedCubeDB F2L ${source.n}. Цветная модель оставляет только физически важные наклейки пары и слота.`,
      mirror: false,
      attrs: f2lAttrsForSource(source.group, false),
    })),
  ];

  verifiedCases.forEach((entry, index) => {
    const item = f2lItems[index];
    if (!item) return;
    Object.assign(item, {
      level: f2lLevelByPosition(index + 1),
      name: entry.name,
      group: entry.group,
      alg: entry.alg,
      note: entry.note,
      visual: {
        type: "f2l-source",
        fl: entry.source.fl,
        scdb: entry.source.n,
        mirror: entry.mirror,
        sourceGroup: entry.source.group,
        attrs: entry.attrs,
        alts: entry.source.alts,
      },
    });
  });
}

applyVerifiedF2LData();

const state = {
  view: "home",
  filter: "Cross",
  level: "start",
  query: "",
  finder: "",
  f2lFilters: {
    corner: "",
    white: "",
    edge: "",
    pair: "",
    slot: "",
  },
  selectedId: "f2l-1",
  detailId: "",
  returnAnchor: "",
  showAnswer: false,
  theme: localStorage.getItem("cfop-theme") || "dark",
};

const app = document.querySelector("#app");

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
}

applyTheme();

function tokens(alg) {
  return alg.split(/\s+/).filter(Boolean);
}

function tile(origin, a, b, col, row) {
  const p0 = [origin[0] + a[0] * col + b[0] * row, origin[1] + a[1] * col + b[1] * row];
  const p1 = [p0[0] + a[0], p0[1] + a[1]];
  const p2 = [p1[0] + b[0], p1[1] + b[1]];
  const p3 = [p0[0] + b[0], p0[1] + b[1]];
  return [p0, p1, p2, p3].map((p) => p.join(",")).join(" ");
}

function faceTiles(face, active = [], dim = true, colorOverrides = {}) {
  const cfg = {
    U: { o: [150, 20], a: [34, 16], b: [-34, 16], base: COLORS.U },
    F: { o: [48, 68], a: [34, 16], b: [0, 36], base: COLORS.F },
    R: { o: [252, 68], a: [-34, 16], b: [0, 36], base: COLORS.R },
  }[face];
  const activeColor = colorOverrides[face] || cfg.base;
  const activeSet = new Set(active);
  let out = "";
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const key = `${face}${r}${c}`;
      const isActive = activeSet.has(key) || activeSet.has(face);
      const fill = isActive ? activeColor : dim ? COLORS.dim : cfg.base;
      const opacity = isActive || !dim ? 1 : 0.48;
      out += `<polygon points="${tile(cfg.o, cfg.a, cfg.b, c, r)}" fill="${fill}" opacity="${opacity}" stroke="${COLORS.line}" stroke-width="2" />`;
    }
  }
  return out;
}

function arrowPath(face, dir) {
  const common = `fill="none" stroke="${COLORS.ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)"`;
  if (dir === "double") return `<path d="M236 92 C286 126 286 188 236 218" ${common}/><path d="M66 218 C18 178 20 120 70 92" ${common}/><text x="150" y="158" text-anchor="middle" class="svg-label">180°</text>`;
  if (dir === "turn") return `<path d="M70 94 C120 24 236 42 264 110" ${common}/><path d="M248 232 C190 290 82 250 54 178" ${common}/>`;
  const reverse = dir === "ccw";
  if (face === "U") return reverse ? `<path d="M238 66 C188 24 102 28 66 72" ${common}/>` : `<path d="M66 72 C118 24 204 28 238 66" ${common}/>`;
  if (face === "R") return reverse ? `<path d="M276 108 C306 164 292 222 248 258" ${common}/>` : `<path d="M248 258 C292 222 306 164 276 108" ${common}/>`;
  if (face === "F") return reverse ? `<path d="M54 122 C26 168 40 226 88 258" ${common}/>` : `<path d="M88 258 C40 226 26 168 54 122" ${common}/>`;
  return `<path d="M70 94 C120 24 236 42 264 110" ${common}/>`;
}

function cubeSvg({ active = [], arrowFace = null, dir = "cw", labels = [], pieces = [], title = "Кубик", colorOverrides = {} } = {}) {
  const visibleActive = active.filter((x) => ["U", "F", "R"].some((face) => x.startsWith(face)));
  return `
    <svg class="cube-svg" viewBox="0 0 330 320" role="img" aria-label="${title}">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="${COLORS.ink}"></path>
        </marker>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#17202a" flood-opacity="0.16"/>
        </filter>
      </defs>
      <g filter="url(#softShadow)">
        ${faceTiles("U", visibleActive, true, colorOverrides)}
        ${faceTiles("F", visibleActive, true, colorOverrides)}
        ${faceTiles("R", visibleActive, true, colorOverrides)}
      </g>
      ${pieces.join("")}
      ${arrowFace ? arrowPath(arrowFace, dir) : ""}
      ${labels.map((label) => `<text x="${label.x}" y="${label.y}" text-anchor="${label.anchor || "middle"}" class="svg-note">${label.text}</text>`).join("")}
    </svg>
  `;
}

function heroVisualSvg() {
  const fills = {
    U00: COLORS.U, U01: COLORS.U, U02: COLORS.U, U10: COLORS.U, U11: COLORS.U, U12: COLORS.U, U20: COLORS.U, U21: COLORS.U, U22: COLORS.U,
    F00: COLORS.F, F01: COLORS.F, F02: COLORS.F, F10: COLORS.F, F11: COLORS.F, F12: COLORS.F, F20: COLORS.F, F21: COLORS.F, F22: COLORS.F,
    R00: COLORS.R, R01: COLORS.R, R02: COLORS.R, R10: COLORS.R, R11: COLORS.R, R12: COLORS.R, R20: COLORS.R, R21: COLORS.R, R22: COLORS.R,
  };
  return `
    <svg class="hero-visual" viewBox="0 0 430 360" role="img" aria-label="Учебный пример CFOP с цветным кубиком">
      <defs>
        <filter id="heroShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#17202a" flood-opacity="0.18"/>
        </filter>
      </defs>
      <g transform="translate(46 28) scale(1.02)" filter="url(#heroShadow)">
        ${faceTilesDetailed("U", fills)}
        ${faceTilesDetailed("F", fills)}
        ${faceTilesDetailed("R", fills)}
      </g>
      <text x="215" y="324" text-anchor="middle" class="svg-note">пример: белый снизу, зелёный спереди, красный справа</text>
    </svg>`;
}

function frontCell(row, col, fill, active = false) {
  const size = 52;
  const gap = 4;
  const x = 88 + col * (size + gap);
  const y = 54 + row * (size + gap);
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="7" fill="${fill}" opacity="${active ? 1 : 0.34}" stroke="var(--cube-line)" stroke-width="${active ? 4 : 2}"/>`;
}

function frontLayerCells(face) {
  if (face === "R") return [[0, 2], [1, 2], [2, 2]];
  if (face === "Rw") return [[0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]];
  if (face === "L") return [[0, 0], [1, 0], [2, 0]];
  if (face === "U") return [[0, 0], [0, 1], [0, 2]];
  if (face === "D") return [[2, 0], [2, 1], [2, 2]];
  if (face === "Dw") return [[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
  if (face === "M") return [[0, 1], [1, 1], [2, 1]];
  return [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
}

function frontArrow(face, dir) {
  const arrow = (d) => `<g class="front-turn-arrow"><path class="arrow-outline" d="${d}"/><path class="arrow-line" d="${d}" marker-end="url(#frontArrow)"/></g>`;
  const reverse = dir === "ccw";
  if (dir === "double") return `${arrow("M228 82 L228 184")}${arrow("M104 184 L104 82")}<text x="166" y="252" text-anchor="middle" class="svg-label">180°</text>`;
  if (face === "R" || face === "Rw") return reverse ? arrow("M228 82 L228 184") : arrow("M228 184 L228 82");
  if (face === "L") return reverse ? arrow("M104 184 L104 82") : arrow("M104 82 L104 184");
  if (face === "U") return reverse ? arrow("M222 74 L110 74") : arrow("M110 74 L222 74");
  if (face === "D" || face === "Dw") return reverse ? arrow("M110 190 L222 190") : arrow("M222 190 L110 190");
  if (face === "M") return arrow(reverse ? "M166 82 L166 184" : "M166 184 L166 82");
  if (face === "cube") return `${arrow("M74 216 C48 154 70 74 126 54")}${arrow("M256 54 C286 118 264 198 204 220")}`;
  return reverse
    ? arrow("M214 90 C238 122 230 172 190 192 C150 212 104 192 94 150")
    : arrow("M94 150 C104 108 150 88 190 108 C230 128 238 178 214 210");
}

function notationSvg(item) {
  const colorByFace = {
    R: COLORS.R,
    Rw: COLORS.R,
    L: COLORS.L,
    U: COLORS.U,
    D: COLORS.D,
    Dw: COLORS.D,
    F: COLORS.F,
    B: COLORS.B,
    M: COLORS.slot,
    cube: COLORS.accent || COLORS.slot,
  };
  const face = item.face;
  const activeCells = new Set(frontLayerCells(face).map(([row, col]) => `${row}${col}`));
  const highlight = colorByFace[face] || COLORS.F;
  const faceLabel = {
    R: "правая грань",
    Rw: "два правых слоя",
    L: "левая грань",
    U: "верхний слой",
    D: "нижний слой",
    Dw: "два нижних слоя",
    F: "передняя грань",
    B: "задняя грань",
    M: "средний слой",
    cube: "весь кубик",
  }[face];
  return `
    <svg class="notation-svg" viewBox="0 0 332 286" role="img" aria-label="Ход ${item.move}: ${faceLabel}">
      <defs>
        <marker id="frontArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--arrow-fill)" stroke="var(--arrow-outline)" stroke-width="1.4"></path>
        </marker>
      </defs>
      <rect x="72" y="38" width="188" height="188" rx="18" fill="var(--cube-shell)" stroke="var(--cube-line)" stroke-width="5"/>
      ${face === "B" ? `<rect x="62" y="28" width="208" height="208" rx="22" fill="none" stroke="${COLORS.B}" stroke-width="7" stroke-dasharray="9 8" opacity=".9"/>` : ""}
      ${face === "cube" ? `<rect x="58" y="24" width="216" height="216" rx="24" fill="rgba(15,139,141,.08)" stroke="${COLORS.slot}" stroke-width="6"/>` : ""}
      ${Array.from({ length: 9 }).map((_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const active = activeCells.has(`${row}${col}`);
        return frontCell(row, col, active ? highlight : COLORS.F, active || face === "F" || face === "cube");
      }).join("")}
      ${frontArrow(face, item.dir)}
      <text x="166" y="20" text-anchor="middle" class="svg-note">передняя грань смотрит на тебя</text>
      <text x="166" y="274" text-anchor="middle" class="svg-note">${faceLabel}: ${item.dir === "ccw" ? "обратно" : item.dir === "double" ? "два раза" : "по стрелке"}</text>
    </svg>
  `;
}

function slotPalette(slot = "FR") {
  const side = slot.includes("L") ? COLORS.L : COLORS.R;
  const sideName = slot.includes("L") ? "левая" : "правая";
  const sideColorName = slot.includes("L") ? "оранжевый" : "красный";
  return { down: COLORS.D, front: COLORS.F, side, sideName, frontColorName: "зелёный", sideColorName };
}

function putStickerSet(fills, stickers = {}) {
  Object.entries(stickers).forEach(([key, color]) => {
    if (key) fills[key] = color;
  });
}

function f2lCornerStickers(position, colors, visual = {}) {
  const readyFRCorner = { U22: colors.front, F02: colors.down, R02: colors.side };
  const visible = {
    UFR: visual.pair ? readyFRCorner : { U22: colors.down, F02: colors.front, R02: colors.side },
    UFL: { U20: colors.down, F00: colors.front },
    UBR: { U02: colors.down, R00: colors.side },
    UBL: { U00: colors.down },
    UR: { U12: colors.down, R01: colors.side },
    UL: { U10: colors.down },
    UF: { U21: colors.down, F01: colors.front },
    UB: { U01: colors.down },
    FR: { F22: colors.front, R22: colors.side },
    FL: { F20: colors.front },
    BR: { R20: colors.side },
    BL: {},
    U: { U11: colors.down, U21: colors.front, U12: colors.side },
  };
  return visible[position] || visible.UFR;
}

function f2lEdgeStickers(position, colors) {
  const visible = {
    UR: { U12: colors.front, R01: colors.side },
    UL: { U10: colors.front },
    UF: { U21: colors.front, F01: colors.side },
    UB: { U01: colors.front },
    FR: { F12: colors.front, R12: colors.side },
    FL: { F10: colors.front },
    BR: { R10: colors.side },
    BL: {},
    none: {},
  };
  return visible[position] || visible.UR;
}

function mirrorF2LPositionForDrawing(position) {
  const map = {
    UFR: "UFR",
    UBR: "UBR",
    UR: "UR",
    FR: "FR",
    BR: "BR",
    UFL: "UFR",
    UBL: "UBR",
    UL: "UR",
    FL: "FR",
    BL: "BR",
    UF: "UF",
    UB: "UB",
    U: "U",
    none: "none",
  };
  return map[position] || position;
}

function normalizeF2LVisualForDrawing(visual, mirrored) {
  if (!mirrored) return visual;
  return {
    ...visual,
    slot: "FR",
    corner: mirrorF2LPositionForDrawing(visual.corner || "UFR"),
    edge: mirrorF2LPositionForDrawing(visual.edge || "UR"),
  };
}

function paintF2LStickerSet(fills, visual, colors) {
  if (visual.corner !== "none") {
    putStickerSet(fills, f2lCornerStickers(visual.corner || "UFR", colors, visual));
  }
  if (visual.edge !== "none") {
    putStickerSet(fills, f2lEdgeStickers(visual.edge || "UR", colors));
  }
}

function faceTilesDetailed(face, fills = {}) {
  const cfg = {
    U: { o: [150, 20], a: [34, 16], b: [-34, 16], base: "var(--cube-shell)" },
    F: { o: [48, 68], a: [34, 16], b: [0, 36], base: "var(--cube-muted)" },
    R: { o: [252, 68], a: [-34, 16], b: [0, 36], base: "var(--cube-muted)" },
  }[face];
  let out = "";
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const key = `${face}${r}${c}`;
      const fill = fills[key] || cfg.base;
      const active = Boolean(fills[key]);
      out += `<polygon points="${tile(cfg.o, cfg.a, cfg.b, c, r)}" fill="${fill}" opacity="${active ? 1 : 0.42}" stroke="var(--cube-line)" stroke-width="${active ? 3 : 2}" />`;
    }
  }
  return out;
}

const visibleCubies = [
  ["U22", "F02", "R02"],
  ["U20", "F00"],
  ["U02", "R00"],
  ["U00"],
  ["U21", "F01"],
  ["U12", "R01"],
  ["U10"],
  ["U01"],
  ["F12", "R12"],
  ["F22", "R22"],
  ["F10"],
  ["F20"],
  ["R10"],
  ["R20"],
];

function sourceStickerMap(visual) {
  const raw = String(visual.fl || "").slice(0, 27).padEnd(27, "l");
  const sideColor = visual.mirror ? COLORS.L : COLORS.R;
  const colorByCode = {
    g: COLORS.F,
    o: sideColor,
    w: COLORS.D,
    y: COLORS.U,
    r: COLORS.R,
    b: COLORS.B,
  };
  const map = {};
  ["U", "F", "R"].forEach((face, faceIndex) => {
    for (let index = 0; index < 9; index += 1) {
      const code = raw[faceIndex * 9 + index];
      if (!code || code === "l" || !colorByCode[code]) continue;
      const row = Math.floor(index / 3);
      const sourceCol = index % 3;
      const col = face === "R" ? 2 - sourceCol : sourceCol;
      map[`${face}${row}${col}`] = { color: colorByCode[code], code };
    }
  });
  return map;
}

function physicalF2LFills(visual) {
  const rawMap = sourceStickerMap(visual);
  const fills = {
    U11: COLORS.U,
    F11: COLORS.F,
    F21: COLORS.F,
    R11: visual.mirror ? COLORS.L : COLORS.R,
    R21: visual.mirror ? COLORS.L : COLORS.R,
  };
  const seedCells = new Set();
  Object.entries(rawMap).forEach(([cell, sticker]) => {
    if (cell.startsWith("U") || sticker.code === "w") seedCells.add(cell);
  });
  visibleCubies.forEach((cubie) => {
    if (!cubie.some((cell) => seedCells.has(cell))) return;
    cubie.forEach((cell) => {
      if (rawMap[cell]) fills[cell] = rawMap[cell].color;
    });
  });
  return fills;
}

function f2lSvg(visual, options = {}) {
  const slot = visual.slot || "FR";
  const colors = slotPalette(slot);
  const mirrored = slot.includes("L");
  const drawVisual = normalizeF2LVisualForDrawing(visual, mirrored);
  const cubeTransform = mirrored ? `transform="translate(330 0) scale(-1 1)"` : "";
  const fills = {
    U11: COLORS.U,
    F11: colors.front,
    R11: colors.side,
    F21: colors.front,
  };
  paintF2LStickerSet(fills, drawVisual, colors);
  return `
    <svg class="cube-svg f2l-example-svg ${options.compact ? "compact-cube" : ""}" viewBox="0 0 330 292" role="img" aria-label="F2L: цветная пара и цветной слот">
      <defs>
        <filter id="softShadowF2L" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#17202a" flood-opacity="0.14"/>
        </filter>
      </defs>
      <g filter="url(#softShadowF2L)" ${cubeTransform}>
        ${faceTilesDetailed("U", fills)}
        ${faceTilesDetailed("F", fills)}
        ${faceTilesDetailed("R", fills)}
      </g>
      ${visual.wrong ? `<text x="165" y="276" text-anchor="middle" class="svg-note">пара склеена неверно</text>` : ""}
    </svg>
  `;
}

function sourceF2LSvg(visual, options = {}) {
  const fills = physicalF2LFills(visual);
  const cubeTransform = visual.mirror ? `transform="translate(330 0) scale(-1 1)"` : "";
  return `
    <svg class="cube-svg f2l-example-svg source-f2l-svg ${options.compact ? "compact-cube" : ""}" viewBox="0 0 330 292" role="img" aria-label="F2L ${visual.scdb ? `из SpeedCubeDB ${visual.scdb}` : ""}: физическая модель угла, ребра и слота">
      <defs>
        <filter id="softShadowSourceF2L" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#17202a" flood-opacity="0.14"/>
        </filter>
      </defs>
      <g filter="url(#softShadowSourceF2L)" ${cubeTransform}>
        ${faceTilesDetailed("U", fills)}
        ${faceTilesDetailed("F", fills)}
        ${faceTilesDetailed("R", fills)}
      </g>
      ${visual.mirror ? `<text x="165" y="276" text-anchor="middle" class="svg-note">зеркало правой вставки</text>` : ""}
    </svg>
  `;
}

function ollSvg(visual) {
  const sideSet = new Set(visual.sides || []);
  const topCell = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const x = 92 + col * 48;
    const y = 72 + row * 48;
    const yellow = visual.top[index] === "1";
    return `<rect x="${x}" y="${y}" width="43" height="43" rx="8" fill="${yellow ? COLORS.U : "var(--cube-shell)"}" opacity="${yellow ? 1 : 0.62}" stroke="var(--cube-line)" stroke-width="${yellow ? 4 : 2}"/>`;
  };
  const sideDot = (face, index, x, y) => {
    const active = sideSet.has(`${face}${index}`);
    return `<circle class="side-sticker-dot" cx="${x + 17}" cy="${y + 9}" r="${active ? 10 : 8}" fill="${active ? COLORS.U : "var(--cube-muted)"}" opacity="${active ? 1 : 0.5}" stroke="var(--cube-line)" stroke-width="${active ? 3 : 2}"/>`;
  };
  return `
    <svg class="oll-flat-svg" viewBox="0 0 330 300" role="img" aria-label="OLL после желтого креста: верх и боковые желтые наклейки">
      <text x="165" y="28" text-anchor="middle" class="svg-note">желтый крест готов — сравни углы</text>
      ${[0, 1, 2].map((i) => sideDot("B", i, 92 + i * 48, 44)).join("")}
      ${[0, 1, 2].map((i) => sideDot("F", i, 92 + i * 48, 226)).join("")}
      ${[0, 1, 2].map((i) => sideDot("L", i, 58, 76 + i * 48)).join("")}
      ${[0, 1, 2].map((i) => sideDot("R", i, 238, 76 + i * 48)).join("")}
      ${Array.from({ length: 9 }).map((_, index) => topCell(index)).join("")}
      <text x="165" y="282" text-anchor="middle" class="svg-note">${visual.hold || "поверни U, пока рисунок совпадет"}</text>
    </svg>`;
}

function pllSvg(visual) {
  const blocks = new Set(visual.blocks || []);
  const sideColors = { front: COLORS.F, right: COLORS.R, back: COLORS.B, left: COLORS.L };
  const sideReady = (side, index) => {
    if (blocks.has(side)) return true;
    if (blocks.has("corners")) return index !== 1;
    if (blocks.has("edges")) return index === 1;
    return false;
  };
  const sideSticker = (side, index, x, y, w, h) => {
    const solved = sideReady(side, index);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${solved ? sideColors[side] : "var(--cube-muted)"}" opacity="${solved ? 1 : 0.52}" stroke="var(--cube-line)" stroke-width="${solved ? 3 : 2}"/>`;
  };
  const stripH = (side, y) => [0, 1, 2].map((index) => sideSticker(side, index, 94 + index * 48, y, 42, 24)).join("");
  const stripV = (side, x) => [0, 1, 2].map((index) => sideSticker(side, index, x, 82 + index * 45, 24, 39)).join("");
  const arrowPaths = {
    cw: [`M119 82 C214 42 288 118 247 213`],
    cycle: [`M119 82 C214 42 288 118 247 213`],
    ccw: [`M247 82 C152 42 78 118 119 213`],
    opposite: [`M165 88 L165 209`, `M104 149 L226 149`],
    cross: [`M104 95 L226 204`, `M226 95 L104 204`],
    diagonal: [`M108 94 L222 205`, `M222 94 L108 205`],
    adjacent: [`M105 150 C130 91 201 90 225 150`, `M225 150 C200 210 130 210 105 150`],
    swap: [`M103 149 L227 149`],
  }[visual.arrows] || [`M103 149 L227 149`];
  const twoWay = ["opposite", "cross", "diagonal", "swap"].includes(visual.arrows);
  return `
    <svg class="pll-flat-svg" viewBox="0 0 330 300" role="img" aria-label="PLL: готовые блоки и перестановка">
      <defs>
        <marker id="pllArrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)"></path>
        </marker>
      </defs>
      <text x="165" y="28" text-anchor="middle" class="svg-note">верх желтый — ищи боковые блоки</text>
      ${stripH("back", 44)}
      ${stripH("front", 232)}
      ${stripV("left", 58)}
      ${stripV("right", 248)}
      <rect x="92" y="76" width="146" height="146" rx="18" fill="${COLORS.U}" stroke="var(--cube-line)" stroke-width="5"/>
      ${Array.from({ length: 9 }).map((_, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return `<rect x="${104 + col * 42}" y="${88 + row * 42}" width="36" height="36" rx="7" fill="${COLORS.U}" stroke="var(--cube-line)" stroke-width="2"/>`;
      }).join("")}
      ${arrowPaths.map((path) => `<path d="${path}" class="pll-swap-arrow" marker-end="url(#pllArrowHead)" ${twoWay ? `marker-start="url(#pllArrowHead)"` : ""}/>`).join("")}
      <text x="165" y="282" text-anchor="middle" class="svg-note">${blocks.has("none") ? "готовых блоков нет — смотри обмены" : "цветные мини-стикеры — уже совпавшие части"}</text>
    </svg>`;
}

function visualSvg(item, options = {}) {
  if (item.visual?.type === "oll") return ollSvg(item.visual);
  if (item.visual?.type === "pll") return pllSvg(item.visual);
  if (item.visual?.type === "f2l-source") return sourceF2LSvg(item.visual, options);
  return f2lSvg(item.visual || {}, options);
}

function algorithmHtml(item, hidden = false) {
  return `<div class="algorithm ${hidden ? "hidden-alg" : ""}">${tokens(item.alg).map((token) => `<span class="token">${token}</span>`).join("")}</div>`;
}

function moveMeaning(token) {
  const clean = token.replace(/[()]/g, "");
  const map = {
    R: "правая грань вверх",
    "R'": "правая грань вниз",
    R2: "правая грань два раза",
    L: "левая грань вниз",
    "L'": "левая грань вверх",
    L2: "левая грань два раза",
    U: "верхний слой в сторону стрелки",
    "U'": "верхний слой обратно",
    U2: "верхний слой два раза",
    F: "передняя грань по стрелке",
    "F'": "передняя грань обратно",
    F2: "передняя грань два раза",
    D: "нижний слой по стрелке",
    "D'": "нижний слой обратно",
    D2: "нижний слой два раза",
    M: "средний слой вниз",
    "M'": "средний слой вверх",
    M2: "средний слой два раза",
    x: "поверни весь куб",
    "x'": "поверни весь куб обратно",
    y: "поверни весь куб по U",
    "y'": "поверни весь куб обратно",
    r: "правая широкая грань",
    "r'": "правая широкая обратно",
    d: "нижние два слоя",
    "d'": "нижние два слоя обратно",
  };
  return map[clean] || "сделай ход как в разделе Буквы";
}

function guideFor(item) {
  if (item.id === "f2l-1") {
    return {
      before: "Найди готовую пару: угол с белой, зелёной и красной наклейкой должен стоять рядом с ребром зелёно-красное.",
      hold: "Держи белый низом, зелёный спереди, красный справа. Пара должна быть над правым передним слотом.",
      steps: [
        "U: уведи пару по верхнему слою, чтобы освободить правый слот.",
        "R: подними правую грань и открой место для пары.",
        "U': верни пару над открытый слот.",
        "R': опусти правую грань обратно, пара зайдет в слот.",
      ],
      check: "После формулы белая наклейка угла смотрит вниз, а зелёный и красный цвета совпадают с центрами.",
    };
  }
  if (item.stage === "F2L") {
    return {
      before: "Найди только два элемента: белый угол и подходящее к нему ребро без белого цвета.",
      hold: "Поставь нужный слот спереди. Для правого слота держи боковой цвет справа, для левого — слева.",
      steps: [
        "Сначала выведи угол и ребро в верхний слой, если один из них застрял снизу.",
        "Собери их в пару: белый цвет должен смотреть так, чтобы пара могла зайти в слот.",
        "Поставь пару над цветными центрами нужного слота и выполни формулу маленькими кусками.",
      ],
      check: "Пара считается готовой, если белый ушел вниз, а боковые цвета совпали с центрами.",
    };
  }
  if (item.stage === "OLL") {
    return {
      before: "Желтый крест уже собран. Сравни только углы сверху и желтые наклейки на боках.",
      hold: item.visual?.hold ? `Держи случай так: ${item.visual.hold}.` : "Поверни верхний слой, пока рисунок совпадет со схемой.",
      steps: [
        "Не обращай внимания на нижние два слоя: здесь решается только ориентация верхних углов.",
        "Сделай формулу одним ритмом, не меняя хват.",
        "Если верх не стал полностью желтым, значит случай был повернут не той стороной.",
      ],
      check: "После формулы вся верхняя грань должна стать желтой.",
    };
  }
  return {
    before: "Верх уже полностью желтый. Теперь смотри на боковые цвета верхнего слоя.",
    hold: "Поверни куб так, чтобы готовый блок на схеме стоял в том же месте. Если блока нет, ориентируйся по стрелкам обмена.",
    steps: [
      "Найди готовые блоки: совпавшие угол + ребро на одной стороне.",
      "Поставь блок как на схеме, затем делай формулу без остановок.",
      "После формулы проверь боковые стороны, а не верх: верх и так остается желтым.",
    ],
    check: "PLL выполнен правильно, если все четыре боковые стороны верхнего слоя совпали по цветам.",
  };
}

function renderActionGuide(item) {
  const guide = guideFor(item);
  const moveTokens = tokens(item.alg).slice(0, 12);
  return `
    <div class="action-guide">
      <div class="guide-block"><span>1</span><strong>Что найти</strong><p>${guide.before}</p></div>
      <div class="guide-block"><span>2</span><strong>Как держать</strong><p>${guide.hold}</p></div>
      <div class="guide-block wide"><span>3</span><strong>Что делать</strong><ol>${guide.steps.map((step) => `<li>${step}</li>`).join("")}</ol></div>
      <div class="guide-block"><span>4</span><strong>Проверка</strong><p>${guide.check}</p></div>
      <div class="move-translation">
        <strong>Перевод первых ходов</strong>
        <div>${moveTokens.map((token) => `<span><b>${token}</b>${moveMeaning(token)}</span>`).join("")}</div>
      </div>
    </div>`;
}

function firstF2LTimeline(item) {
  if (item.id !== "f2l-1") return "";
  const frames = [
    ["Старт", "Смотри только на цветной угол, ребро и центры: лишние детали не подсвечены.", "source"],
    ["U", "Верхний слой уводит пару в сторону, чтобы правый слот можно было открыть.", "move"],
    ["R", "Правая грань поднимается. Ты временно открываешь место для пары.", "move"],
    ["U'", "Верхний слой возвращает пару к открытому месту.", "move"],
    ["R'", "Правая грань возвращается вниз, и пара уходит в слот.", "goal"],
  ];
  return `
    <section class="case-section">
      <div class="case-section-heading"><p class="eyebrow">Правая вставка по кадрам</p><h3>Зачем нужен каждый ход</h3></div>
      <div class="timeline-grid">
        ${frames.map(([move, text, kind], index) => `
          <article class="timeline-card">
            <span>${index + 1}</span>
            ${kind === "source" ? sourceF2LSvg(item.visual, { compact: true }) : kind === "goal" ? slotGoalSvg(item) : `<div class="move-card-badge">${move}</div>`}
            <h4>${move}</h4>
            <p>${text}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function renderCaseDetail(item) {
  const previous = state.returnAnchor || item.id;
  return `
    <section class="section case-detail" id="case-detail">
      <button class="back-button" data-back-to-list="${previous}">← Назад к списку</button>
      <div class="case-hero">
        <div class="case-visual">
          <span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span>
          ${visualSvg(item)}
        </div>
        <div class="case-copy">
          <p class="eyebrow">Полный разбор</p>
          <h2>${item.name}</h2>
          <p>${item.note}</p>
          ${renderCaseFacts(item)}
          <p class="study-label">Формула</p>
          ${algorithmHtml(item)}
          <button class="copy-button" data-copy="${item.alg}">Копировать формулу</button>
        </div>
      </div>
      ${renderF2LRecognitionBoard(item)}
      ${firstF2LTimeline(item)}
      ${renderActionGuide(item)}
    </section>`;
}

function levelsForStage(stage) {
  if (stage === "PLL") return [
    ["start", "Начать"],
    ["more", "Частые"],
    ["all", "Все"],
  ];
  if (stage === "F2L") return [
    ["start", "База"],
    ["more", "Еще"],
    ["all", "Все"],
  ];
  return [
    ["start", "Начать"],
    ["more", "Все 7"],
  ];
}

function f2lAttributes(item) {
  const visual = item.visual || {};
  if (visual.type === "f2l-source" && visual.attrs) return visual.attrs;
  const corner = visual.corner || "";
  const edge = visual.edge || "";
  const inSlot = (value) => ["FR", "FL", "BR", "BL"].includes(value);
  return {
    corner: inSlot(corner) ? "slot" : "top",
    white: corner === "U" ? "up" : corner.startsWith("U") || ["UR", "UF", "UL", "UB"].includes(corner) ? "side" : "slot",
    edge: inSlot(edge) ? "slot" : "top",
    pair: visual.wrong ? "wrong" : visual.pair ? "ready" : "separate",
    slot: (visual.slot || "FR").includes("L") ? "left" : "right",
  };
}

function positionPhrase(value, kind = "corner") {
  const map = {
    UFR: "сверху спереди справа",
    UFL: "сверху спереди слева",
    UBR: "сверху сзади справа",
    UBL: "сверху сзади слева",
    UR: "сверху справа",
    UL: "сверху слева",
    UF: "сверху спереди",
    UB: "сверху сзади",
    U: "на верхнем слое, белым вверх",
    FR: "в правом переднем слоте",
    FL: "в левом переднем слоте",
    BR: "в правом заднем слоте",
    BL: "в левом заднем слоте",
    none: "не показан",
  };
  return map[value] || (kind === "corner" ? "ищи белый угол" : "ищи ребро пары");
}

function f2lMiniFacts(item) {
  if (item.stage !== "F2L") return "";
  const visual = item.visual || {};
  if (visual.type === "f2l-source") {
    const group = verifiedF2LGroupNames[visual.sourceGroup] || visual.sourceGroup || "F2L";
    const slot = visual.mirror ? "левый слот" : "правый слот";
    return `
      <p class="mini-recognition" aria-label="Короткое распознавание F2L-случая">
        <span>SpeedCubeDB F2L ${visual.scdb}</span>
        <span>${group}</span>
        <span>${slot}</span>
      </p>`;
  }
  const attrs = f2lAttributes(item);
  const corner = attrs.corner === "slot" ? "угол в слоте" : attrs.white === "up" ? "угол белым вверх" : "угол сверху";
  const edge = attrs.edge === "slot" ? "ребро в слоте" : "ребро сверху";
  const slot = (visual.slot || "FR").includes("L") ? "левый слот" : "правый слот";
  return `
    <p class="mini-recognition" aria-label="Короткое распознавание F2L-случая">
      <span>${corner}</span>
      <span>${edge}</span>
      <span>${slot}</span>
    </p>`;
}

function topPositionCell(position, fallback) {
  const map = {
    UBL: [0, 0], UB: [1, 0], UBR: [2, 0],
    UL: [0, 1], U: [1, 1], UR: [2, 1],
    UFL: [0, 2], UF: [1, 2], UFR: [2, 2],
  };
  return map[position] || fallback;
}

function f2lRecognitionSvg(item) {
  const visual = item.visual || {};
  const slot = visual.slot || "FR";
  const colors = slotPalette(slot);
  const cornerCell = topPositionCell(visual.corner || "UFR", [2, 2]);
  const edgeCell = topPositionCell(visual.edge || "UR", [2, 1]);
  const slotX = slot.includes("L") ? 54 : 194;
  const cornerColors = visual.pair
    ? { top: colors.front, left: colors.down, right: colors.side }
    : { top: colors.down, left: colors.front, right: colors.side };
  const topCell = (col, row) => {
    const x = 54 + col * 70;
    const y = 48 + row * 58;
    return `<rect x="${x}" y="${y}" width="58" height="48" rx="8" fill="var(--cube-shell)" stroke="var(--cube-line)" stroke-width="2"/>`;
  };
  const marker = (cell, kind) => {
    const [col, row] = cell;
    const x = 54 + col * 70 + 8;
    const y = 48 + row * 58 + 8;
    if (kind === "corner") {
      return `
        <g>
          <rect x="${x}" y="${y}" width="42" height="32" rx="7" fill="var(--surface)" stroke="var(--cube-line)" stroke-width="3"/>
          <rect x="${x + 4}" y="${y + 4}" width="34" height="8" rx="3" fill="${cornerColors.top}"/>
          <rect x="${x + 4}" y="${y + 15}" width="15" height="13" rx="3" fill="${cornerColors.left}"/>
          <rect x="${x + 23}" y="${y + 15}" width="15" height="13" rx="3" fill="${cornerColors.right}"/>
        </g>`;
    }
    return `
      <g>
        <rect x="${x + 1}" y="${y + 5}" width="40" height="24" rx="7" fill="var(--surface)" stroke="var(--cube-line)" stroke-width="3"/>
        <rect x="${x + 6}" y="${y + 10}" width="14" height="14" rx="3" fill="${colors.front}"/>
        <rect x="${x + 23}" y="${y + 10}" width="14" height="14" rx="3" fill="${colors.side}"/>
      </g>`;
  };
  return `
    <svg class="f2l-recognition-svg" viewBox="0 0 330 252" role="img" aria-label="Схема распознавания F2L: угол, ребро и слот">
      <text x="165" y="24" text-anchor="middle" class="svg-note">вид сверху: найди угол и ребро</text>
      ${Array.from({ length: 9 }).map((_, index) => topCell(index % 3, Math.floor(index / 3))).join("")}
      <rect x="${slotX}" y="164" width="58" height="48" rx="8" fill="none" stroke="var(--accent)" stroke-width="5"/>
      ${marker(edgeCell, "edge")}
      ${marker(cornerCell, "corner")}
      <text x="165" y="240" text-anchor="middle" class="svg-note">цветные наклейки сравни со своим кубиком</text>
    </svg>`;
}

function slotGoalSvg(item) {
  const visual = item.visual || {};
  const colors = slotPalette(visual.slot || "FR");
  return `
    <svg class="slot-goal-svg" viewBox="0 0 330 180" role="img" aria-label="Куда вставляется F2L-пара">
      <text x="165" y="24" text-anchor="middle" class="svg-note">цель: пара уходит между центрами</text>
      <rect x="66" y="54" width="74" height="48" rx="9" fill="${colors.front}" stroke="var(--cube-line)" stroke-width="4"/>
      <rect x="190" y="54" width="74" height="48" rx="9" fill="${colors.side}" stroke="var(--cube-line)" stroke-width="4"/>
      <rect x="128" y="110" width="74" height="42" rx="9" fill="${colors.down}" stroke="var(--cube-line)" stroke-width="4"/>
      <path d="M142 78 L188 78" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>
      <path d="M165 101 L165 118" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>
    </svg>`;
}

function renderF2LRecognitionBoard(item) {
  if (item.stage !== "F2L") return "";
  const visual = item.visual || {};
  if (visual.type === "f2l-source") {
    const group = verifiedF2LGroupNames[visual.sourceGroup] || visual.sourceGroup || "F2L";
    const alternatives = (visual.alts || []).slice(1, 3);
    return `
      <section class="case-section recognition-board">
        <div class="case-section-heading">
          <p class="eyebrow">Как распознать</p>
          <h3>Сравни физический угол, ребро и слот</h3>
        </div>
        <div class="recognition-grid">
          <article>
            ${sourceF2LSvg(visual)}
            <p><b>Случай:</b> SpeedCubeDB F2L ${visual.scdb}. <b>Группа:</b> ${group}. Цветные наклейки принадлежат физическому углу, ребру и центрам слота; серое не трогай.</p>
          </article>
          <article>
            ${slotGoalSvg({ visual: { slot: visual.mirror ? "FL" : "FR" } })}
            <p><b>Слот:</b> ${visual.mirror ? "левый передний" : "правый передний"}. Если твой случай повернут иначе, поверни U или весь куб так, чтобы совпали цветные наклейки.</p>
            ${alternatives.length ? `<p><b>Другие проверенные варианты:</b> ${alternatives.join(" · ")}</p>` : ""}
          </article>
        </div>
      </section>`;
  }
  return `
    <section class="case-section recognition-board">
      <div class="case-section-heading">
        <p class="eyebrow">Как распознать</p>
        <h3>Сначала найди элементы, потом читай формулу</h3>
      </div>
      <div class="recognition-grid">
        <article>
          ${f2lRecognitionSvg(item)}
          <p><b>Угол:</b> ${positionPhrase(visual.corner || "UFR", "corner")}. <b>Ребро:</b> ${positionPhrase(visual.edge || "UR", "edge")}.</p>
        </article>
        <article>
          ${slotGoalSvg(item)}
          <p><b>Слот:</b> ${positionPhrase(visual.slot || "FR", "slot")}. Цвета пары должны совпасть с двумя центрами слота.</p>
        </article>
      </div>
    </section>`;
}

function resetF2LFilters() {
  state.f2lFilters = { corner: "", white: "", edge: "", pair: "", slot: "" };
}

function jumpToTop() {
  app?.scrollIntoView({ block: "start", inline: "nearest" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    app?.scrollIntoView({ block: "start", inline: "nearest" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });
  setTimeout(() => {
    app?.scrollIntoView({ block: "start", inline: "nearest" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, 0);
}

function filteredAlgorithms() {
  const query = state.query.trim().toLowerCase();
  const allowedLevels = state.level === "all" ? ["start", "more", "all"] : state.level === "more" ? ["start", "more"] : ["start"];
  const finderOption = Object.values(finderOptions).flat().find((option) => option.id === state.finder);
  return algorithms.filter((item) => {
    const stageOk = item.stage === state.filter;
    const levelOk = allowedLevels.includes(item.level);
    const finderOk = !finderOption || finderOption.match(item);
    const f2lOk = item.stage !== "F2L" || Object.entries(state.f2lFilters).every(([key, value]) => !value || f2lAttributes(item)[key] === value);
    const haystack = `${item.name} ${item.stage} ${item.group} ${item.alg} ${item.note}`.toLowerCase();
    return stageOk && levelOk && finderOk && f2lOk && (!query || haystack.includes(query));
  });
}

function selectFirstVisible() {
  const list = filteredAlgorithms();
  if (list.length && !list.some((item) => item.id === state.selectedId)) state.selectedId = list[0].id;
}

function setFilter(filter) {
  state.filter = filter;
  state.level = filter === "F2L" ? "all" : filter === "OLL" ? "more" : "start";
  state.query = "";
  state.finder = "";
  resetF2LFilters();
  if (filter !== "Cross") selectFirstVisible();
  render();
  jumpToTop();
}

function renderHeader() {
  return `
    <header class="app-header">
      <a class="brand-block" href="#home" data-view="home">
        <div class="cube-mark" aria-hidden="true">${Array.from({ length: 9 }).map(() => "<span></span>").join("")}</div>
        <div><p class="eyebrow">Метод Фридрих / CFOP</p><h1>Учебник по кубику Рубика</h1></div>
      </a>
      <nav class="top-nav" aria-label="Главные режимы">
        <button class="${state.view === "home" ? "active" : ""}" data-view="home">Главная</button>
        <button class="${state.view === "assembly" ? "active" : ""}" data-view="assembly">Начать сборку</button>
        <button class="${state.view === "notation" ? "active" : ""}" data-view="notation">Обозначения</button>
        <button class="theme-toggle" data-theme-toggle>${state.theme === "dark" ? "Светлая тема" : "Тёмная тема"}</button>
      </nav>
    </header>`;
}

function renderHero() {
  return `
    <section class="hero" id="home">
      <div class="hero-copy">
        <p class="eyebrow">CFOP без слепой зубрежки</p>
        <h2>Открой сайт, возьми кубик и делай следующий шаг</h2>
        <p>Сайт ведет по сборке от креста к F2L, 7 OLL после желтого креста и PLL. Цветные схемы показывают важные элементы, а формулы разбиты на понятные действия руками.</p>
        <div class="hero-actions">
          <button class="button primary hero-choice" data-view="assembly"><strong>Начать сборку</strong><span>Крест → F2L → OLL → PLL</span></button>
          <button class="button hero-choice" data-view="notation"><strong>Понять формулы</strong><span>R, U, F, штрих и двойные ходы</span></button>
        </div>
      </div>
      <div class="hero-cube">${heroVisualSvg()}</div>
    </section>`;
}

function renderLessons() {
  return `
    <section class="section muted">
      <div class="section-heading"><p class="eyebrow">Маршрут</p><h2>Что делать по порядку</h2><p>Не открывай сразу все 69 формул. Иди слоями: буквы → F2L база → 7 OLL → стартовые PLL.</p></div>
      <div class="lesson-grid">
        ${lessons.map((lesson) => `
          <article class="lesson-card">
            <h3>${lesson.title}</h3>
            <p>${lesson.text}</p>
            <button class="text-button" ${lesson.filter ? `data-filter-jump="${lesson.filter}"` : `data-target="${lesson.target}"`}>${lesson.action}</button>
          </article>`).join("")}
      </div>
    </section>
    ${renderF2LPrinciples()}
    ${renderNotation(true)}
    ${renderStarterSets()}
  `;
}

function renderF2LPrinciples() {
  const steps = [
    ["1", "Найди угол", "Угол имеет белую наклейку и две боковые. Сначала просто найди его на кубике.", { type: "f2l", slot: "FR", corner: "UFR", edge: "none" }],
    ["2", "Найди ребро", "Ребро без белого цвета должно подходить к этому углу по двум боковым цветам.", { type: "f2l", slot: "FR", corner: "UFR", edge: "UR" }],
    ["3", "Собери пару", "Подведи угол и ребро в верхнем слое так, чтобы они стали одним блоком.", { type: "f2l", slot: "FR", corner: "UFR", edge: "UR", pair: true }],
    ["4", "Вставь в слот", "Поставь пару над цветными центрами нужного слота и вставь коротким алгоритмом.", { type: "f2l", slot: "FR", corner: "UFR", edge: "UR", pair: true }],
  ];
  return `
    <section class="section">
      <div class="section-heading"><p class="eyebrow">F2L без паники</p><h2>Одна идея вместо 42 учебных вариантов</h2><p>На старте тебе нужно видеть не весь куб, а цветной угол, подходящее ребро и центры слота. Это и есть смысл F2L.</p></div>
      <div class="principle-grid">
        ${steps.map(([num, title, text, visual]) => `
          <article class="principle-card">
            <span>${num}</span>
            ${f2lSvg(visual)}
            <h3>${title}</h3>
            <p>${text}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function renderNotation(compact = false) {
  const moves = compact ? notation.slice(0, 8) : notation;
  return `
    <section class="section" id="notation">
      <div class="section-heading"><p class="eyebrow">Обозначения</p><h2>Кубик смотрит на тебя одной гранью</h2><p>Белый держим снизу, желтый сверху, передняя грань смотрит прямо на тебя. Подсвеченный слой крути по стрелке; штрих означает обратное направление.</p></div>
      <div class="notation-grid">
        ${moves.map((item) => `
          <article class="notation-card">
            ${notationSvg(item)}
            <div><span class="move-badge">${item.move}</span><h3>${item.title}</h3><p>${item.text}</p></div>
          </article>`).join("")}
      </div>
      ${compact ? `<button class="button ghost wide-button" data-view="notation">Показать все обозначения</button>` : ""}
    </section>`;
}

function renderStageStepper() {
  return `
    <div class="stage-stepper" aria-label="Этапы сборки CFOP">
      ${stageOrder.map((stage) => {
        const info = stageInfo[stage];
        const count = stage === "Cross" ? "без формул" : `${algorithms.filter((item) => item.stage === stage).length} случаев`;
        return `
          <button class="stage-step ${state.filter === stage ? "active" : ""}" data-filter="${stage}">
            <span>${info.eyebrow}</span>
            <strong>${info.title}</strong>
            <small>${count}</small>
          </button>`;
      }).join("")}
    </div>`;
}

function crossSvg() {
  const size = 38;
  const gap = 4;
  const faceSize = size * 3 + gap * 2;
  const dim = "var(--cube-muted)";
  const sticker = (x, y, fill, active = false) =>
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="7" fill="${fill}" opacity="${active ? 1 : 0.28}" stroke="var(--cube-line)" stroke-width="${active ? 3 : 2}"/>`;
  const face = (x, y, faceColor, activeCells = [], label = "") => {
    const activeSet = new Set(activeCells.map(([r, c]) => `${r}${c}`));
    const tiles = [];
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        const active = activeSet.has(`${r}${c}`) || (r === 1 && c === 1);
        tiles.push(sticker(x + c * (size + gap), y + r * (size + gap), active ? faceColor : dim, active));
      }
    }
    return `
      <g>
        <rect x="${x - 7}" y="${y - 7}" width="${faceSize + 14}" height="${faceSize + 14}" rx="14" fill="var(--cube-shell)" stroke="var(--cube-line)" stroke-width="3"/>
        ${tiles.join("")}
        ${label ? `<text x="${x + faceSize / 2}" y="${y + faceSize + 25}" text-anchor="middle" class="svg-mini-label">${label}</text>` : ""}
      </g>`;
  };
  const whiteFace = (x, y) => {
    const tiles = [];
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        const cross = r === 1 || c === 1;
        tiles.push(sticker(x + c * (size + gap), y + r * (size + gap), cross ? COLORS.D : dim, cross));
      }
    }
    return `
      <g>
        <rect x="${x - 7}" y="${y - 7}" width="${faceSize + 14}" height="${faceSize + 14}" rx="14" fill="var(--cube-shell)" stroke="var(--cube-line)" stroke-width="4"/>
        ${tiles.join("")}
      </g>`;
  };
  return `
    <svg class="cross-svg cross-net-svg" viewBox="0 0 520 520" role="img" aria-label="Правильно собранный белый крест: белые ребра и совпадающие боковые центры">
      <text x="260" y="28" text-anchor="middle" class="svg-note">пять видимых граней правильного белого креста</text>
      ${face(198, 52, COLORS.F, [[2, 1]], "зелёный центр")}
      ${face(344, 198, COLORS.R, [[1, 0]], "красный центр")}
      ${face(198, 344, COLORS.B, [[0, 1]], "синий центр")}
      ${face(52, 198, COLORS.L, [[1, 2]], "оранжевый центр")}
      ${whiteFace(198, 198)}
    </svg>`;
}

function renderCrossGuide() {
  return `
    <div class="cross-layout">
      <article class="cross-card">
        <span class="stage-tag cross">Cross · шаг 1</span>
        <h3>Сначала собери правильный крест, а не просто четыре белых ребра</h3>
        ${crossSvg()}
        <div class="cross-checks">
          <div><strong>Цель</strong><p>Белые ребра стоят снизу вокруг белого центра.</p></div>
          <div><strong>Проверка</strong><p>Зелёный, красный, синий и оранжевый цвета ребер совпадают со своими центрами.</p></div>
          <div><strong>Дальше</strong><p>Когда крест совпал по бокам, переходи к F2L: ищи белый угол и подходящее ребро.</p></div>
        </div>
      </article>
      <aside class="cross-notes">
        <h3>Как смотреть на крест</h3>
        <ol>
          <li>Держи белый центр снизу, желтый сверху.</li>
          <li>Поставь каждое белое ребро рядом со своим боковым центром.</li>
          <li>Не гонись за формулами: на этом шаге важнее понимать цвета.</li>
          <li>Если боковой цвет ребра не совпадает с центром, крест еще не готов.</li>
        </ol>
        <button class="button primary" data-filter="F2L">Крест готов, перейти к F2L</button>
      </aside>
    </div>`;
}

function renderModeControls() {
  if (state.filter === "Cross") return "";
  const levelControls = state.filter === "F2L" || state.filter === "OLL" || state.filter === "PLL"
    ? `<div class="segmented level-tabs">${levelsForStage(state.filter).map(([value, label]) => `<button class="${state.level === value ? "active" : ""}" data-level="${value}">${label}</button>`).join("")}</div>`
    : "";
  return `
    <div class="library-tools">
      <label class="search-box"><span>Поиск по случаю или формуле</span><input id="searchInput" type="search" value="${state.query}" placeholder="Правая вставка, Sune, R U R'..." /><small>Можно писать название, группу или кусок формулы.</small></label>
      ${levelControls}
    </div>`;
}

function renderCaseFinder(list) {
  const activeStage = ["F2L", "OLL", "PLL"].includes(state.filter) ? state.filter : "F2L";
  const options = finderOptions[activeStage];
  const helper = {
    F2L: "Сначала выбери, где угол и ребро. Если сомневаешься, начни с базовых случаев.",
    OLL: "Здесь только 7 случаев после готового желтого креста. Смотри на углы и боковые желтые наклейки.",
    PLL: "Верх уже желтый. Сначала ищи готовый блок, потом смотри на обмены.",
  }[activeStage];
  return `
    <div class="case-finder compact-finder">
      <div class="finder-step">
        <span class="step-number">1</span>
        <div>
          <strong>Что ты видишь на кубике?</strong>
          <p>${helper}</p>
        </div>
        <div class="finder-buttons">
          <button class="${state.finder === "" ? "active" : ""}" data-finder="">Все варианты</button>
          ${options.map((option) => `<button class="${state.finder === option.id ? "active" : ""}" data-finder="${option.id}"><span>${option.label}</span><small>${option.text}</small></button>`).join("")}
        </div>
      </div>
      <p class="finder-result"><strong>${list.length}</strong> подходящих случаев. Открой карточку, чтобы увидеть крупную схему и объяснение.</p>
    </div>`;
}

function renderF2LWizard() {
  const groups = [
    ["corner", "Где белый угол?", [["", "не знаю"], ["top", "сверху"], ["slot", "в слоте"]]],
    ["white", "Куда смотрит белый?", [["", "не знаю"], ["up", "наверх"], ["side", "вбок"], ["slot", "внизу"]]],
    ["edge", "Где ребро пары?", [["", "не знаю"], ["top", "сверху"], ["slot", "в слоте"]]],
    ["pair", "Пара уже собрана?", [["", "не знаю"], ["ready", "да"], ["separate", "нет"], ["wrong", "неправильно"]]],
    ["slot", "Какой слот собираешь?", [["", "любой"], ["right", "правый"], ["left", "левый"]]],
  ];
  return `
    <div class="f2l-wizard">
      <div class="wizard-intro">
        <p class="eyebrow">Найти F2L-случай</p>
        <h3>Ответь на 2–3 вопроса, и список сузится</h3>
        <p>Если не уверен, оставь “не знаю”. Сайт не заставляет угадывать все сразу.</p>
        <details class="wizard-glossary">
          <summary>Что значат варианты?</summary>
          <span><b>Угол</b> деталь с белой наклейкой</span>
          <span><b>Ребро</b> деталь без белого</span>
          <span><b>Слот</b> место между двумя центрами</span>
          <span><b>Неправильно</b> пара склеена, но цвета не совпали</span>
        </details>
      </div>
      ${groups.map(([key, title, options]) => `
        <div class="wizard-row">
          <strong>${title}</strong>
          <div class="wizard-options">
            ${options.map(([value, label]) => `<button class="${state.f2lFilters[key] === value ? "active" : ""}" data-f2l-filter="${key}" data-f2l-value="${value}">${label}</button>`).join("")}
          </div>
        </div>`).join("")}
      <button class="text-button reset-filters" data-reset-f2l>Сбросить выбор</button>
    </div>`;
}

function renderCaseFacts(item) {
  if (item.stage !== "F2L") return "";
  if (item.visual?.type === "f2l-source") {
    const group = verifiedF2LGroupNames[item.visual.sourceGroup] || item.visual.sourceGroup || "F2L";
    return `<p class="case-orientation">Формула сверена со SpeedCubeDB: F2L ${item.visual.scdb}, группа “${group}”. Схема построена как физическая модель: цветные только угол, ребро и центры слота.</p>`;
  }
  const colors = slotPalette(item.visual?.slot || "FR");
  return `<p class="case-orientation">На схеме пример одного слота: белый снизу, ${colors.frontColorName} спереди, ${colors.sideColorName} ${colors.sideName === "правая" ? "справа" : "слева"}. Цвета ищи прямо на кубике, без отдельных плашек.</p>`;
}

function renderStudy(item) {
  return `
    <aside class="study-panel">
      <article class="study-card">
        <div class="study-top">
          <span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span>
        </div>
        <h3>${item.name}</h3>
        ${visualSvg(item)}
        ${renderCaseFacts(item)}
        <p>${item.note}</p>
        <div class="recognition"><strong>На что смотреть:</strong><span>${recognitionHint(item)}</span></div>
        ${renderActionGuide(item)}
        <p class="study-label">Формула</p>
        ${algorithmHtml(item)}
        <button class="copy-button" data-copy="${item.alg}">Копировать формулу</button>
      </article>
    </aside>`;
}

function recognitionHint(item) {
  if (item.stage === "F2L") return "сравни цветной угол, цветное ребро и цветные центры слота; серые наклейки сейчас не важны.";
  if (item.stage === "OLL") return "желтый крест уже собран; сравни верхние углы и боковые желтые наклейки.";
  return "верх уже желтый; распознавай готовые блоки и элементы, которые меняются местами.";
}

function renderCard(item) {
  return `
    <article class="algo-card ${state.selectedId === item.id ? "selected" : ""}" id="card-${item.id}" data-id="${item.id}" data-open-case="${item.id}">
      <div class="card-top"><span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span></div>
      <h3>${item.name}</h3>
      ${visualSvg(item, { compact: true, flat: item.stage === "F2L" })}
      ${f2lMiniFacts(item)}
      <p>${item.note}</p>
      ${algorithmHtml(item)}
      <div class="card-actions"><button class="study-button" data-open-case="${item.id}">Открыть разбор</button><button class="copy-button" data-copy="${item.alg}">Копировать</button></div>
    </article>`;
}

function renderAssembly() {
  selectFirstVisible();
  const info = stageInfo[state.filter] || stageInfo.Cross;
  const list = state.filter === "Cross" ? [] : filteredAlgorithms();
  const stats = ["F2L", "OLL", "PLL"].map((stage) => `<span class="stat-pill">${stage}: ${algorithms.filter((item) => item.stage === stage).length}</span>`).join("");
  const stageBody = state.filter === "Cross" ? renderCrossGuide() : `
      ${state.filter === "F2L" ? renderF2LWizard() : renderCaseFinder(list)}
      <div class="stats-row"><span class="stat-pill">Показано: ${list.length}</span>${stats}</div>
      <div class="cards-heading"><h3>${state.filter === "F2L" ? "Все F2L-варианты" : "Случаи для этого шага"}</h3><p>${state.filter === "F2L" ? "Три карточки в строку на широком экране. Нажми на случай, чтобы открыть полный разбор и вернуться назад к тому же месту." : "Открой карточку, чтобы увидеть крупную схему, формулу и распознавание."}</p></div>
      <div class="cards-grid ${state.filter.toLowerCase()}-overview">${list.map(renderCard).join("") || `<p class="empty-state">Ничего не найдено.</p>`}</div>`;
  return `
    <section class="section" id="assembly">
      <div class="section-heading compact">
        <div><p class="eyebrow">Начать сборку</p><h2>${info.title}</h2><p>${info.text}</p></div>
        ${renderModeControls()}
      </div>
      ${renderStageStepper()}
      ${stageBody}
    </section>`;
}

function renderStarterSets() {
  const groups = [
    ["F2L база", "Сначала научись видеть пару и слот.", algorithms.filter((item) => item.stage === "F2L" && item.level === "start").slice(0, 3), "F2L"],
    ["7 OLL после креста", "Твой желтый крест уже готов, осталось развернуть углы.", algorithms.filter((item) => item.stage === "OLL").slice(0, 3), "OLL"],
    ["PLL старт", "Начни с перестановок, которые проще всего узнать.", algorithms.filter((item) => item.stage === "PLL" && item.level === "start").slice(0, 3), "PLL"],
  ];
  return `
    <section class="section muted">
      <div class="section-heading"><p class="eyebrow">Первые формулы</p><h2>Минимальный набор для старта</h2><p>Полный справочник лежит в “Начать сборку”. Здесь только то, что стоит открыть первым.</p></div>
      ${groups.map(([title, text, list, filter]) => `
        <div class="starter-row">
          <div class="starter-heading">
            <h3>${title}</h3>
            <p>${text}</p>
            <button class="text-button" data-filter-jump="${filter}">Открыть раздел</button>
          </div>
          <div class="starter-cards">${list.map(renderCard).join("")}</div>
        </div>`).join("")}
    </section>`;
}

function trainerPool() {
  const stage = ["F2L", "OLL", "PLL"].includes(state.filter) ? state.filter : "OLL";
  return algorithms.filter((item) => item.stage === stage && (state.level === "all" || item.level === state.level));
}

function renderTrainer() {
  const pool = trainerPool();
  const item = algorithms.find((candidate) => candidate.id === state.selectedId && pool.includes(candidate)) || pool[0] || algorithms[0];
  return `
    <section class="section trainer-section">
      <div class="section-heading compact">
        <div><p class="eyebrow">Тренировка</p><h2>Узнай случай по схеме</h2><p>Сначала попробуй назвать случай и понять, что важно. Потом открой формулу.</p></div>
        ${renderModeControls()}
      </div>
      <div class="trainer-shell">
        <article class="trainer-card">
          ${visualSvg(item)}
          <div class="trainer-meta"><span class="stage-tag ${item.stage.toLowerCase()}">${item.stage}</span><h3>${state.showAnswer ? item.name : "Какой это случай?"}</h3><p>${state.showAnswer ? item.note : "Посмотри на подсвеченные элементы. Серое игнорируй."}</p></div>
          ${state.showAnswer ? algorithmHtml(item) : `<div class="answer-placeholder">Формула скрыта</div>`}
          <div class="trainer-actions"><button class="button primary" data-next-trainer>Следующий</button><button class="button ghost" data-toggle-answer>${state.showAnswer ? "Скрыть ответ" : "Показать ответ"}</button></div>
        </article>
      </div>
    </section>`;
}

function renderSources() {
  return `<section class="section sources"><div class="section-heading"><p class="eyebrow">Источники</p><h2>Формулы сверены по учебным базам</h2><p>OLL намеренно ограничен 7 OCLL-случаями после желтого креста.</p><p class="source-links"><a href="https://jperm.net/3x3/moves" target="_blank" rel="noreferrer">J Perm Move Notation</a><a href="https://jperm.net/algs/pll" target="_blank" rel="noreferrer">J Perm PLL</a><a href="https://jperm.net/algs/2lookoll" target="_blank" rel="noreferrer">J Perm 2-Look OLL</a><a href="https://www.speedsolving.com/wiki/index.php/PLL" target="_blank" rel="noreferrer">Speedsolving PLL</a><a href="https://speedcubedb.com/a/3x3/F2L" target="_blank" rel="noreferrer">SpeedCubeDB F2L</a><a href="https://www.rubiksplace.com/speedcubing/F2L-algorithms/" target="_blank" rel="noreferrer">Rubiksplace F2L</a></p></div></section>`;
}

function render() {
  let content = "";
  if (state.view === "home") content = renderHero();
  if (state.view === "notation") content = renderNotation(false);
  if (state.view === "assembly") content = renderAssembly();
  if (state.view === "case") {
    const item = algorithms.find((candidate) => candidate.id === state.detailId) || algorithms[0];
    content = renderCaseDetail(item);
  }
  app.innerHTML = renderHeader() + `<main>${content}${renderSources()}</main><footer class="site-footer"><p>Маршрут короткий: правильный крест, затем пары F2L, 7 OLL после желтого креста и PLL по блокам.</p></footer>`;
  const input = document.querySelector("#searchInput");
  if (input) {
    input.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
      const nextInput = document.querySelector("#searchInput");
      nextInput?.focus({ preventScroll: true });
      nextInput?.setSelectionRange(state.query.length, state.query.length);
    });
  }
}

function pickNextTrainer() {
  const pool = trainerPool();
  const current = pool.findIndex((item) => item.id === state.selectedId);
  const next = pool[(current + 1 + Math.floor(Math.random() * Math.max(pool.length - 1, 1))) % pool.length] || pool[0];
  state.selectedId = next.id;
  state.showAnswer = false;
  render();
}

document.addEventListener("click", async (event) => {
  const viewButton = event.target.closest("[data-view]");
  const filterButton = event.target.closest("[data-filter]");
  const levelButton = event.target.closest("[data-level]");
  const finderButton = event.target.closest("[data-finder]");
  const f2lFilterButton = event.target.closest("[data-f2l-filter]");
  const resetF2LButton = event.target.closest("[data-reset-f2l]");
  const filterJump = event.target.closest("[data-filter-jump]");
  const targetButton = event.target.closest("[data-target]");
  const studyButton = event.target.closest("[data-study]");
  const card = event.target.closest(".algo-card[data-id]");
  const openCaseButton = event.target.closest("[data-open-case]");
  const backButton = event.target.closest("[data-back-to-list]");
  const themeButton = event.target.closest("[data-theme-toggle]");
  const copyButton = event.target.closest("[data-copy]");

  if (copyButton) {
    event.stopPropagation();
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyButton.textContent = "Скопировано";
    setTimeout(render, 800);
    return;
  }
  if (themeButton) {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("cfop-theme", state.theme);
    applyTheme();
    render();
    return;
  }
  if (backButton) {
    const anchor = backButton.dataset.backToList;
    state.view = "assembly";
    render();
    requestAnimationFrame(() => {
      document.querySelector(`#card-${anchor}`)?.scrollIntoView({ block: "center" });
    });
    return;
  }
  if (openCaseButton || card) {
    const id = openCaseButton?.dataset.openCase || card.dataset.id;
    state.detailId = id;
    state.selectedId = id;
    state.returnAnchor = id;
    jumpToTop();
    state.view = "case";
    render();
    jumpToTop();
    return;
  }
  if (viewButton) {
    event.preventDefault();
    state.view = viewButton.dataset.view;
    render();
    jumpToTop();
    return;
  }
  if (filterButton) {
    setFilter(filterButton.dataset.filter);
    return;
  }
  if (finderButton) {
    state.finder = finderButton.dataset.finder || "";
    selectFirstVisible();
    render();
    return;
  }
  if (f2lFilterButton) {
    state.f2lFilters[f2lFilterButton.dataset.f2lFilter] = f2lFilterButton.dataset.f2lValue || "";
    selectFirstVisible();
    render();
    return;
  }
  if (resetF2LButton) {
    resetF2LFilters();
    selectFirstVisible();
    render();
    return;
  }
  if (levelButton) {
    state.level = levelButton.dataset.level;
    selectFirstVisible();
    render();
    return;
  }
  if (filterJump) {
    state.view = "assembly";
    setFilter(filterJump.dataset.filterJump);
    return;
  }
  if (targetButton) {
    document.querySelector(targetButton.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
});

render();
