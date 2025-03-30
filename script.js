const shopBtn = document.getElementById("shopBtn");
const closeShopBtn = document.getElementById("closeShopBtn");
const shop = document.getElementById("shop");

console.log("shopBtn:", shopBtn);
console.log("closeShopBtn:", closeShopBtn);
console.log("shop:", shop);

shopBtn.addEventListener("click", () => {
  shop.classList.toggle("hidden");
});

closeShopBtn.addEventListener("click", () => {
  shop.classList.add("hidden");
});
