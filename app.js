const notation = [
  { move: "R", title: "Правая грань", face: "right", arrow: "up", text: "Правая сторона кубика. R' крутится в обратную сторону." },
  { move: "L", title: "Левая грань", face: "left", arrow: "down", text: "Левая сторона кубика. Для L смотри именно на левую грань." },
  { move: "U", title: "Верхняя грань", face: "top", arrow: "right", text: "Верхний слой. U' идет обратно по верхней грани." },
  { move: "D", title: "Нижняя грань", face: "bottom", arrow: "left", text: "Нижний слой. В CFOP нужен реже, чаще всего в PLL." },
  { move: "F", title: "Передняя грань", face: "front", arrow: "clockwise", text: "Грань, которая смотрит на тебя. Ее важно не путать с правой." },
  { move: "B", title: "Задняя грань", face: "back", arrow: "counter", text: "Задняя грань. Направление считается так, будто ты смотришь на нее сзади." },
  { move: "R2", title: "Двойной ход", face: "right", arrow: "double", text: "Цифра 2 означает поворот на 180 градусов: R2, U2, F2." },
  { move: "R'", title: "Штрих", face: "right", arrow: "down", text: "Штрих после буквы означает обратный поворот: R' читается как R prime." },
  { move: "Rw / r", title: "Широкий ход", face: "wide", arrow: "up", text: "Крутишь правую грань вместе со средним слоем рядом с ней." },
  { move: "M", title: "Средний слой", face: "middle", arrow: "down", text: "Средний вертикальный слой между L и R. Часто встречается в H-perm и Z-perm." },
  { move: "x y z", title: "Поворот всего куба", face: "whole", arrow: "turn", text: "x как R, y как U, z как F, но вращается весь кубик в руках." },
  { move: "( )", title: "Скобки", face: "none", arrow: "none", text: "Скобки просто группируют удобный кусок алгоритма. Это не ход." },
];

const f2lVisuals = [
  "corner-top edge-top slot-fr", "corner-front edge-top slot-fr", "corner-right edge-top slot-fr",
  "corner-top edge-front slot-fr", "corner-top edge-right slot-fr", "corner-front edge-right slot-fr",
  "corner-right edge-front slot-fr", "corner-slot edge-top slot-fr", "corner-top edge-slot slot-fr",
  "pair-wrong slot-fr", "trigger-front slot-fr", "trigger-right slot-fr",
];

const pllVisuals = {
  "pll-aa": "corners-cycle-cw",
  "pll-ab": "corners-cycle-ccw",
  "pll-e": "corners-diagonal",
  "pll-f": "adjacent-swap",
  "pll-ga": "g-block-right",
  "pll-gb": "g-block-front",
  "pll-gc": "g-block-left",
  "pll-gd": "g-block-back",
  "pll-h": "edges-opposite",
  "pll-ja": "j-left",
  "pll-jb": "j-right",
  "pll-na": "diagonal-pairs",
  "pll-nb": "diagonal-pairs-alt",
  "pll-ra": "r-right",
  "pll-rb": "r-left",
  "pll-t": "t-swap",
  "pll-ua": "edges-cycle-cw",
  "pll-ub": "edges-cycle-ccw",
  "pll-v": "v-diagonal",
  "pll-y": "y-diagonal",
  "pll-z": "edges-cross",
};

const algorithms = [
  { id: "f2l-1", stage: "F2L", name: "Базовая правая вставка", group: "Пара готова", alg: "U R U' R'", note: "Готовая пара стоит сверху. Поставь ее над правым передним слотом и вставь.", visual: "corner-top edge-top pair-ready slot-fr" },
  { id: "f2l-2", stage: "F2L", name: "Базовая левая вставка", group: "Пара готова", alg: "U' L' U L", note: "То же самое для левой руки: готовая пара вставляется в левый передний слот.", visual: "corner-top edge-top pair-ready slot-fl" },
  { id: "f2l-3", stage: "F2L", name: "Вставка через переднюю грань", group: "Пара готова", alg: "F' U' F", note: "Короткая вставка, когда пара удобнее заходит через переднюю грань.", visual: "corner-front edge-top pair-ready slot-fr" },
  { id: "f2l-4", stage: "F2L", name: "Разделить и вставить", group: "Связана неправильно", alg: "R U R' U' R U R'", note: "Пара склеена не той стороной. Сначала разъедини, потом вставь как обычную пару.", visual: "pair-wrong slot-fr" },
  { id: "f2l-5", stage: "F2L", name: "Разделить зеркально", group: "Связана неправильно", alg: "R U' R' U2 F' U' F", note: "Неправильно склеенная пара с другой стороны от слота.", visual: "pair-wrong slot-fl" },
  { id: "f2l-6", stage: "F2L", name: "Угол сверху, белый вверх", group: "Построить пару", alg: "R U2 R' U' R U R'", note: "Белая наклейка угла смотрит вверх. Цель — связать угол с ребром сверху.", visual: "corner-top edge-right slot-fr" },
  { id: "f2l-7", stage: "F2L", name: "Белый вверх, другой угол", group: "Построить пару", alg: "U R U2 R' U R U' R'", note: "Сначала подведи ребро, затем собери пару и вставь ее.", visual: "corner-top edge-front slot-fr" },
  { id: "f2l-8", stage: "F2L", name: "Ребро в слоте", group: "Достать элемент", alg: "R U' R' U y' R' U R", note: "Ребро застряло в слоте. Вытащи его наверх, не ломая уже собранное.", visual: "corner-top edge-slot slot-fr" },
  { id: "f2l-9", stage: "F2L", name: "Угол в слоте", group: "Достать элемент", alg: "R U R' U' R U R'", note: "Угол сидит внизу. Вытащи его наверх, потом собери пару нормально.", visual: "corner-slot edge-top slot-fr" },
  { id: "f2l-10", stage: "F2L", name: "Оба элемента в слоте", group: "Достать пару", alg: "R U' R' U' R U R' U2 R U' R'", note: "Оба элемента застряли неправильно. Сначала выведи их наверх.", visual: "corner-slot edge-slot pair-wrong slot-fr" },
  { id: "f2l-11", stage: "F2L", name: "Sledgehammer", group: "Триггер", alg: "R' F R F'", note: "Короткий триггер. Запомни движение как один жест, а не четыре отдельные буквы.", visual: "trigger-front slot-fr" },
  { id: "f2l-12", stage: "F2L", name: "Sexy move", group: "Триггер", alg: "R U R' U'", note: "Главный куберский триггер. Он часто строит и разрушает пары.", visual: "trigger-right slot-fr" },
  { id: "f2l-13", stage: "F2L", name: "Pair into back right", group: "Задний слот", alg: "y R U' R' U R U' R'", note: "Задний слот лучше развернуть к себе ходом y, затем работать привычно.", visual: "pair-ready slot-br" },
  { id: "f2l-14", stage: "F2L", name: "Pair into back left", group: "Задний слот", alg: "y' L' U L U' L' U L", note: "Зеркальная вставка в задний левый слот.", visual: "pair-ready slot-bl" },
  { id: "f2l-15", stage: "F2L", name: "F2L через U2", group: "Построить пару", alg: "U2 R U R' U R U' R'", note: "Пара требует длинного подвода верхом. Смотри на угол и ребро, слот серый до вставки.", visual: "corner-top edge-front slot-fr" },
  { id: "f2l-16", stage: "F2L", name: "F2L без перехвата", group: "Построить пару", alg: "U' R U' R' U2 R U' R'", note: "Настраиваешь верхний слой так, чтобы не перехватывать куб.", visual: "corner-right edge-top slot-fr" },
  { id: "f2l-17", stage: "F2L", name: "F2L через F-грань", group: "Достать элемент", alg: "U' R' F R F' R U' R'", note: "Полезный вариант, когда обычные R/U ходы дают плохой хват.", visual: "corner-front edge-slot slot-fr" },
  { id: "f2l-18", stage: "F2L", name: "Connected pair", group: "Связанные пары", alg: "y' R' U2 R U R' U' R", note: "Пара связана, но стоит неудобно. Доведи ее над слот и вставь.", visual: "pair-ready slot-fl" },
  { id: "f2l-19", stage: "F2L", name: "Disconnected pair", group: "Раздельные пары", alg: "U R U2 R' U R U' R'", note: "Угол и ребро отдельно сверху. Цель — сначала сделать из них пару.", visual: "corner-top edge-right slot-fr" },
  { id: "f2l-20", stage: "F2L", name: "Disconnected mirror", group: "Раздельные пары", alg: "y' U' R' U2 R U' R' U R", note: "То же, но с другой стороны. Следи не за всей верхушкой, а за двумя деталями.", visual: "corner-top edge-left slot-fl" },
  { id: "f2l-21", stage: "F2L", name: "Case 21", group: "Белый смотрит вверх", alg: "U2 R U R' U R U' R'", note: "Белая наклейка угла сверху. Дай углу встретиться с ребром, потом вставь.", visual: "corner-top edge-front slot-fr" },
  { id: "f2l-22", stage: "F2L", name: "Case 22", group: "Белый смотрит вверх", alg: "y' U2 R' U' R U' R' U R", note: "Зеркальный случай. Смотри на тот же принцип пары, а не на длинную строку букв.", visual: "corner-top edge-left slot-fl" },
  { id: "f2l-23", stage: "F2L", name: "Case 23", group: "Белый смотрит вверх", alg: "y' U R' U2 R y R U2 R' U R U' R'", note: "Сложный случай: разбей на подготовку пары и финальную вставку.", visual: "corner-top edge-back slot-fr" },
  { id: "f2l-24", stage: "F2L", name: "Case 24", group: "Белый смотрит вверх", alg: "U' R U2 R' y' R' U2 R U' R' U R", note: "Зеркало предыдущего. Не учи сразу быстро, сначала пойми путь пары.", visual: "corner-top edge-back slot-fl" },
  { id: "f2l-25", stage: "F2L", name: "Case 25", group: "Угол внизу, ребро сверху", alg: "U R U' R' d' L' U L", note: "Угол внизу, ребро сверху. Сначала достань угол в рабочую зону.", visual: "corner-slot edge-top slot-fr" },
  { id: "f2l-26", stage: "F2L", name: "Case 26", group: "Угол внизу, ребро сверху", alg: "d' L' U L d R U' R'", note: "Похожий случай с другим расположением слота.", visual: "corner-slot edge-left slot-fl" },
  { id: "f2l-27", stage: "F2L", name: "Case 27", group: "Угол внизу, ребро сверху", alg: "y' R' U' R U R' U' R", note: "Короткий случай: достал, связал, вставил.", visual: "corner-slot edge-front slot-fl" },
  { id: "f2l-28", stage: "F2L", name: "Case 28", group: "Угол внизу, ребро сверху", alg: "R U R' U' R U R'", note: "Зеркальная механика через привычный sexy move.", visual: "corner-slot edge-right slot-fr" },
  { id: "f2l-29", stage: "F2L", name: "Case 29", group: "Угол внизу, ребро сверху", alg: "R U' R' U R U' R'", note: "Пара почти готова, но требует перестройки верхом.", visual: "corner-front edge-top slot-fr" },
  { id: "f2l-30", stage: "F2L", name: "Case 30", group: "Угол внизу, ребро сверху", alg: "y' R' U R U' R' U R", note: "Зеркальная версия предыдущего случая.", visual: "corner-left edge-top slot-fl" },
  { id: "f2l-31", stage: "F2L", name: "Case 31", group: "Ребро внизу, угол сверху", alg: "U' R U' R' U2 R U' R'", note: "Ребро сидит внизу. Освободи его и собери пару сверху.", visual: "corner-top edge-slot slot-fr" },
  { id: "f2l-32", stage: "F2L", name: "Case 32", group: "Ребро внизу, угол сверху", alg: "U R U R' U2 R U R'", note: "То же, но верхний слой уводится в другую сторону.", visual: "corner-top edge-slot slot-fl" },
  { id: "f2l-33", stage: "F2L", name: "Case 33", group: "Ребро внизу, угол сверху", alg: "U' R U R' d R' U' R", note: "Выносит ребро из нижнего слоя и подготавливает вставку.", visual: "corner-right edge-slot slot-fr" },
  { id: "f2l-34", stage: "F2L", name: "Case 34", group: "Ребро внизу, угол сверху", alg: "d R' U' R d' R U R'", note: "Зеркальная логика: вытащи ребро и сразу свяжи пару.", visual: "corner-left edge-slot slot-fl" },
  { id: "f2l-35", stage: "F2L", name: "Case 35", group: "Ребро внизу, угол сверху", alg: "R U' R' d R' U R", note: "Короткий случай с d-ходом. Следи за ребром в слоте.", visual: "corner-front edge-slot slot-fr" },
  { id: "f2l-36", stage: "F2L", name: "Case 36", group: "Ребро внизу, угол сверху", alg: "R U R' U' R U R' U' R U R'", note: "Повторяющийся триггер: учи ритмом, а не отдельными буквами.", visual: "corner-right edge-slot slot-fr" },
  { id: "f2l-37", stage: "F2L", name: "Case 37", group: "Угол и ребро внизу", alg: "R U' R' U' R U R' U2 R U' R'", note: "Оба элемента внизу. Выведи их наверх, потом собирай пару.", visual: "corner-slot edge-slot slot-fr" },
  { id: "f2l-38", stage: "F2L", name: "Case 38", group: "Угол и ребро внизу", alg: "R U R' U2 R U' R' U R U R'", note: "Зеркальный вариант с другим направлением верхних ходов.", visual: "corner-slot edge-slot slot-fl" },
  { id: "f2l-39", stage: "F2L", name: "Case 39", group: "Угол и ребро внизу", alg: "R U' R' d R' U' R U' R' U' R", note: "Сложный случай: после d-хода смотри, как ребро выходит наверх.", visual: "corner-slot edge-slot pair-wrong slot-fr" },
  { id: "f2l-40", stage: "F2L", name: "Case 40", group: "Угол и ребро внизу", alg: "R U R' U' R U' R' U2 y' R' U' R", note: "Хорошо делится на знакомый триггер и финальную вставку.", visual: "corner-slot edge-slot pair-ready slot-fr" },
  { id: "f2l-41", stage: "F2L", name: "Case 41", group: "Угол и ребро внизу", alg: "R U' R' U y' R' U2 R U2 R' U R", note: "Последний стандартный F2L-случай. Оставь его после базовых пар.", visual: "corner-slot edge-slot pair-ready slot-fl" },

  { id: "oll-27", stage: "OLL", name: "Sune", group: "OCLL после креста", alg: "R U R' U R U2 R'", note: "Желтый крест готов. Один угол смотрит вверх, остальные надо развернуть.", pattern: "001111111", side: "front-right" },
  { id: "oll-26", stage: "OLL", name: "Anti-Sune", group: "OCLL после креста", alg: "R U2 R' U' R U' R'", note: "Зеркальный Sune. Держи единственный правильный угол с нужной стороны.", pattern: "100111111", side: "left-back" },
  { id: "oll-21", stage: "OLL", name: "H", group: "OCLL после креста", alg: "R U R' U R U' R' U R U2 R'", note: "На верхней грани нет готовых углов, но желтый крест уже собран.", pattern: "010111010", side: "all-sides" },
  { id: "oll-22", stage: "OLL", name: "Pi", group: "OCLL после креста", alg: "R U2 R2 U' R2 U' R2 U2 R", note: "Ищи две пары желтых боковых наклеек. Сверху крест остается готовым.", pattern: "000111000", side: "front-back" },
  { id: "oll-23", stage: "OLL", name: "Headlights", group: "OCLL после креста", alg: "R2 D R' U2 R D' R' U2 R'", note: "Две желтые наклейки на одной стороне выглядят как фары.", pattern: "101111101", side: "front" },
  { id: "oll-24", stage: "OLL", name: "Chameleon", group: "OCLL после креста", alg: "r U R' U' r' F R F'", note: "Два готовых угла стоят по диагонали. Остальные боковые наклейки важны для ориентации.", pattern: "101111010", side: "diagonal" },
  { id: "oll-25", stage: "OLL", name: "Bowtie", group: "OCLL после креста", alg: "F' r U R' U' r' F R", note: "Похож на бабочку: готовые углы тоже диагональные, но боковые наклейки другие.", pattern: "010111101", side: "diagonal-alt" },

  { id: "pll-aa", stage: "PLL", name: "Aa-perm", group: "Углы", alg: "x R' U R' D2 R U' R' D2 R2 x'", note: "Переставляет три угла. Смотри на угловые блоки, ребра не главное.", visual: pllVisuals["pll-aa"] },
  { id: "pll-ab", stage: "PLL", name: "Ab-perm", group: "Углы", alg: "x R2 D2 R U R' D2 R U' R x'", note: "Обратное направление трех углов.", visual: pllVisuals["pll-ab"] },
  { id: "pll-e", stage: "PLL", name: "E-perm", group: "Углы", alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", note: "Диагональная перестановка углов. Ищи отсутствие готового блока.", visual: pllVisuals["pll-e"] },
  { id: "pll-f", stage: "PLL", name: "F-perm", group: "Углы и ребра", alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", note: "Меняет соседнюю пару углов и ребер. Готовый блок помогает узнать случай.", visual: pllVisuals["pll-f"] },
  { id: "pll-ga", stage: "PLL", name: "Ga-perm", group: "G perms", alg: "R2 U R' U R' U' R U' R2 D U' R' U R D'", note: "У G-perm всегда есть маленький блок. Начинай с поиска блока.", visual: pllVisuals["pll-ga"] },
  { id: "pll-gb", stage: "PLL", name: "Gb-perm", group: "G perms", alg: "R' U' R U D' R2 U R' U R U' R U' R2 D", note: "Тот же тип, но блок стоит в другом месте.", visual: pllVisuals["pll-gb"] },
  { id: "pll-gc", stage: "PLL", name: "Gc-perm", group: "G perms", alg: "R2 U' R U' R U R' U R2 D' U R U' R' D", note: "Следи за D-ходом и расположением готового блока.", visual: pllVisuals["pll-gc"] },
  { id: "pll-gd", stage: "PLL", name: "Gd-perm", group: "G perms", alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'", note: "Последний G-случай. Визуально отличается положением блока.", visual: pllVisuals["pll-gd"] },
  { id: "pll-h", stage: "PLL", name: "H-perm", group: "Только ребра", alg: "M2 U M2 U2 M2 U M2", note: "Меняет противоположные ребра. Углы уже стоят правильно.", visual: pllVisuals["pll-h"] },
  { id: "pll-ja", stage: "PLL", name: "Ja-perm", group: "J perms", alg: "x R2 F R F' R U2 r' U r U2", note: "Меняет соседние углы и соседние ребра. Ищи длинный готовый блок.", visual: pllVisuals["pll-ja"] },
  { id: "pll-jb", stage: "PLL", name: "Jb-perm", group: "J perms", alg: "R U R' F' R U R' U' R' F R2 U' R'", note: "Очень частый PLL. Готовый блок держи слева или сзади по выбранной формуле.", visual: pllVisuals["pll-jb"] },
  { id: "pll-na", stage: "PLL", name: "Na-perm", group: "N perms", alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", note: "Две диагональные пары. Готовых соседних блоков почти нет.", visual: pllVisuals["pll-na"] },
  { id: "pll-nb", stage: "PLL", name: "Nb-perm", group: "N perms", alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R", note: "Зеркальный N-случай.", visual: pllVisuals["pll-nb"] },
  { id: "pll-ra", stage: "PLL", name: "Ra-perm", group: "R perms", alg: "R U' R' U' R U R D R' U' R D' R' U2 R'", note: "Соседние блоки и один D-ход. Узнается по двум связанным участкам.", visual: pllVisuals["pll-ra"] },
  { id: "pll-rb", stage: "PLL", name: "Rb-perm", group: "R perms", alg: "R2 F R U R U' R' F' R U2 R' U2 R", note: "Зеркало Ra. Проверяй, где стоит готовый блок.", visual: pllVisuals["pll-rb"] },
  { id: "pll-t", stage: "PLL", name: "T-perm", group: "Углы и ребра", alg: "R U R' U' R' F R2 U' R' U' R U R' F'", note: "Один из главных PLL: один угол и одно ребро меняются соседне.", visual: pllVisuals["pll-t"] },
  { id: "pll-ua", stage: "PLL", name: "Ua-perm", group: "Только ребра", alg: "R U' R U R U R U' R' U' R2", note: "Цикл трех ребер по верхнему слою. Углы уже правильные.", visual: pllVisuals["pll-ua"] },
  { id: "pll-ub", stage: "PLL", name: "Ub-perm", group: "Только ребра", alg: "R2 U R U R' U' R' U' R' U R'", note: "Обратный цикл трех ребер.", visual: pllVisuals["pll-ub"] },
  { id: "pll-v", stage: "PLL", name: "V-perm", group: "Углы и ребра", alg: "R' U R' U' y R' F' R2 U' R' U R' F R F", note: "Диагональные углы плюс ребра. Ищи один крупный готовый блок.", visual: pllVisuals["pll-v"] },
  { id: "pll-y", stage: "PLL", name: "Y-perm", group: "Углы и ребра", alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'", note: "Диагональная перестановка углов и соседних ребер.", visual: pllVisuals["pll-y"] },
  { id: "pll-z", stage: "PLL", name: "Z-perm", group: "Только ребра", alg: "M' U M2 U M2 U M' U2 M2", note: "Меняет две пары соседних ребер. Углы уже стоят на местах.", visual: pllVisuals["pll-z"] },
];

algorithms.forEach((item, index) => {
  if (item.stage === "F2L" && !item.visual) {
    item.visual = f2lVisuals[index % f2lVisuals.length];
  }
});

const state = {
  filter: "all",
  query: "",
  selectedId: "f2l-1",
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
const studyPanel = document.querySelector("#studyPanel");
const jumpLinks = document.querySelectorAll("[data-jump-filter]");

function saveFavorites() {
  localStorage.setItem("cfop-favorites", JSON.stringify([...state.favorites]));
}

function tokenize(alg) {
  return alg.split(/\s+/).filter(Boolean);
}

function colorForFace(face) {
  return {
    top: "yellow",
    right: "red",
    left: "green",
    front: "blue",
    back: "orange",
    bottom: "white",
  }[face] || "neutral";
}

function cubeStickers(face, activeFace, mode = "") {
  return Array.from({ length: 9 })
    .map((_, index) => {
      const important = activeFace === face || mode.includes(`${face}-${index}`);
      const center = index === 4;
      return `<i class="${important ? "important" : ""} ${center ? "center" : ""} ${important ? colorForFace(face) : ""}"></i>`;
    })
    .join("");
}

function moveCube(face, arrow) {
  const active = face === "wide" || face === "middle" || face === "whole" ? "right" : face;
  return `
    <div class="move-cube face-${face}">
      <div class="cube-face cube-top">${cubeStickers("top", active)}</div>
      <div class="cube-face cube-left">${cubeStickers("left", active)}</div>
      <div class="cube-face cube-right">${cubeStickers("right", active)}</div>
      <div class="move-arrow arrow-${arrow}" aria-hidden="true"></div>
      ${face === "wide" ? '<div class="slice-highlight wide"></div>' : ""}
      ${face === "middle" ? '<div class="slice-highlight middle"></div>' : ""}
      ${face === "whole" ? '<div class="whole-turn">⟳</div>' : ""}
    </div>
  `;
}

function renderNotation() {
  notationGrid.innerHTML = notation
    .map(
      (item) => `
        <article class="notation-card">
          ${moveCube(item.face, item.arrow)}
          <div class="notation-copy">
            <span class="move-badge">${item.move}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function llPatternCube(item) {
  const pattern = item.pattern || "111111111";
  const sides = {
    "front-right": ["front-0", "right-2", "right-8"],
    "left-back": ["left-0", "left-6", "back-2"],
    "all-sides": ["front-0", "front-2", "left-0", "right-2"],
    "front-back": ["front-0", "front-2", "left-6", "right-8"],
    front: ["front-0", "front-2"],
    diagonal: ["front-2", "right-8"],
    "diagonal-alt": ["left-0", "front-2"],
  }[item.side] || [];

  return `
    <div class="case-visual ll-visual" aria-label="Верхний слой кубика">
      <div class="ll-top">
        ${[...pattern].map((cell) => `<span class="${cell === "1" ? "yellow" : "dim"}"></span>`).join("")}
      </div>
      <div class="ll-sides">
        ${["left", "front", "right"].map((face) => `
          <div class="ll-side ${face}">
            ${Array.from({ length: 3 })
              .map((_, index) => `<span class="${sides.includes(`${face}-${index}`) ? "yellow" : "dim"}"></span>`)
              .join("")}
          </div>
        `).join("")}
      </div>
      <div class="visual-caption">Серое неважно. Желтое показывает, куда смотрят наклейки.</div>
    </div>
  `;
}

function f2lCube(item) {
  const visual = item.visual || "";
  const slot = visual.includes("slot-fl") ? "fl" : visual.includes("slot-br") ? "br" : visual.includes("slot-bl") ? "bl" : "fr";
  return `
    <div class="case-visual f2l-visual slot-${slot}" aria-label="F2L случай">
      <div class="training-cube">
        <div class="cube-face cube-top">${cubeStickers("top", "none", visual)}</div>
        <div class="cube-face cube-left">${cubeStickers("left", "none", visual)}</div>
        <div class="cube-face cube-right">${cubeStickers("right", "none", visual)}</div>
        <b class="piece corner ${visual.includes("corner-slot") ? "in-slot" : visual.includes("corner-left") ? "left-pos" : visual.includes("corner-front") ? "front-pos" : visual.includes("corner-right") ? "right-pos" : "top-pos"}"></b>
        <b class="piece edge ${visual.includes("edge-slot") ? "in-slot" : visual.includes("edge-left") ? "left-pos" : visual.includes("edge-front") ? "front-pos" : visual.includes("edge-right") ? "right-pos" : visual.includes("edge-back") ? "back-pos" : "top-pos"}"></b>
        <b class="slot-marker"></b>
      </div>
      <div class="legend-row">
        <span><i class="corner-dot"></i> угол</span>
        <span><i class="edge-dot"></i> ребро</span>
        <span><i class="slot-dot"></i> слот</span>
      </div>
    </div>
  `;
}

function pllCube(item) {
  const visual = item.visual || "";
  const arrows = {
    "edges-cycle-cw": "↻",
    "edges-cycle-ccw": "↺",
    "corners-cycle-cw": "↻",
    "corners-cycle-ccw": "↺",
    "edges-opposite": "↔",
    "edges-cross": "↕",
    "corners-diagonal": "⤫",
    "diagonal-pairs": "⤫",
    "diagonal-pairs-alt": "⤫",
    "t-swap": "T",
  };

  return `
    <div class="case-visual pll-visual ${visual}" aria-label="PLL перестановка">
      <div class="pll-board">
        ${Array.from({ length: 12 })
          .map((_, index) => `<span class="perm-piece p${index}"></span>`)
          .join("")}
        <strong>${arrows[visual] || "⇄"}</strong>
      </div>
      <div class="visual-caption">Желтый верх уже собран. Цветные элементы показывают, что меняется местами.</div>
    </div>
  `;
}

function visualFor(item) {
  if (item.stage === "OLL") return llPatternCube(item);
  if (item.stage === "PLL") return pllCube(item);
  return f2lCube(item);
}

function algorithmTokens(item) {
  return `<div class="algorithm" aria-label="Алгоритм">${tokenize(item.alg)
    .map((token, index) => `<span class="token ${index === 0 ? "first" : ""}">${token}</span>`)
    .join("")}</div>`;
}

function cardTemplate(item, compact = false) {
  const favorite = state.favorites.has(item.id);
  const stageClass = item.stage.toLowerCase();
  return `
    <article class="algo-card ${state.selectedId === item.id ? "selected" : ""}" data-id="${item.id}">
      <div class="card-top">
        <div>
          <span class="stage-tag ${stageClass}">${item.stage} · ${item.group}</span>
          <h3>${item.name}</h3>
        </div>
        <button class="fav-button ${favorite ? "active" : ""}" data-fav="${item.id}" title="В избранное" aria-label="В избранное">${favorite ? "★" : "☆"}</button>
      </div>
      ${visualFor(item)}
      <p>${item.note}</p>
      ${algorithmTokens(item)}
      ${
        compact
          ? ""
          : `<div class="card-actions">
              <button class="copy-button" data-copy="${item.alg}">Копировать</button>
              <button class="study-button" data-study="${item.id}">Изучить крупно</button>
            </div>`
      }
    </article>
  `;
}

function studyTemplate(item) {
  return `
    <article class="study-card">
      <div>
        <span class="stage-tag ${item.stage.toLowerCase()}">${item.stage} · ${item.group}</span>
        <h3>${item.name}</h3>
        <p>${item.note}</p>
      </div>
      ${visualFor(item)}
      <div>
        <p class="study-label">Формула</p>
        ${algorithmTokens(item)}
      </div>
      <div class="study-hint">
        <strong>Как смотреть:</strong>
        <span>${item.stage === "F2L" ? "ищи только угол, ребро и нужный слот; все серое игнорируй." : item.stage === "OLL" ? "желтый крест уже готов; сравни только углы и боковые желтые наклейки." : "верх полностью желтый; смотри на перестановку боковых элементов."}</span>
      </div>
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

function renderStudyPanel() {
  const item = algorithms.find((candidate) => candidate.id === state.selectedId) || algorithms[0];
  studyPanel.innerHTML = studyTemplate(item);
}

function renderAlgorithms() {
  const list = filteredAlgorithms();
  if (list.length && !list.some((item) => item.id === state.selectedId)) {
    state.selectedId = list[0].id;
  }
  renderStats(list);
  algorithmGrid.innerHTML = list.length
    ? list.map((item) => cardTemplate(item)).join("")
    : `<p class="empty-state">Ничего не найдено. Попробуй другой запрос или фильтр.</p>`;
  renderStudyPanel();
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
  const studyButton = event.target.closest("[data-study]");
  const card = event.target.closest(".algo-card[data-id]");

  if (copyButton) {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyButton.textContent = "Скопировано";
    setTimeout(() => {
      copyButton.textContent = "Копировать";
    }, 1200);
    return;
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
    return;
  }

  if (studyButton || card) {
    state.selectedId = studyButton?.dataset.study || card.dataset.id;
    renderAlgorithms();
    document.querySelector("#study")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

jumpLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.jumpFilter;
    const button = document.querySelector(`[data-filter="${filter}"]`);
    if (button) {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.filter = filter;
      state.query = "";
      searchInput.value = "";
      renderAlgorithms();
    }
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
