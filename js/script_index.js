"use strict";

// Объявление глобального объекта с данными
let appData = {
  budget: null, // денег
  timeData: null, // время
  expenses: {}, // расходы
  optionalExpenses: {}, // дополнительные расходы
  income: [], // доходы
  savings: false, // сохраненные
};

// Когда документ готов к запуску
$(document).ready(function () {
  // Форма ввода бюджета
  $("#budget").on("submit", function (e) {
    // обработчик события отправки формы
    e.preventDefault(); // предотвращаем стандартное поведение формы

    const money = parseFloat($("#money").val()); // преобразование значения в число
    const time = $("#time").val();

    if (isNaN(money)) {
      // проверка на корректность введенных данных
      throw new Error("Деньги должны быть числом"); // выбрасываем исключение, если введен не числовой тип
    }

    appData.budget = money; // сохранение денег в глобальном объекте
    appData.timeData = time; // сохранение времени в глобальном объекте
    console.log(appData); // выводим содержимое глобального объекта в консоль
    $("#money").val(""); // очищаем поле ввода с денежными суммами
    $("#time").val(""); // очищаем поле ввода с временем
    appData.perDay = parseFloat((money / 30).toFixed(2)); // расчет дневного бюджета
    $("#oneday").val(`Ваш бюджет на 1 день: ${appData.perDay}`); // выводим результат на страницу

    // Вывод сообщения о достатке
    if (appData.perDay < 100) {
      $("#moneystatus").val(`Ваш достаток беден.`); // выводим сообщение о бедности
    } else if (appData.perDay > 100 && appData.perDay < 2000) {
      $("#moneystatus").val(`Ваш достаток средний.`); // выводим сообщение о среднем достатке
    } else if (appData.perDay > 2000) {
      $("#moneystatus").val(`Ваш достаток богат.`); // выводим сообщение о богатстве
    } else {
      alert("Произошла непредвиденная ошибка."); // выводим сообщение об ошибке
    }
  });

  // Форма ввода расходов
  $("#months").on("submit", "form", function (e) {
    // обработчик события отправки формы
    e.preventDefault(); // предотвращаем стандартное поведение формы

    const month = $(this).find("input[name=month]").val(); // выбор месяца
    const money = parseFloat($(this).find("input[name=money]").val()); // выбор расходов

    if (!isNaN(money)) {
      // проверка на корректность введенных данных
      appData.expenses[month] = money; // сохранение расходов в глобальном объекте
      console.log(appData.expenses); // выводим содержимое объекта в консоль
    } else {
      $(this).find("input[name=month]").val(""); // очищаем поле ввода с месяцем
      $(this).find("input[name=money]").val(""); // очищаем поле ввода с расходами
      alert("Введены некорректные данные или они отсутствуют"); // выводим сообщение об ошибке
    }
  });

  // Предложение добавить сохраненные
  if (appData.savings == 0) {
    console.log(appData.savings);
    $("#savings").css({
      display: "flex", // отображение предложения добавить сохраненные
    });
  }

  // Выбор действий с сохраненными
  $(".choose").click(function () {
    if ($(this).val() == 0) {
      // если выбран вариант "нет"
      $("#savings").css("display", "none"); // скрываем предложение добавить сохраненные
    } else {
      appData.savings = true; // сохраняем в глобальном объекте
      console.log(appData.savings);
      $("#openSavings").css({
        display: "flex", // отображение формы добавления сохраненных
      });
      $("#buttons").css("display", "none"); // скрываем кнопки
    }
  });

  // Добавление сохраненных
  $("#addSaving").submit(function (event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    const sum = parseFloat($("#sum").val()); // сумма
    const percent = parseFloat($("#percent").val()); // процент

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
      console.log("ОШИБКА в #" + $("#addSaving").attr("id"));
      alert("Неправильно введены данные. Перепроверьте для заполнения.");
    } else {
      $("#addSaving").get(0).reset("input");
      appData.monthInCome = ((sum / 100 / 12) * percent).toFixed(2); // расчет ежемесячного дохода
      console.log(appData.monthInCome);
      $("#openedSaving").css({
        display: "flex",
      });
      $("#openedSaving").val("Доход в месяц: " + appData.monthInCome);
    }
  });
});
