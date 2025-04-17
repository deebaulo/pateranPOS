const menuItems = [
    { code: 'B1', name: 'Beef Steak - Single', price: 35 },
    { code: 'B2', name: 'Beef Steak - with extra Rice', price: 45 },
    { code: 'B3', name: 'Beef Steak - Double', price: 70 },
    { code: 'C1', name: 'Chicken - Single', price: 35 },
    { code: 'C2', name: 'Chicken - with extra Rice', price: 45 },
    { code: 'C3', name: 'Chicken - Double', price: 70 },
    { code: 'BR1', name: 'Beef Randang - Single', price: 35 },
    { code: 'BR2', name: 'Beef Randang - with extra Rice', price: 45 },
    { code: 'BR3', name: 'Beef Randang - Double', price: 70 },
    { code: 'D1', name: 'Softdrinks', price: 25 },
    { code: 'D2', name: 'Bottled Water', price: 20 },
    { code: 'D3', name: 'Coffee', price: 15 }
  ];
  
  const menuDiv = document.getElementById('menu');
  const orderList = document.getElementById('orderList');
  const totalDisplay = document.getElementById('total');
  
  let orders = {};
  
  function updateReceipt() {
    orderList.innerHTML = "";
    let total = 0;
  
    for (const code in orders) {
      const item = orders[code];
      const subtotal = item.price * item.quantity;
      total += subtotal;
  
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} = ₱${subtotal}`;
      orderList.appendChild(li);
    }
  
    totalDisplay.textContent = total;
  }
  
  function addItemToOrder(code) {
    const quantityInput = document.getElementById(`qty-${code}`);
    let quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
  
    const item = menuItems.find(i => i.code === code);
  
    orders[code] = {
      name: item.name,
      price: item.price,
      quantity: quantity
    };
  
    updateReceipt();
    quantityInput.value = 1;
  }
  
  function clearItem(code) {
    delete orders[code];
    updateReceipt();
  }
  
  function renderMenu() {
    menuItems.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>₱${item.price}</p>
        <input type="number" id="qty-${item.code}" value="1" min="1" />
        <button class="add-btn" onclick='addItemToOrder("${item.code}")'>Add to Order</button>
        <button class="clear-btn" onclick='clearItem("${item.code}")'>Clear</button>
      `;
      menuDiv.appendChild(div);
    });
  }
  
  renderMenu();
  