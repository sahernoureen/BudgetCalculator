let date = new Date();
const addMonth = document.querySelector(".budget__title--month");
let year = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
addMonth.textContent = year[date.getMonth()] + " " + date.getFullYear();

const budget_value = document.querySelector(".budget__value"); // getting main balance
const addtransaction = document.querySelector(".ion-ios-checkmark-outline"); //submitting form
let IncomeList = document.querySelector(".income__list");
let ExpenseList = document.querySelector(".expenses__list");
//let BudgetValue = document.querySelector(".budget__value");

class Transaction {
  static transactionID = 0;
  constructor(amount, description) {
    this.amount = amount;
    this.description = description;
    this.id = Transaction.transactionID++;
  }
}

class Income extends Transaction {
  constructor(amount, description) {
    super(amount, description);
  }
}

class Expense extends Transaction {
  constructor(amount, description) {
    super(amount, description);
  }
}
let incomeArray = [];
let expenseArray = [];
let incometotal;
let expensetotal;

addtransaction.addEventListener("click", function () {
  let description = document.getElementsByClassName(
    "add__description red-focus"
  )[0].value;
  let amount = document.getElementsByClassName("add__value red-focus")[0].value;
  if (description === "" || amount === "")
    alert(" please Enter description and amount");
  else {
    if (
      document.getElementsByClassName("add__type red-focus")[0].value === "inc"
    ) {
      let income = new Income(parseFloat(amount), description);
      incomeArray.push(income);
    } else {
      let expense = new Expense(parseFloat(amount), description);
      expenseArray.push(expense);
    }
  }
  amount.value = "";
  description.value = "";
  DisplayBudget();
});

let deleteExpenseBtn = document.querySelector(".expenses__list");
deleteExpenseBtn.addEventListener("click", function (e) {
  let x = e.target.dataset.id;
  expenseArray = expenseArray.filter((element) => element.id != x);

  DisplayBudget();
  //}
});
// -------------Adding Event listener to delete Incomes
let deleteIncomeBtn = document.querySelector(".income__list");
deleteIncomeBtn.addEventListener("click", function (e) {
  let x = e.target.dataset.id;
  incomeArray = incomeArray.filter((element) => element.id != x);
  DisplayBudget();
});

const DisplayBudget = function () {
  const totalIncomesElement = document.querySelector(".budget__income--value");
  const totalExpenseElement = document.querySelector(
    ".budget__expenses--value"
  );
  const totalPercentageElement = document.querySelector(
    ".budget__expenses--percentage"
  );
  incometotal = 0;
  expensetotal = 0;
  incomeArray.forEach((income) => (incometotal += income.amount));
  expenseArray.forEach((expense) => (expensetotal += expense.amount));

  totalIncomesElement.innerHTML = `+ $${parseInt(incometotal).toFixed(2)}`;
  totalExpenseElement.innerHTML = `- $${parseInt(expensetotal).toFixed(2)}`;
  totalPercentageElement.innerHTML = `${(
    (expensetotal / incometotal) *
    100
  ).toFixed(2)}%`;

  let totalBudget = incometotal - expensetotal;

  if (totalBudget < 0) {
    budget_value.innerHTML = `$ ${totalBudget}`;
  } else budget_value.innerHTML = `$ ${totalBudget}`;
  IncomeList.innerHTML = "";
  ExpenseList.innerHTML = "";

  insertIncomeList();
  insertExpenseList();
};

const insertExpenseList = function () {
  expenseArray.forEach((expense) => {
    ExpenseList.insertAdjacentHTML(
      "beforeend",
      `  <div class="item clearfix">
    <div class="item__description">${expense.description}</div>
    <div class="right clearfix">
      <div class="item__value">- ${expense.amount.toFixed(2)}</div>
      <div class="item__percentage">${(
        (expense.amount / incometotal) *
        100
      ).toFixed(2)} %</div>
      <div class="item__delete">
        <button class="item__delete--btn"><i data-id="${
          expense.id
        }" class="ion-ios-close-outline"></i></button>
      </div>
    </div>
  </div>
`
    );
  });
};

const insertIncomeList = function () {
  incomeArray.forEach((income) => {
    IncomeList.insertAdjacentHTML(
      "beforeend",
      `<div class="item clearfix" >
          <div class="item__description">${income.description}</div>
          <div class="right clearfix">
            <div class="item__value">+ $${income.amount.toFixed(2)}</div>
            <div class="item__delete">
            <button class="item__delete--btn"><i data-id="${
              income.id
            }" class="ion-ios-close-outline"></i></button>
             
              </button>
            </div>
          </div>`
    );
  });
};

//document.getElementsByClassName("add__description red-focus").innerHTML = "";
// document.getElementsByClassName("add__value red-focus").innerHTML = "";
