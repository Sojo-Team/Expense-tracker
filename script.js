const balance = document.getElementById('balance')
const plusMoney = document.getElementById('plus-money')
const minusMoney = document.getElementById('minus-money')
const list = document.getElementById('list')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
const form = document.getElementById('form')

const getTransactionFromLocalStorage = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions = localStorage.getItem('transactions')
  ? getTransactionFromLocalStorage
  : []

const addTransactionDOM = transaction => {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span>
    <button class="delete-btn">X</button>`

  list.appendChild(item)
}

const updateValues = () => {
  const amount = transactions.map(item => item.amount)
  console.log(amount)
  const total = amount.reduce((acc, item) => acc + item, 0) * -1

  const income = amount
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)

  const expense = amount
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0)

  balance.innerHTML = `$${total}`
  plusMoney.innerHTML = `$${income}`
  minusMoney.innerHTML = `$${expense}`
}

const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1
}

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const addTransaction = e => {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter text and amount.')
    return
  }

  const transaction = {
    id: generateId(),
    text: text.value,
    amount: amount.value,
  }
  transactions.push(transaction)
  addTransactionDOM(transaction)
  updateValues()
  updateLocalStorage()
}

form.addEventListener('submit', addTransaction)
