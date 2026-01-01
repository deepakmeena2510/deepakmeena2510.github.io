<script>
/* ===== INIT ===== */
let balance = Number(localStorage.getItem("balance")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];
let clicksToday = Number(localStorage.getItem("clicksToday")) || 0;
let lastDate = localStorage.getItem("lastDate");

/* ===== DAILY RESET ===== */
let today = new Date().toDateString();
if (lastDate !== today) {
  clicksToday = 0;
  localStorage.setItem("clicksToday", 0);
  localStorage.setItem("lastDate", today);
}

/* ===== UPDATE BAL ===== */
function updateBalance() {
  localStorage.setItem("balance", balance);
  document.querySelectorAll(".bal").forEach(e => e.innerText = balance);
}

/* ===== ADD HISTORY ===== */
function addHistory(task, amt, status="Success") {
  history.unshift({
    task, amt, status,
    date: new Date().toLocaleString()
  });
  history = history.slice(0,30);
  localStorage.setItem("history", JSON.stringify(history));
}

/* ===== CLICK & EARN ===== */
function clickEarn(){
  if(clicksToday >= 10){
    alert("Daily limit reached");
    return;
  }
  clicksToday++;
  balance += 2;
  localStorage.setItem("clicksToday", clicksToday);
  updateBalance();
  addHistory("Click & Earn", 2);
}

/* ===== DAILY BONUS ===== */
function dailyBonus(){
  let claimed = localStorage.getItem("dailyBonus");
  if(claimed === today){
    alert("Already claimed");
    return;
  }
  balance += 1;
  localStorage.setItem("dailyBonus", today);
  updateBalance();
  addHistory("Daily Bonus", 1);
}

/* ===== SCRATCH ===== */
function scratch(){
  let c = Number(localStorage.getItem("scratch")) || 0;
  if(c >= 3){
    alert("Daily scratch limit over");
    return;
  }
  let win = [1,2,3][Math.floor(Math.random()*3)];
  balance += win;
  localStorage.setItem("scratch", c+1);
  updateBalance();
  addHistory("Scratch", win);
  alert("You won ₹"+win);
}

/* ===== REFERRAL (DEMO) ===== */
function referralJoin(){
  balance += 10;
  updateBalance();
  addHistory("Referral Bonus", 10);
  alert("Friend joined (Demo)");
}

/* ===== LEVEL ===== */
function levelStatus(){
  let lvl = "Locked";
  if(balance >= 100) lvl = "Level 3 (₹100 unlocked)";
  else if(balance >= 50) lvl = "Level 2 (₹50 unlocked)";
  else if(balance >= 10) lvl = "Level 1 (₹10 unlocked)";
  document.getElementById("level").innerText = lvl;
}
</script>
