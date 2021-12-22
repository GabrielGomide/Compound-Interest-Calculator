var regex = /[0-9]|\./;

function is_integer(event) {
    event.returnValue = (regex.test(event.key) && event.key != '.');
}

function is_real(event) {
    let input = event.path[0];
    event.returnValue = regex.test(event.key) && (event.key != '.' || !(input.value.includes('.')));
}

function changed_interest_time() {
    let interest_time = document.getElementById('interest_time').value;
    let interest = Number(document.getElementById('interest').value);
    let new_interest;

    if (document.getElementById('interest').value) {
        if (interest_time == 'Annual') {
            new_interest = (Math.pow((1 + (interest / 100)), 12) - 1) * 100;
            if (Math.round(new_interest) != new_interest) {
                new_interest = Math.round(new_interest * 100) / 100;
            }
        } else if (interest_time == 'Monthly') {
            new_interest = (Math.pow((1 + (interest / 100)), (1 / 12)) - 1) * 100;
            if (Math.round(new_interest) != new_interest) {
                new_interest = Math.round(new_interest * 100) / 100;
            }
        }

        document.getElementById('interest').value = String(new_interest);
    }
}

function changed_investment_time() {
    let investment_time = document.getElementById('investment_time').value;
    let time = Number(document.getElementById('time').value);
    let new_time;

    if (document.getElementById('time').value) {
        if (investment_time == 'Years') {
            new_time = Math.round(time / 12);
        } else if (investment_time == 'Months') {
            new_time = time * 12;
        }

        document.getElementById('time').value = String(new_time);
    }
}

function calculate_compound_interest() {
    let initial_value = Number(document.getElementById('initial_value').value);
    let monthly_value = Number(document.getElementById('monthly_value').value);
    let interest_time = document.getElementById('interest_time').value;
    let interest = Number(document.getElementById('interest').value);
    let investment_time = document.getElementById('investment_time').value;
    let time = Number(document.getElementById('time').value);

    let monthly_interest;
    let months;

    if (interest_time == 'Annual') {
        monthly_interest = (Math.pow((1 + (interest / 100)), (1 / 12)) - 1) * 100;
    } else if (interest_time == 'Monthly') {
        monthly_interest = interest;
    }

    if (investment_time == 'Years') {
        months = time * 12;
    } else if (investment_time == 'Months') {
        months = time;
    }

    let money = initial_value;

    for (let i=0; i < months; i++) {
        money *= (1 + (monthly_interest / 100));
        money += monthly_value;
    }

    let invested_money = initial_value + (monthly_value * months);
    let interest_money = money - invested_money;


    display_results(money, invested_money, interest_money);
}

function display_results(money, invested_money, interest_money) {
    let total_value = document.getElementById('total_value').getElementsByTagName('p')[1];
    let invested_value = document.getElementById('invested_value').getElementsByTagName('p')[1];
    let interest_value = document.getElementById('interest_value').getElementsByTagName('p')[1];

    money_str = (money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    invested_money_str = (invested_money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    interest_money_str = (interest_money).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    total_value.innerText = money_str;
    invested_value.innerText = invested_money_str;
    interest_value.innerText = interest_money_str;
}

