class InputRangeBlock {
    constructor(value, inputEl, rangeEl) {
        this.value = value
        this.inputEl = inputEl
        this.rangeEl = rangeEl
        this.render()
    }

    render(type) {
        type === 'text' ?
            this.rangeEl.value = this.value
            : this.inputEl.value = showThree(this.value)
    }
}

class ResultBlock {

    percent = 0.055

    constructor(monthlyEl, dailyEl) {
        this.monthlyEl = monthlyEl
        this.dailyEl = dailyEl
    }

    calculate(sum, period) {
        const months = 12
        !period && (period = 1)
        this.loan = Number(sum) + sum * (this.percent / months) * period
        this.monthly = this.loan / period
        this.daily = this.monthly / 30
        this.render()
    }

    render() {
        this.monthlyEl.textContent = showThree(Math.ceil(this.monthly))
        this.dailyEl.textContent = showThree(Math.ceil(this.daily))
    }
}

class LeadBlock {
    constructor(nameEl, phoneEl, submitEl) {
        this.nameEl = nameEl
        this.phoneEl = phoneEl
        this.submitEl = submitEl
    }

    validate() {
        if (this.nameEl.value === '') {
            this.validateMessage(this.nameEl, 'Введите имя!')
            return false
        }
        if (this.nameEl.value.length < 3) {
            this.validateMessage(this.nameEl, 'Имя должно быть 3 и более символов!')
            return false
        }
        return true
    }

    validateMessage(el, message) {
        console.log(message)
    }
}

class Calculator {

    constructor(sum, period, result, lead) {
        this.sum = sum
        this.period = period
        this.result = result
        this.lead = lead
        this.init()
    }

    init() {
        this.addInputRangeListeners(this.sum)
        this.addInputRangeListeners(this.period)
        this.result.calculate(this.sum.value, this.period.value)
        this.addLeadListeners(this.lead)

    }

    addInputRangeListeners(block) {

        block.inputEl.addEventListener('input', () => {
            block.value = block.inputEl.value.replace(' ', '')
            block.render('text')
            this.result.calculate(this.sum.value, this.period.value)
        })

        block.rangeEl.addEventListener('input', () => {
            block.value = block.rangeEl.value
            block.render('range')
            this.result.calculate(this.sum.value, this.period.value)
        })
    }

    addLeadListeners(lead) {
        lead.submitEl.addEventListener('click', () => {
            if (!lead.validate()) return false
            this.sendRequest()
        })
        lead.phoneEl.addEventListener('input',()=>{

        })
    }


    async sendRequest() {
        const data = new FormData()
        data.append('Имя', this.lead.nameEl.value)
        data.append('Телефон', this.lead.phoneEl.value)
        data.append('Сумма', this.sum.value)
        data.append('Период(мес)', this.period.value)
        data.append('Долг', this.result.loan)
        data.append('Платеж(мес)', this.result.monthly)
        data.append('В день', this.period.daily)

        const response = await fetch('', {
            method: 'POST',
            body: data
        });

        const result = await response.json();

        alert(result.message)
    }
}

new Calculator(
    new InputRangeBlock(
        1000000,
        document.querySelector('#money-input'),
        document.querySelector('#money-range'),
    ),
    new InputRangeBlock(
        200,
        document.querySelector('#months-input'),
        document.querySelector('#months-range')
    ),
    new ResultBlock(
        document.querySelector('#monthly'),
        document.querySelector('#daily'),
    ),
    new LeadBlock(
        document.querySelector('#name'),
        document.querySelector('#phone'),
        document.querySelector('#submit'),
    )
)


function showThree(num) {
    num += ''
    let res = ''
    for (let i = num.length % 3, j = 0; i <= num.length; j = i, i += 3) {
        res += num.slice(j, i) + ' '
    }
    return res
}


