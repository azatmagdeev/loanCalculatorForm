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
    constructor(monthlyEl, dailyEl) {
        this.monthlyEl = monthlyEl
        this.dailyEl = dailyEl
        this.percent = 0.055
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

class Calculator {
    constructor(sum, period, result) {
        this.sum = sum
        this.period = period
        this.result = result
        this.init()
    }

    init(){
        this.addListeners(this.sum)
        this.addListeners(this.period)
        this.result.calculate(this.sum.value, this.period.value)
    }

    addListeners(block) {

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
}

new Calculator(
    new InputRangeBlock(
        1000000,
        document.querySelector('#money-input'),
        document.querySelector('#money-range'),
    ),
    new InputRangeBlock(
        24,
        document.querySelector('#months-input'),
        document.querySelector('#months-range')
    ),
    new ResultBlock(
        document.querySelector('#monthly'),
        document.querySelector('#daily'),
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


