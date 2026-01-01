let balance = localStorage.getItem('userBalance') ? parseFloat(localStorage.getItem('userBalance')) : 0;

function updateUI() {
    const el = document.getElementById('balance');
    if(el) el.innerText = "₹" + balance.toFixed(2);
}

function completeTask(reward) {
    balance += reward;
    localStorage.setItem('userBalance', balance); // Browser mein save karne ke liye
    updateUI();
    alert("Congratulations! ₹" + reward + " added to your wallet.");
}

// Page load par update karein
updateUI();
