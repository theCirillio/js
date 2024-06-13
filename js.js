"use strict";

const words = {
  Существа:
    "враг;монстр;группа врагов;сильный враг;опасный враг;опустошенный;пилигрим;заключенный;чудовище;скелет;призрак;зверь;ящерица;жук;личинка;краб;карлик;гигант;демон;дракон;рыцарь;наемник;воин;глашатай;бандит;убийца;чародей;пиромант;клирик;нищий;стрелок;двое;трое;ты;ты, гад;ваше благородие;святой;обезображенный;чародeй;несчастная душа;чудак;ловкач;увалень;богач;нищий;еретик;лжец;толстяк;верзила;юноша;старец;старый чудак;старуха;торговец;ремесленник;мастер;мудрец;чемпион;повелитель пепла;король;королева;принц;принцесса;ангел;бог;друг;союзник;супруг;участник ковенанта;фантом;темный дух".split(
      ";"
    ),

  Объекты:
    "костер;уголь;стена тумана;рычаг;устройство;ключ;ловушка;факел;дверь;клад;сундук;нечто;нечто потрясающее;мусор;грязь;оружие;щит;снаряд;доспехи;предмет;кольцо;руда;угoль;транспозиционная печь;свиток;чей-то пепел;трон;ритуал;гроб;зола;пепел;луна;зрачок;спиртное;суп;послание;кровавое пятно;иллюзия".split(
      ";"
    ),

  Техники:
    "ближний бой;дальний бой;уничтожать по одному;выманить;жестокое избиение;атаковать из засады;зажать в клещи;атаковать всех с налета;оружие в каждой руке;скрытность;мимикрия;бегство;броситься в атаку;спрыгнуть;прорваться;движение по кругу;заточение;спасение;навык;чары;пиромантия;чудеса;чистая удача;благоразумие;краткая передышка;притвориться мертвым".split(
      ";"
    ),

  Действия:
    "толчок;рывок;перекат;отскок;прыжок;атаковать;атаковать в прыжке;атаковать в рывке;контратаковать;удар в спину;оглуш. при защите и удар;удар в падении;сметающая атака;пробить щит;блок;парирование;захватить цель;без захвата цели;двуручное;жест;управление;уничтожить".split(
      ";"
    ),

  География:
    "булыжник;лава;ядовитый газ;орда врагов;лес;болото;пещера;короткий путь;обход;тайная тропа;короткий пyть;тупик;лабиринт;дыра;светлое место;темное место;простор;теснина;безопасная зона;опасная зона;позиция для стрельбы;укрытие;призрачная стена;лестница;подъемник;роскошный вид;взгляд в сторону;самоуверенность;промах;упущение;утомление;невезение;невнимательность;потеря выносливости;случайная встреча;ожидаемая встреча".split(
      ";"
    ),

  Ориентация: "вперед;назад;влево;вправо;вверх;вниз;внизу;наверху;сзади".split(
    ";"
  ),

  "Части тела":
    "голова;шея;живот;спина;рука;палец;нога;зад;хвост;крылья;все;язык;правая рука;левая рука;большой палец;указательный палец;средний палец;безымянный палец;мизинец;правая нога;левая нога;правая сторона;левая сторона;клешня;колесо;центр;всадник".split(
      ";"
    ),

  Характеристики:
    "обычный удар;дробящий удар;колющий удар;рубящий удар;магия;кристалл;огонь;хаос;молния;благословение;тьма;критические удары;кровотечение;яд;токсин;мороз;проклятие;поломка снаряжения".split(
      ";"
    ),

  Понятия:
    "шанс;затруднение;совет;секрет;сонный бред;счастье;неудача;жизнь;смерть;погибель;ярость;радость;агония;печаль;слезы;преданность;вероломство;надежда;отчаяние;страх;помешательство;победа;поражение;жертва;свет;тьма;смелость;уверенность;жизненная сила;месть;смирение;ошеломление;сожаление;бесцельность;мужчина;женщина;дружба;любовь;безрассудство;спокойствие;сила духа;удобство;тишина;глубина;отбросы".split(
      ";"
    ),

  Размышления:
    "удачи;отлично;получилось;не вышло;сюда;не сюда;это невыносимо;одиноко...;не смей;действуй;смотри внимательно;слушай внимательно;подумай хорошенько;снова это место;теперь начнется сражение;ты этого не заслуживаешь;не останавливайся;отступи;сдавайся;не сдавайся;помогите;невозможно;чертовски дорого;выпустите меня отсюда;сохраняй спокойствие;словно во сне;выглядит знакомым...;ты готов;это случится и с тобой;восславь Солнце;да осветит пламя твой путь".split(
      ";"
    ),
};

const temps =
  "впереди ***;впереди отсутствует ***;впереди требуется ***;осторожно: ***;может помочь ***;может быть, это ***?;будь у меня ***...;видение — ***...;время пришло — ***...;***;***!;***?;***...;ха, это ***...;слава, ***!;да будет ***;ах, ***...".split(
    ";"
  );

const conjs =
  "и тогда;но;так что;короче;или;только;кстати;так сказать;тем более;,".split(
    ";"
  );

const selectTemp = $(".temps");
const selectWords = $(".words");
const selectConjs = $("#conjs");

const changeFormat = $("#changeFormat");

const wordMenu = $("#word-menu");
const leftWords = $(".menu-left");
const rightWords = $(".menu-right");

const tempMenu = $("#temp-menu");

const conjsMenu = $("#conjs-menu");

const createMsg = document.querySelector("#create-msg");

const bg = $("<div></div>");
$(bg).attr("id", "bg");

$.each(selectTemp, function () {
  $(this).click(function (e) {
    e.preventDefault();

    let inputTemp = this;
    $("body").append(bg);

    $(bg).click(function () {
      $(tempMenu).fadeOut(0, function () {
        $(menuList).text("");
        bg.remove();
      });
    });

    $(tempMenu).css("display", "flex");
    const menuList = $(tempMenu).find(".menu-list");
    menuList.text("");
    temps.forEach((element) => {
      let input = $("<input/>");
      input.attr("type", "button");
      input.val(element);
      menuList.append(input);
      $(input).click(function () {
        $(inputTemp).val($(input).val());
        $(tempMenu).fadeOut(0, function () {
          $(menuList).text("");
          $(bg).remove();
        });
      });
    });
  });
});

$.each(selectWords, function () {
  $(this).click(function (e) {
    e.preventDefault();

    let inputWord = this;

    $("body").append(bg);

    $(bg).click(function () {
      $(wordMenu).fadeOut(0, function () {
        $(rightWords).text("");
        bg.remove();
      });
    });

    $(wordMenu).css("display", "flex");
    leftWords.text("");
    for (const type in words) {
      let input = $("<input/>");
      input.attr("type", "button");
      input.val(type);
      leftWords.append(input);
      $(input).click(function () {
        $(rightWords).css({ display: "flex" });
        $(rightWords).text("");
        let wordsOfType = words[type];
        wordsOfType.forEach((element) => {
          let input = $("<input/>");
          input.attr("type", "button");
          input.val(element);
          rightWords.append(input);
          $(input).click(function () {
            $(inputWord).val($(input).val());
            $(wordMenu).fadeOut(0, function () {
              $(rightWords).text("");
              $(bg).remove();
            });
          });
        });
      });
    }
  });
});

$(selectConjs).click(function (e) {
  e.preventDefault();

  $("body").append(bg);

  $(bg).click(function () {
    $(conjsMenu).fadeOut(0, function () {
      $(menuList).text("");
      bg.remove();
    });
  });

  $(conjsMenu).css("display", "flex");
  const menuList = $(conjsMenu).find(".menu-list");
  menuList.text("");
  conjs.forEach((element) => {
    let input = $("<input/>");
    input.attr("type", "button");
    input.val(element);
    menuList.append(input);
    $(input).click(function () {
      $(selectConjs).val($(input).val());
      $(conjsMenu).fadeOut(0, function () {
        $(menuList).text("");
        $(bg).remove();
      });
    });
  });
});

let format = 0;
$(changeFormat).click(function () {
  if (format == 0) {
    $(".add-body").css("display", "flex");
    format = 1;
  } else {
    $(".add-body").css("display", "none");
    format = 0;
    $(selectWords[1]).val("");
    $(selectTemp[1]).val("");
    $(selectConjs).val("");
  }
});

const tmps = document.querySelectorAll(".temps");
const wrds = document.querySelectorAll(".words");
const cnjs = document.querySelector("#conjs");

createMsg.setAttribute("disabled", "true");

document.addEventListener("click", function () {
  if (format === 0 && tmps[0].value !== "" && wrds[0].value !== "") {
    createMsg.removeAttribute("disabled");
  } else if (
    format === 1 &&
    tmps[0].value !== "" &&
    wrds[0].value !== "" &&
    tmps[1].value !== "" &&
    wrds[1].value !== "" &&
    cnjs.value != ""
  ) {
    createMsg.removeAttribute("disabled");
  } else {
    createMsg.setAttribute("disabled", "true");
  }
});

function check() {}
createMsg.addEventListener("click", function () {
  let msg = "";

  if (format == 0) {
    let tmp = tmps[0].value;
    tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
    msg += tmp.replace(/\*/, wrds[0].value);
    msg = msg.replace(/\*/g, "");

    $("#msg").val(msg);
    $("#msg").fadeIn();
    console.log(msg);
  } else {
    let tmp = tmps[0].value;
    tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
    msg += tmp.replace(/\*/, wrds[0].value);
    if (cnjs.value != ",") {
      msg += `\n` + cnjs.value + " ";
    } else {
      msg += cnjs.value + `\n `;
    }

    tmp = tmps[1].value;
    tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
    msg += tmp.replace(/\*/, wrds[1].value);
    msg = msg.replace(/\*/g, "");

    $("#msg").val(msg);
    $("#msg").fadeIn();
    console.log(msg);
  }
});
