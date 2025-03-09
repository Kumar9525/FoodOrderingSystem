// Simulating fetching menu from a JSON file
function getMenu() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("Menu Loaded:", data);
      displayMenu(data);
      return data;
    })
    .catch((error) => console.error("Error fetching menu:", error));
}

// Function to display menu on the screen
function displayMenu(menu) {
  const menuContainer = document.getElementById("card-items");
  menuContainer.innerHTML = "";
  menu.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div class="cards">
          <div class="card-img">
              <img src="${item.imgSrc}" alt="${item.name}">
          </div>
          <div class="card-content">
              <div class="card-title">
                  <h3>${item.name}</h3>
                  <p>Price: $${item.price}</p>
              </div>
              <div class="add-card"><img src="plus1.png" alt=""></div>
          </div>
      </div>`;
    menuContainer.appendChild(div);
  });
}

// Simulating order placement
function takeOrder(menu) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * menu.length);
        order.push(menu[randomIndex]);
      }
      console.log("Order placed:", order);
      resolve(order);
    }, 2500);
  });
}

// Simulating order preparation
function orderPrep(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order is being prepared...");
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// Simulating payment processing
function payOrder(preparedOrder) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (preparedOrder.order_status) {
              console.log("Order has been paid.");
              resolve({ order_status: true, paid: true });
          } else {
              reject("Payment failed. Order not ready.");
          }
      }, 1000);
  });
}

// Thank you function
function thankyouFnc() {
  alert("Thank you for visiting! Enjoy your meal.");
}

// Execute the process
getMenu()
  .then((menu) => takeOrder(menu))
  .then((order) => orderPrep(order))
  .then((preparedOrder) => payOrder(preparedOrder))
  .then((paymentStatus) => {
    if (paymentStatus.paid) {
      thankyouFnc();
    }
  })
  .catch((error) => console.error("An error occurred:", error));
