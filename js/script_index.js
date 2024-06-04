"use strict";

let appData = {
  budget: null,
  timeData: null,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
  addSavings: function (savingData) {
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
      $("#addSaving").get(0).reset("input");
      appData.monthInCome = ((sum / 100 / 12) * percent).toFixed(2);
      console.log(appData.monthInCome);

      $("#openedSaving").val("Доход в месяц: " + appData.monthInCome);
      showEl("#openedSaving", 1);
    }
  },
};

let showEl = function (elem, show) {
  const displayValue = show === 0 ? "none" : show === 1 ? "flex" : "block";
  $(elem).css("display", displayValue);
};

$(document).ready(function () {
  $("#budget").on("submit", function (e) {
    e.preventDefault();
    const money = parseFloat($("#money").val()); // PARSEFLOAT
    const time = $("#time").val();

    if (isNaN(money)) {
      throw new Error("Money must be a number");
    }

    appData.budget = money;
    appData.timeData = time;
    console.log(appData);
    $("#money").val("");
    $("#time").val("");
    let perDay = parseFloat((money / 30).toFixed(2));
    appData.perDay = perDay; // tofixed - returns STRING, parse Float for float type
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

  let checkSavings = function () {
    if (appData.savings === false) {
      console.log(0);
      showEl("#notif", 1);
    } else {
      console.log(1);
      showEl("#notif", 0);
    }
  };

  checkSavings();

  $(".choose").click(function () {
    if ($(this).val() == 0) {
      checkSavings();
      showEl("#savings", 0);
      // ПРОВЕРКА ЗНАЧЕНИЯ НАЖАТОЙ КНОПКИ
    } else {
      appData.savings = true;
      checkSavings();
      showEl("#openSavings", 1);
      showEl("#buttons", 0);
    }
  });

  $("#addSaving").submit(function (e) {
    e.preventDefault();
    const savingData = $(this).serializeArray(); // ПОЛУЧЕНИЕ ДАННЫХ В ВИДЕ МАССИВА ARRAY[INDEX].VALUE/NAME
    console.log(savingData);
    appData.addSavings(savingData);
  });

  let numExpenses = 0;
  $("#optExpenses").submit(function (e) {
    e.preventDefault();
    const expenses = $(this).serializeArray();
    console.log(expenses);
    const exps = expenses[0].value;
    if (typeof exps === null || exps == "") {
      $("#optExpenses").get(0).reset("input");
      alert("Введены некорректные данные или они отсутствуют");
    } else {
      numExpenses++;
      appData.optionalExpenses[numExpenses] = exps;
      console.log(appData.optionalExpenses);
      $("#optExpenses").get(0).reset("input");
      $("#addedOptExpenses").css("display", "flex");
      $("#addedOptExpenses").val("Добавлены " + exps + " в доп. расходы.");
    }
  });

  $(".add_income").click(function () {
    showEl("#add_income", 0);
    if ($(this).val() == 0) {
      console.log("Не добавлены новые расходы");
    } else {
      console.log("Добавлены новые расходы");
      showEl("#income", 1);
    }
  });

  $("#chooseIncome").submit(function (e) {
    e.preventDefault();
    const incomes = $(this).serializeArray();
    const answer = incomes[0].value;
    let tmp = parseFloat(answer);
    if (Number(tmp) || answer.length == 0) {
      console.log("неверный ввод");
    } else {
      appData.income.push(answer);
      console.log(appData.income);
      $("#chooseIncome").get(0).reset("input");
      let incomes = "";
      $.each(appData.income, function (index, income) {
        incomes = incomes + "[" + (index + 1) + "] " + income;
        if (index != appData.income.length - 1) {
          incomes = incomes + "<br/>";
        }
      });
      $("#income_added").html(incomes);
    }
  });

  $("#getAppData").click(function () {
    let appdata = "";
    for (let [key, value] of Object.entries(appData)) {
      if (typeof value === "object" && value !== null) {
        appdata += `${key}: `;
        for (let [key1, value1] of Object.entries(value)) {
          appdata += `${key1}: ${value1}; `;
        }
        appdata += "<br/>";
      } else if (typeof value === "array") {
        appdata += `${key}: `;
        for (let i = 0; i < value.length; i++) {
          appdata += `${value[i]} `;
        }
        appdata += "<br/>";
      } else if (typeof value !== "function") {
        appdata += `${key}: ${value}<br/>`;
      }
    }
    $("#appdata").html(appdata);
  });
});
