// Step 1: Initial Balance aur Withdrawal Level set karein
let balance = parseFloat(localStorage.getItem('userBalance')) || 0;
let currentLevel = parseInt(localStorage.getItem('withdrawLevel')) || 10; // Shuruat 10 se

function updateWithdrawUI() {
    const container = document.getElementById('withdraw-options');
    if (!container) return;

    container.innerHTML = ""; // Purane buttons saaf karein
    
    // Level ke hisab se button decide karna
    let amountToShow = currentLevel;

    // Button banana
    let btn = document.createElement("button");
    btn.className = "withdraw-btn";
    btn.innerText = "₹" + amountToShow;
    btn.onclick = () => processWithdraw(amountToShow);
    
    container.appendChild(btn);

    // Agar 200 ya 300 level hai toh permanent buttons bhi dikhayein
    if (currentLevel >= 200) {
        addPermanentButton(300);
    }
}

function addPermanentButton(amt) {
    const container = document.getElementById('withdraw-options');
    let btn = document.createElement("button");
    btn.className = "withdraw-btn";
    btn.innerText = "₹" + amt;
    btn.onclick = () => processWithdraw(amt);
    container.appendChild(btn);
}

function processWithdraw(amount) {
    let upi = document.getElementById('upiId').value;
    
    if (!upi) {
        alert("Pehle UPI ID daalein!");
        return;
    }

    if (balance >= amount) {
        // Logic: Successful ya Fail - Yahan hum success maan rahe hain
        balance -= amount;
        localStorage.setItem('userBalance', balance);
        
        // Level Update Logic
        if (currentLevel === 10) currentLevel = 30;
        else if (currentLevel === 30) currentLevel = 50;
        else if (currentLevel === 50) currentLevel = 100;
        else if (currentLevel === 100) currentLevel = 200;
        // 200 ke baad level change nahi hoga (permanent)

        localStorage.setItem('withdrawLevel', currentLevel);
        
        alert(`Request for ₹${amount} sent to ${upi}!`);
        location.reload(); // Page refresh to update buttons
    } else {
        alert("Balance kam hai!");
    }
}

// UI load karein
window.onload = () => {
    if(document.getElementById('balance')) {
        document.getElementById('balance').innerText = "₹" + balance.toFixed(2);
    }
    updateWithdrawUI();
};
