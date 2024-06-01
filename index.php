<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>my js</title>
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
        <div id="months" style="display: none; flex-direction:column; gap: 20px;">
            <form action="">
                <input type="text" name="month" placeholder="Статья расходов в этом месяце?">
                <input type="text" name="money" placeholder="Во сколько обойдется?">
                <input type="submit" value="Добавить">
            </form>
            <form action="">
                <input type="text" name="month" placeholder="Статья расходов в следующем месяце?">
                <input type="text" name="money" placeholder="Во сколько обойдется?">
                <input type="submit" value="Добавить">
            </form>
        </div>
    </div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="/js/script_index.js"></script>
</body>

</html>