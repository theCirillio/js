"use strict";

let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalExpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  expensesItem = document.getElementsByClassName("expenses-item"),
  expensesBtn = document.getElementsByTagName("button")[0],
  optionalExpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  incomeItem = document.querySelector(".choose-income"),
  checkSavings = document.querySelector("#savings"),
  sumValue = document.querySelector(".choose-sum"),
  percentValue = document.querySelector(".choose-percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value");

let money, time;

expensesBtn.setAttribute("disabled", "");
optionalExpensesBtn.setAttribute("disabled", "");
countBtn.setAttribute("disabled", "");

$(startBtn).click(function (e) {
  e.preventDefault();

  appData.setBudget(budgetValue);

  appData.setPerDay(dayBudgetValue);

  appData.setTimeData(time);
  yearValue.value = appData.timeData.getFullYear();
  monthValue.value = appData.timeData.getMonth() + 1;
  dayValue.value = appData.timeData.getDate();

  appData.setLevel(levelValue);
  expensesBtn.removeAttribute("disabled");
  optionalExpensesBtn.removeAttribute("disabled");
  countBtn.removeAttribute("disabled");
});

$(expensesBtn).click(function (e) {
  e.preventDefault();
  let sum = 0;
  for (let ex = 0; ex < expensesItem.length; ex += 2) {
    let exName = expensesItem[ex].value;
    let exPrice = parseFloat(expensesItem[ex + 1].value);
    if (
      typeof exName === "string" &&
      typeof exName != null &&
      typeof exPrice != null &&
      exName != "" &&
      exPrice != "" &&
      exName.length < 50 &&
      !isNaN(exPrice)
    ) {
      appData.setExpense(exName, exPrice);
      sum += exPrice;
      expensesValue.textContent = sum.toFixed();
      console.log(appData.expenses);
      expensesBtn.textContent = "Утверждено! ";
      expensesBtn.setAttribute("disabled", "");
    } else {
      console.log("Некорректные данные");
    }
  }
  appData.setPerDay(dayBudgetValue);
});

$(optionalExpensesBtn).click(function (e) {
  e.preventDefault();
  let opts = "";
  appData.optionalExpenses = {};
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;
    if (opt == "") {
      continue;
    }
    if (typeof opt === "string" && typeof opt != null) {
      appData.optionalExpenses[i + 1] = opt;
      opts += appData.optionalExpenses[i + 1];
      if (i != optionalExpensesItem.length - 1) {
        opts += ", ";
      }
      console.log(appData.optionalExpenses);
    } else {
      console.log("Некорректные данные");
    }
  }
  optionalExpensesValue.textContent = opts;
  optionalExpensesBtn.textContent = "Утверждено!";
  optionalExpensesBtn.setAttribute("disabled", "");
});

$(incomeItem).change(function (e) {
  e.preventDefault();
  let items = incomeItem.value;
  if (typeof items === "string" && typeof items != null && items != "") {
    items = items.split(", ");
    appData.setIncome(items);
    incomeValue.textContent = appData.income;
    console.log(appData.income);
  } else {
    console.log("Некорректные данные");
  }
});

sumValue.setAttribute("readonly", "");
percentValue.setAttribute("readonly", "");

$(checkSavings).change(function (e) {
  e.preventDefault();
  if (appData.savings === true) {
    appData.savings = false;
    console.log(appData.savings);
    sumValue.setAttribute("readonly", "");
    percentValue.setAttribute("readonly", "");
  } else {
    appData.savings = true;
    console.log(appData.savings);
    sumValue.removeAttribute("readonly");
    percentValue.removeAttribute("readonly");
  }
});

$(sumValue).change(function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;
    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

$(percentValue).change(function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;
    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;
    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: true,
  setBudget: function (elem) {
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == "" || money == null) {
      money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money.toFixed();
    elem.textContent = appData.budget;
  },
  setPerDay: function (elem) {
    let expenses = 0;
    expenses = Object.values(appData.expenses).reduce((a, b) => a + b, 0); // НИШТЯК ТЕМА!!!

    appData.perDay = ((money - expenses) / 30).toFixed();
    elem.textContent = appData.perDay;
  },
  setLevel: function (elem) {
    if (appData.perDay < 100) {
      elem.textContent = "Низкий уровень бюджета";
    } else if (appData.perDay > 100 && appData.perDay < 2000) {
      elem.textContent = "Средний уровень бюджета";
    } else if (appData.perDay > 2000) {
      elem.textContent = "Высокий уровень бюджета";
    } else {
      console.log("Ошибочка...!");
    }
  },
  setTimeData: function (time) {
    appData.timeData = new Date(Date.parse(time));
  },
  setExpense: function (name, value) {
    appData.expenses[name] = value;
  },
  setIncome: function (arr) {
    appData.income = arr;
  },
};
