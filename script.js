let form = document.getElementById("expenseForm");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let edit = 0;

function show() {
    let total = 0, high = 0, rows = "";

    for (let i = 0; i < expenses.length; i++) {
        let e = expenses[i];
        total += Number(e.amount);

        if (Number(e.amount) > high) high = Number(e.amount);

        rows += `<tr>
        <td>${e.name}</td><td>${e.category}</td>
        <td>${e.date}</td><td>${e.amount}</td>
        <td><button onclick="editExpense(${i})">Edit</button>
        <button onclick="deleteExpense(${i})">Delete</button></td></tr>`;
    }

    document.getElementById("expenseList").innerHTML = rows;
    document.getElementById("expenseTotal").innerHTML = "Rs " + total;
    document.getElementById("expenseCount").innerHTML = expenses.length;
    document.getElementById("highest").innerHTML = "Rs " + high;
    document.getElementById("expenseEmpty").style.display = expenses.length == 0 ? "block" : "none";
}

function save() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    show();
}
function deleteExpense(i) {
    expenses.splice(i, 1);
    save();
}


function editExpense(i) {
    let e = expenses[i];
    document.getElementById("expenseName").value = e.name;
    document.getElementById("expenseAmount").value = e.amount;
    document.getElementById("expenseCategory").value = e.category;
    document.getElementById("expenseDate").value = e.date;
    edit = i;
    document.getElementById("saveBtn").textContent = "Update";
    document.getElementById("cancelBtn").hidden = false;
}


form.onsubmit = function(e) {
    e.preventDefault();
    let obj = {
        name: document.getElementById("expenseName").value,
        amount: document.getElementById("expenseAmount").value,
        category: document.getElementById("expenseCategory").value,
        date: document.getElementById("expenseDate").value
    };
    if (edit == 0) expenses.push(obj);
    else expenses[edit] = obj;
    edit = 0;
    form.reset();
    document.getElementById("saveBtn").textContent = "Save expense";
    document.getElementById("cancelBtn").hidden = true;
    save();

    

};

show();

