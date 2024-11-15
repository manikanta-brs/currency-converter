function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("iss-theme", theme);
}

setTheme(localStorage.getItem("iss-theme") || defaultColor);

const currency_one = document.getElementById("currency-one");
const amount_one = document.getElementById("amount-one");
const currency_two = document.getElementById("currency-two");
const amount_two = document.getElementById("amount-two");

const rateDisplay = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currencyOne = currency_one.value;
  const currencyTwo = currency_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const exchangeRate = data.rates[currencyTwo];
      rateDisplay.innerText = `1 ${currencyOne} = ${exchangeRate} ${currencyTwo}`;
      amount_two.value = (amount_one.value * exchangeRate).toFixed(2);
    })
    .catch((error) => console.error("Error fetching exchange rate:", error));
}
window.addEventListener("DOMContentLoaded", () => {
  calculate();
});

currency_one.addEventListener("change", calculate);
amount_one.addEventListener("input", calculate);
currency_two.addEventListener("change", calculate);
amount_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculate();
});
