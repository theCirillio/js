<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My_JS</title>
    <link rel="icon" type="image/x-icon" href="/pics/javascript-svgrepo-com.svg">
    <link rel="stylesheet" type="text/css" href="/css/index.css">
</head>

<body>

    <div class="body">
        <form id="budget" action="">
            <input type="text" name="money" id="money" placeholder="Ваш бюджет на месяц?">
            <input type="text" name="time" id="time" placeholder="Введите дату в формате YYYY-MM-DD">
            <input type="submit" value="Рассчитать">
        </form>
        <input readonly type="text" id="oneday">
        <input readonly type="text" id="moneystatus">
        <div id="months" style="display: flex; flex-direction:column; gap: 20px;">
            <form action="">
                <input type="text" name="month" placeholder="Статья расходов в этом месяце?" value="">
                <input type="text" name="money" placeholder="Во сколько обойдется?" value="">
                <input type="submit" value="Добавить">
            </form>
            <form action="">
                <input type="text" name="month" placeholder="Статья расходов в следующем месяце?" value="">
                <input type="text" name="money" placeholder="Во сколько обойдется?" value="">
                <input type="submit" value="Добавить">
            </form>
        </div>
        <div id="savings" style="display: none; flex-direction:column; gap:20px; align-items:center;">
            <p>У вас не найдено накоплений!</p>
            <p>Хотите открыть?</p>
            <div id="buttons" style="display: flex; flex-direction:column; width:100px; gap: 10px;">
                <button class="choose" value="1">Да</button>
                <button class="choose" value="0">Нет</button>
            </div>
            <div id="openSavings" style="display: none;flex-direction:column; gap:20px;">
                <form action="" id="addSaving">
                    <input type="text" placeholder="Какова сумма накоплений?" name="sum" value="" id="savingSum">
                    <input type="text" placeholder="Под какой процент?" name="percent" value="" id="savingPercent">
                    <input type="submit" value="Открыть">
                </form>
                <input type="text" readonly id="openedSaving" style="display: none;">
            </div>
        </div>
        <div id="optionalExpenses" style="width: 300px; display: flex; flex-direction:column; gap: 10px;">
            <form action="" id="optExpenses">
                <input type="text" name="optionalExpenses" placeholder="Добавить необязательные расходы?" value="">
                <input type="submit" value="Добавить">
            </form>
            <input type="text" readonly id="addedOptExpenses" style="display: none;">
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="/js/script_index.js"></script>
</body>

</html>