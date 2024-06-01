'use strict';

class UserBudget{
    constructor(money, time){
        if(typeof money !== 'number' || typeof time !== 'string'){
            throw new TypeError('Both arguments must be of type number and string');
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
    savings: false
};


$(document).ready(function() {
    $("#budget").on("submit", function(e) {
        e.preventDefault();
        const money = parseFloat($("#money").val());
        const time = $("#time").val();

        if (isNaN(money)) {
            throw new Error('Money must be a number');
        }

        const userBudget = new UserBudget(money, time);
        console.log(userBudget);
        appData.budget = userBudget.money;
        appData.timeData = userBudget.time;
        console.log(appData);
        $("#oneday").val(`Ваш бюджет на 1 день: ${money/30}`);
        $("#months").css("display", "flex");
    });

    $("#months").on("submit", "form", function(e) {
        e.preventDefault();
        const month = $(this).find("input[name=month]").val();
        const money = parseFloat($(this).find("input[name=money]").val());

        if (isNaN(money)) {
            throw new Error('Money must be a number');
        }

        appData.expenses[month] = money;
        console.log(appData.expenses);
    });
})

