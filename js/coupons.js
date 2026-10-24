const couponPanels = document.querySelectorAll(".points-panel[data-coupon]");

const MONTHLY_LIMIT = 5;

// Coupons the player owns: [{ id, month }]
let purchasedCoupons =
  JSON.parse(localStorage.getItem("purchasedCoupons")) || [];

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function isOwned(id) {
  return purchasedCoupons.some((c) => c.id === id);
}

// MARK: Update owned coupons

function updatePurchasedCoupons() {
  couponPanels.forEach((panel) => {
    if (isOwned(panel.dataset.coupon)) {
      panel.innerHTML = "<span>Owned</span>";
      panel.classList.add("owned");
    }
  });
}

updatePurchasedCoupons();

// MARK: Purchase coupon

couponPanels.forEach((panel) => {
  panel.addEventListener("click", () => {
    const id = panel.dataset.coupon;
    const cost = Number(panel.dataset.cost);

    if (isOwned(id)) return;

    const usedThisMonth = purchasedCoupons.filter(
      (c) => c.month === currentMonth()
    ).length;

    if (usedThisMonth >= MONTHLY_LIMIT) {
      alert("You've reached the limit of 5 coupons this month.");
      return;
    }

    if (!spendPoints(cost)) {
      alert("You don't have enough points!");
      return;
    }

    purchasedCoupons.push({ id: id, month: currentMonth() });
    localStorage.setItem("purchasedCoupons", JSON.stringify(purchasedCoupons));

    updatePurchasedCoupons();
  });
});