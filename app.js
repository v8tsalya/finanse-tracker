let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("log");
const countEl = document.getElementById("count");
const maxEl = document.getElementById("max");

function updateUI() {
  let income = 0, expense = 0, max = 0;

  if (logEl) logEl.innerHTML = "";

  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else {
      expense += t.amount;
      if (t.amount > max) max = t.amount;
    }

    if (logEl) {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<span>${t.title}</span>
        <span>${t.type === "expense" ? "-" : "+"}₹${t.amount}</span>`;
      logEl.prepend(div);
    }
  });

  if (incomeEl) incomeEl.textContent = `₹${income}`;
  if (expenseEl) expenseEl.textContent = `₹${expense}`;
  if (balanceEl) balanceEl.textContent = `₹${income - expense}`;
  if (countEl) countEl.textContent = transactions.length;
  if (maxEl) maxEl.textContent = max;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const titleEl = document.getElementById("title");
    const amountEl = document.getElementById("amount");
    const typeEl = document.getElementById("type");
    
    transactions.push({
      title: titleEl.value,
      amount: +amountEl.value,
      type: typeEl.value
    });
    form.reset();
    updateUI();
  });
}

updateUI();
