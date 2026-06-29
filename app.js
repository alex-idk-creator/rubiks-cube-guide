const COLORS = {
  U: "#f5d34b",
  F: "#2f6fdd",
  R: "#e64c43",
  L: "#35a66f",
  B: "#f39a35",
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
  { move: "R", title: "Правая грань", face: "R", dir: "cw", text: "Крути правую грань вверх от себя. Это один из главных ходов CFOP." },
  { move: "R'", title: "Правая обратно", face: "R", dir: "ccw", text: "Та же правая грань, но в обратную сторону: вниз к себе." },
  { move: "L", title: "Левая грань", face: "L", dir: "cw", rotate: "left", text: "Левую грань удобнее представить, слегка повернув куб в руках." },
  { move: "L'", title: "Левая обратно", face: "L", dir: "ccw", rotate: "left", text: "Обратный ход левой грани. Смотри на левую сторону кубика." },
  { move: "U", title: "Верхняя грань", face: "U", dir: "cw", text: "Крути верхний слой по часовой стрелке, если смотришь сверху." },
  { move: "U'", title: "Верхняя обратно", face: "U", dir: "ccw", text: "Верхний слой в обратную сторону. Часто делается указательным пальцем." },
  { move: "F", title: "Передняя грань", face: "F", dir: "cw", text: "Передняя грань смотрит на тебя. Не путай ее с правой." },
  { move: "F'", title: "Передняя обратно", face: "F", dir: "ccw", text: "Передняя грань против обычного направления." },
  { move: "D", title: "Нижняя грань", face: "D", dir: "cw", rotate: "down", text: "Нижний слой. На схеме он показан как подсказка снизу." },
  { move: "D'", title: "Нижняя обратно", face: "D", dir: "ccw", rotate: "down", text: "Нижний слой в обратную сторону. Встречается в некоторых PLL." },
  { move: "B", title: "Задняя грань", face: "B", dir: "cw", rotate: "back", text: "Заднюю грань проще понять, если мысленно повернуть куб задом к себе." },
  { move: "B'", title: "Задняя обратно", face: "B", dir: "ccw", rotate: "back", text: "Задняя грань в обратную сторону." },
  { move: "R2", title: "Двойной ход", face: "R", dir: "double", text: "R2 значит повернуть правую грань на 180 градусов." },
  { move: "U2", title: "Верх на 180", face: "U", dir: "double", text: "U2 — верхний слой на пол-оборота. Направление неважно." },
  { move: "M", title: "Средний слой", face: "M", dir: "ccw", text: "Средний вертикальный слой между L и R. Нужен в H-perm и Z-perm." },
  { move: "x y z", title: "Поворот куба", face: "cube", dir: "turn", text: "Поворачивается весь кубик в руках, а не отдельная грань." },
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

  { id: "oll-27", stage: "OLL", level: "start", name: "Sune", group: "OCLL", alg: "R U R' U R U2 R'", note: "Один угол уже желтый сверху. Остальные углы развернутся этой формулой.", visual: { type: "oll", top: "001111111", sides: ["F1", "R0", "R2"], hold: "готовый угол спереди-слева" } },
  { id: "oll-26", stage: "OLL", level: "start", name: "Anti-Sune", group: "OCLL", alg: "R U2 R' U' R U' R'", note: "Зеркальный Sune. Сравни боковые желтые наклейки перед стартом.", visual: { type: "oll", top: "100111111", sides: ["F1", "L0", "L2"], hold: "готовый угол спереди-справа" } },
  { id: "oll-21", stage: "OLL", level: "more", name: "H", group: "OCLL", alg: "R U R' U R U' R' U R U2 R'", note: "На верхней грани нет готовых углов, но желтый крест уже есть.", visual: { type: "oll", top: "010111010", sides: ["F0", "F2", "L0", "R2"], hold: "любой стороной с парой боковых желтых" } },
  { id: "oll-22", stage: "OLL", level: "more", name: "Pi", group: "OCLL", alg: "R U2 R2 U' R2 U' R2 U2 R", note: "Похоже на две пары боковых желтых наклеек.", visual: { type: "oll", top: "000111000", sides: ["F0", "F2", "B0", "B2"], hold: "пары по переду и заду" } },
  { id: "oll-23", stage: "OLL", level: "more", name: "Headlights", group: "OCLL", alg: "R2 D R' U2 R D' R' U2 R'", note: "Две боковые желтые наклейки на одной стороне выглядят как фары.", visual: { type: "oll", top: "101111101", sides: ["F0", "F2"], hold: "фары спереди" } },
  { id: "oll-24", stage: "OLL", level: "more", name: "Chameleon", group: "OCLL", alg: "r U R' U' r' F R F'", note: "Два готовых угла по диагонали. Ориентируйся по боковым желтым.", visual: { type: "oll", top: "101111010", sides: ["F2", "R2"], hold: "диагональ сверху" } },
  { id: "oll-25", stage: "OLL", level: "more", name: "Bowtie", group: "OCLL", alg: "F' r U R' U' r' F R", note: "Тоже диагональ, но боковые желтые стоят иначе.", visual: { type: "oll", top: "010111101", sides: ["F0", "R2"], hold: "форма бабочки" } },

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

const state = {
  view: "learn",
  filter: "all",
  level: "start",
  query: "",
  selectedId: "f2l-1",
  showAnswer: false,
  favorites: new Set(JSON.parse(localStorage.getItem("cfop-favorites") || "[]")),
};

const app = document.querySelector("#app");

function saveFavorites() {
  localStorage.setItem("cfop-favorites", JSON.stringify([...state.favorites]));
}

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
      ${labels.map((label) => `<text x="${label.x}" y="${label.y}" class="svg-note">${label.text}</text>`).join("")}
    </svg>
  `;
}

function notationSvg(item) {
  const visibleFace = item.face === "L" ? "F" : item.face === "B" ? "R" : item.face === "D" ? "F" : item.face === "M" ? "R" : item.face === "cube" ? null : item.face;
  const labels = [];
  const colorOverrides = {};
  if (item.face === "L") colorOverrides.F = COLORS.L;
  if (item.face === "B") colorOverrides.R = COLORS.B;
  if (item.face === "D") colorOverrides.F = COLORS.D;
  if (item.face === "M") colorOverrides.R = COLORS.slot;
  if (item.rotate) labels.push({ x: 165, y: 300, text: item.rotate === "left" ? "для L поверни куб в руках" : item.rotate === "back" ? "задняя грань показана подсказкой" : "нижний слой под кубом" });
  if (item.face === "M") labels.push({ x: 112, y: 300, text: "средний слой" });
  return cubeSvg({
    active: visibleFace ? [visibleFace] : [],
    arrowFace: visibleFace || "U",
    dir: item.dir,
    labels,
    colorOverrides,
    title: `Ход ${item.move}`,
  });
}

const pointMap = {
  U: [150, 86], UF: [150, 102], UR: [218, 86], UL: [82, 86], UB: [150, 42],
  UFR: [184, 112], UFL: [116, 112], UBR: [218, 58], UBL: [82, 58],
  FR: [224, 188], FL: [82, 188], F: [150, 190], BR: [252, 116], BL: [48, 116],
};

function piece(kind, at, label, color) {
  const [x, y] = pointMap[at] || pointMap.U;
  const shape = kind === "corner" ? `<rect x="${x - 18}" y="${y - 18}" width="36" height="36" rx="8"` : `<rect x="${x - 22}" y="${y - 13}" width="44" height="26" rx="7"`;
  return `${shape} fill="${color}" stroke="${COLORS.ink}" stroke-width="4"/><text x="${x}" y="${y + 5}" text-anchor="middle" class="piece-label">${label}</text>`;
}

function f2lSvg(visual) {
  const slot = visual.slot || "FR";
  const slotPoint = pointMap[slot] || pointMap.FR;
  const pieces = [
    `<rect x="${slotPoint[0] - 28}" y="${slotPoint[1] - 28}" width="56" height="56" rx="10" fill="rgba(15,139,141,.16)" stroke="${COLORS.slot}" stroke-width="4" stroke-dasharray="7 5"/>`,
  ];
  if (visual.corner !== "none") pieces.push(piece("corner", visual.corner || "UFR", "У", visual.wrong ? COLORS.corner : COLORS.pair));
  if (visual.edge !== "none") pieces.push(piece("edge", visual.edge || "UR", "Р", visual.wrong ? COLORS.edge : COLORS.pair));
  const labels = [{ x: 98, y: 300, text: "У = угол, Р = ребро, пунктир = слот" }];
  return cubeSvg({ active: [], pieces, labels, title: "F2L: угол, ребро и слот" });
}

function ollSvg(visual) {
  const active = [];
  [...visual.top].forEach((cell, index) => {
    if (cell === "1") active.push(`U${Math.floor(index / 3)}${index % 3}`);
  });
  const sideMarks = (visual.sides || []).map((code) => {
    const face = code[0] === "L" ? "F" : code[0] === "B" ? "R" : code[0];
    const i = Number(code.slice(1)) || 0;
    const p = face === "F" ? [70 + i * 35, 230] : [260 - i * 32, 230];
    return `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="${COLORS.U}" stroke="${COLORS.ink}" stroke-width="4"/>`;
  });
  return cubeSvg({
    active,
    pieces: sideMarks,
    labels: [{ x: 80, y: 300, text: visual.hold ? `держи: ${visual.hold}` : "желтый крест уже готов" }],
    title: "OLL после желтого креста",
  });
}

function pllSvg(visual) {
  const pieces = [];
  const ring = [[150, 48], [222, 82], [250, 160], [218, 238], [150, 270], [82, 238], [50, 160], [78, 82]];
  ring.forEach(([x, y], i) => {
    const color = i % 2 === 0 ? COLORS.R : COLORS.F;
    pieces.push(`<rect x="${x - 16}" y="${y - 16}" width="32" height="32" rx="8" fill="${color}" stroke="${COLORS.ink}" stroke-width="4"/>`);
  });
  const arrow = visual.arrows === "cw" || visual.arrows === "cycle" ? "↻" : visual.arrows === "ccw" ? "↺" : visual.arrows === "diagonal" ? "⤫" : visual.arrows === "cross" ? "↕" : "⇄";
  pieces.push(`<circle cx="150" cy="160" r="50" fill="rgba(255,255,255,.82)" stroke="${COLORS.ink}" stroke-width="4"/><text x="150" y="174" text-anchor="middle" class="pll-arrow">${arrow}</text>`);
  const labels = [{ x: 76, y: 300, text: "верх уже желтый; смотри на боковые блоки" }];
  return cubeSvg({ active: ["U"], pieces, labels, title: "PLL распознавание" });
}

function visualSvg(item) {
  if (item.visual?.type === "oll") return ollSvg(item.visual);
  if (item.visual?.type === "pll") return pllSvg(item.visual);
  return f2lSvg(item.visual || {});
}

function algorithmHtml(item, hidden = false) {
  return `<div class="algorithm ${hidden ? "hidden-alg" : ""}">${tokens(item.alg).map((token) => `<span class="token">${token}</span>`).join("")}</div>`;
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

function filteredAlgorithms() {
  const query = state.query.trim().toLowerCase();
  const allowedLevels = state.level === "all" ? ["start", "more", "all"] : state.level === "more" ? ["start", "more"] : ["start"];
  return algorithms.filter((item) => {
    const stageOk = state.filter === "all" || item.stage === state.filter || (state.filter === "favorite" && state.favorites.has(item.id));
    const levelOk = state.filter === "all" || state.filter === "favorite" || allowedLevels.includes(item.level);
    const haystack = `${item.name} ${item.stage} ${item.group} ${item.alg} ${item.note}`.toLowerCase();
    return stageOk && levelOk && (!query || haystack.includes(query));
  });
}

function selectFirstVisible() {
  const list = filteredAlgorithms();
  if (list.length && !list.some((item) => item.id === state.selectedId)) state.selectedId = list[0].id;
}

function setFilter(filter) {
  state.filter = filter;
  state.level = filter === "PLL" || filter === "F2L" || filter === "OLL" ? "start" : "all";
  state.query = "";
  selectFirstVisible();
  render();
}

function renderHeader() {
  return `
    <header class="app-header">
      <a class="brand-block" href="#top" data-view="learn">
        <div class="cube-mark" aria-hidden="true">${Array.from({ length: 9 }).map(() => "<span></span>").join("")}</div>
        <div><p class="eyebrow">Метод Фридрих / CFOP</p><h1>Учебник по кубику Рубика</h1></div>
      </a>
      <nav class="top-nav" aria-label="Главные режимы">
        <button class="${state.view === "learn" ? "active" : ""}" data-view="learn">Учусь</button>
        <button class="${state.view === "library" ? "active" : ""}" data-view="library">Формулы</button>
        <button class="${state.view === "trainer" ? "active" : ""}" data-view="trainer">Тренировка</button>
        <button class="${state.view === "notation" ? "active" : ""}" data-view="notation">Буквы</button>
      </nav>
    </header>`;
}

function renderHero() {
  return `
    <section class="hero" id="top">
      <div class="hero-copy">
        <p class="eyebrow">Не зубрить вслепую</p>
        <h2>CFOP как понятная карта действий</h2>
        <p>Сначала смотри на схему: что важно подсвечено, лишнее приглушено. Потом повторяй формулу маленькими кусками.</p>
        <div class="hero-actions">
          <button class="button primary" data-view="notation">Разобрать буквы</button>
          <button class="button ghost" data-view="learn">Учиться по шагам</button>
        </div>
      </div>
      <div class="hero-cube">${cubeSvg({ active: ["U", "F", "R"], arrowFace: "U", dir: "turn", title: "Кубик в учебном ракурсе" })}</div>
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
    ["4", "Вставь в слот", "Поставь пару над пунктирным слотом и вставь коротким алгоритмом.", { type: "f2l", slot: "FR", corner: "UFR", edge: "UR", pair: true }],
  ];
  return `
    <section class="section">
      <div class="section-heading"><p class="eyebrow">F2L без паники</p><h2>Одна идея вместо 41 формулы</h2><p>На старте тебе нужно видеть не весь куб, а только угол, ребро и слот. Это и есть смысл F2L.</p></div>
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
      <div class="section-heading"><p class="eyebrow">Обозначения</p><h2>Какая буква какую грань крутит</h2><p>Куб держим белым вниз, желтым вверх. Обычный ход идет по стрелке, ход со штрихом — обратно.</p></div>
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

function renderModeControls() {
  const stages = [["all", "Все"], ["F2L", "F2L"], ["OLL", "OLL"], ["PLL", "PLL"], ["favorite", "★"]];
  const levelControls = state.filter === "F2L" || state.filter === "OLL" || state.filter === "PLL"
    ? `<div class="segmented level-tabs">${levelsForStage(state.filter).map(([value, label]) => `<button class="${state.level === value ? "active" : ""}" data-level="${value}">${label}</button>`).join("")}</div>`
    : "";
  return `
    <div class="library-tools">
      <label class="search-box"><span>Поиск</span><input id="searchInput" type="search" value="${state.query}" placeholder="Sune, T-perm, R U R'..." /></label>
      <div class="segmented">${stages.map(([value, label]) => `<button class="${state.filter === value ? "active" : ""}" data-filter="${value}">${label}</button>`).join("")}</div>
      ${levelControls}
    </div>`;
}

function renderStudy(item) {
  const favorite = state.favorites.has(item.id);
  return `
    <aside class="study-panel">
      <article class="study-card">
        <div class="study-top">
          <span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span>
          <button class="fav-button ${favorite ? "active" : ""}" data-fav="${item.id}">${favorite ? "★" : "☆"}</button>
        </div>
        <h3>${item.name}</h3>
        ${visualSvg(item)}
        <p>${item.note}</p>
        <div class="recognition"><strong>На что смотреть:</strong><span>${recognitionHint(item)}</span></div>
        <p class="study-label">Формула</p>
        ${algorithmHtml(item)}
        <button class="copy-button" data-copy="${item.alg}">Копировать формулу</button>
      </article>
    </aside>`;
}

function recognitionHint(item) {
  if (item.stage === "F2L") return "найди только угол, ребро и пунктирный слот; все серые наклейки сейчас не важны.";
  if (item.stage === "OLL") return "желтый крест уже собран; сравни верхние углы и боковые желтые наклейки.";
  return "верх уже желтый; распознавай готовые блоки и элементы, которые меняются местами.";
}

function renderCard(item) {
  const favorite = state.favorites.has(item.id);
  return `
    <article class="algo-card ${state.selectedId === item.id ? "selected" : ""}" data-id="${item.id}">
      <div class="card-top"><span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span><button class="fav-button ${favorite ? "active" : ""}" data-fav="${item.id}">${favorite ? "★" : "☆"}</button></div>
      <h3>${item.name}</h3>
      ${visualSvg(item)}
      <p>${item.note}</p>
      ${algorithmHtml(item)}
      <div class="card-actions"><button class="study-button" data-study="${item.id}">Разобрать крупно</button><button class="copy-button" data-copy="${item.alg}">Копировать</button></div>
    </article>`;
}

function renderLibrary(embedded = false) {
  selectFirstVisible();
  const list = filteredAlgorithms();
  const selected = algorithms.find((item) => item.id === state.selectedId) || list[0] || algorithms[0];
  const stats = ["F2L", "OLL", "PLL"].map((stage) => `<span class="stat-pill">${stage}: ${algorithms.filter((item) => item.stage === stage).length}</span>`).join("");
  return `
    <section class="section" id="library">
      <div class="section-heading compact">
        <div><p class="eyebrow">Справочник</p><h2>${embedded ? "Быстрый доступ к формулам" : "Формулы и распознавание"}</h2><p>Выбери этап и уровень. Новичку лучше начинать с режима “Начать/База”.</p></div>
        ${renderModeControls()}
      </div>
      <div class="stats-row"><span class="stat-pill">Показано: ${list.length}</span><span class="stat-pill">Избранное: ${state.favorites.size}</span>${stats}</div>
      <div class="library-layout">
        ${renderStudy(selected)}
        <div class="cards-grid">${list.map(renderCard).join("") || `<p class="empty-state">Ничего не найдено.</p>`}</div>
      </div>
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
      <div class="section-heading"><p class="eyebrow">Первые формулы</p><h2>Минимальный набор для старта</h2><p>Полный справочник не исчез: он в режиме “Формулы”. Здесь только то, что стоит открыть первым.</p></div>
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
  const stage = state.filter === "all" || state.filter === "favorite" ? "OLL" : state.filter;
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
  return `<section class="section sources"><div class="section-heading"><p class="eyebrow">Источники</p><h2>Формулы сверены по учебным базам</h2><p>OLL намеренно ограничен 7 OCLL-случаями после желтого креста.</p><p class="source-links"><a href="https://jperm.net/algs/pll" target="_blank" rel="noreferrer">J Perm PLL</a><a href="https://jperm.net/algs/2look/oll" target="_blank" rel="noreferrer">J Perm OLL</a><a href="https://www.speedsolving.com/wiki/index.php/PLL" target="_blank" rel="noreferrer">Speedsolving PLL</a><a href="https://www.rubiksplace.com/speedcubing/F2L-algorithms/" target="_blank" rel="noreferrer">Rubiksplace F2L</a></p></div></section>`;
}

function render() {
  let content = "";
  if (state.view === "learn") content = renderHero() + renderLessons();
  if (state.view === "notation") content = renderNotation(false);
  if (state.view === "library") content = renderLibrary(false);
  if (state.view === "trainer") content = renderTrainer();
  app.innerHTML = renderHeader() + `<main>${content}${renderSources()}</main><footer class="site-footer"><p>Избранное хранится в этом браузере. Начинай с малого: F2L база, 7 OLL, затем стартовые PLL.</p></footer>`;
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
  const filterJump = event.target.closest("[data-filter-jump]");
  const targetButton = event.target.closest("[data-target]");
  const studyButton = event.target.closest("[data-study]");
  const card = event.target.closest(".algo-card[data-id]");
  const favoriteButton = event.target.closest("[data-fav]");
  const copyButton = event.target.closest("[data-copy]");

  if (favoriteButton) {
    const id = favoriteButton.dataset.fav;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    saveFavorites();
    render();
    return;
  }
  if (copyButton) {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyButton.textContent = "Скопировано";
    setTimeout(render, 800);
    return;
  }
  if (viewButton) {
    event.preventDefault();
    state.view = viewButton.dataset.view;
    if (state.view === "trainer") state.showAnswer = false;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (filterButton) {
    setFilter(filterButton.dataset.filter);
    return;
  }
  if (levelButton) {
    state.level = levelButton.dataset.level;
    selectFirstVisible();
    render();
    return;
  }
  if (filterJump) {
    state.view = "library";
    setFilter(filterJump.dataset.filterJump);
    return;
  }
  if (targetButton) {
    document.querySelector(targetButton.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (studyButton || card) {
    state.selectedId = studyButton?.dataset.study || card.dataset.id;
    render();
    document.querySelector(".study-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (event.target.closest("[data-next-trainer]")) {
    pickNextTrainer();
    return;
  }
  if (event.target.closest("[data-toggle-answer]")) {
    state.showAnswer = !state.showAnswer;
    render();
  }
});

render();
