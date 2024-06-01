"use strict";

class UserBudget {
  constructor(money, time) {
    if (typeof money !== "number" || typeof time !== "string") {
      // TYPEOF
      throw new TypeError("Both arguments must be of type number and string");
    }
    this.money = money;
    this.time = time;
  }
}

let appData = {
  budget: null,
  timeData: null,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};

$(document).ready(function () {
  $("#budget").on("submit", function (e) {
    e.preventDefault();
    const money = parseFloat($("#money").val()); // PARSEFLOAT
    const time = $("#time").val();

    if (isNaN(money)) {
      throw new Error("Money must be a number");
    }

    const userBudget = new UserBudget(money, time);
    console.log(userBudget);
    appData.budget = userBudget.money;
    appData.timeData = userBudget.time;
    console.log(appData);
    $("#money").val("");
    $("#time").val("");
    appData.perDay = parseFloat((money / 30).toFixed(2)); // tofixed - returns STRING, parse Float for float type
    $("#oneday").val(`Ваш бюджет на 1 день: ${appData.perDay}`);
    if (perDay < 100) {
      $("#moneystatus").val(`Ваш достаток беден.`);
    } else if (perDay > 100 && perDay < 2000) {
      $("#moneystatus").val(`Ваш достаток средний.`);
    } else if (perDay > 2000) {
      $("#moneystatus").val(`Ваш достаток богат.`);
    } else {
      alert("Произошла непредвиденная ошибка.");
    }
  });

  $("#months").on("submit", "form", function (e) {
    e.preventDefault();
    const month = $(this).find("input[name=month]").val();
    const money = parseFloat($(this).find("input[name=money]").val());
    if (!isNaN(money)) {
      appData.expenses[month] = money; // ADD TO OBJECT
      console.log(appData.expenses);
    } else {
      $(this).find("input[name=month]").val("");
      $(this).find("input[name=money]").val("");
      alert("Введены некорректные данные или они отсутствуют");
    }
  });

  if (appData.savings == 0) {
    // ЕСЛИ СОХРАНЕНИЙ НЕТ ТО ПРЕДЛОЖИТЬ ДОБАВИТЬ ИХ
    console.log(appData.savings);
    $("#savings").css({
      display: "flex", // ОТКРЫТЬ ЗАПРОС НА ДОБАВЛЕНИЕ
    });
  }
  $(".choose").click(function () {
    if ($(this).val() == 0) {
      // ПРОВЕРКА ЗНАЧЕНИЯ НАЖАТОЙ КНОПКИ
      $("#savings").css("display", "none");
    } else {
      appData.savings = true;
      console.log(appData.savings);
      $("#openSavings").css({
        display: "flex", // ОТКРЫТЬ ДОБАВЛЕНИЕ СОХРАНЕНИЙ
      });
      $("#buttons").css("display", "none"); // УБРАТЬ КНОПКИ ЧТОБ НЕ МЕШАЛИСЬ
    }
  });

  $("#addSaving").submit(function (e) {
    e.preventDefault();
    const savingData = $(this).serializeArray(); // ПОЛУЧЕНИЕ ДАННЫХ В ВИДЕ МАССИВА ARRAY[INDEX].VALUE/NAME
    console.log(savingData);
    $.each(savingData, function (index, value) {
      console.log(value.name + ": " + value.value);
    });
    const sum = parseFloat(savingData[0].value);
    const percent = parseFloat(savingData[1].value);
    if (
      sum === null ||
      percent === null ||
      sum <= 0 ||
      percent <= 0 ||
      percent >= 100 ||
      isNaN(sum) ||
      isNaN(percent)
    ) {
      $("#addSaving").get(0).reset("input");
      console.log("ERROR in #" + $("#addSaving").attr("id"));
      alert("Неправильно введены данные. Перепроверьте для заполнения.");
    } else {
      appData.monthInCome = ((sum / 100 / 12) * percent).toFixed(2);
      console.log(appData.monthInCome);
      $("#openedSaving").css({
        display: "flex",
      });
      $("#openedSaving").val("Доход в месяц: " + appData.monthInCome);
    }
  });
});
