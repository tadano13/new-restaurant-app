
const API_URL = '';

let cart = [];
function getAdminToken() {
  return localStorage.getItem('adminToken');
}

// --- Login functions ---
async function adminLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!res.ok) {
      alert('Invalid credentials.');
      return;
    }
    
    const data = await res.json();
    localStorage.setItem('adminToken', data.token); 
    
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    updateOrderLists(); 
    
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Server may be down.');
  }
}

function viewMenu() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('welcome-page').style.display = 'flex';
}

function backToLogin() {
  localStorage.removeItem('adminToken'); // Log out
  document.getElementById('admin-panel').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';
}


function showMenu() {
  document.getElementById('welcome-page').style.display = 'none';
  document.getElementById('menu-page').style.display = 'block';
  loadMenuItems();
}

async function loadMenuItems() {
  try {
    const res = await fetch(`${API_URL}/api/menu`);
    const items = await res.json();
    
    const containers = {
      Appetizers: document.querySelector('#category1 .menu-items'),
      'Main Course': document.querySelector('#category2 .menu-items'),
      Desserts: document.querySelector('#category3 .menu-items'),
      Beverages: document.querySelector('#category4 .menu-items'),
    };
    
    Object.values(containers).forEach(c => c.innerHTML = '');
    
    items.forEach(item => {
      const container = containers[item.category];
      if (container) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
          <div class="item-image"><i class="${item.icon || 'fas fa-utensils'}"></i></div>
          <div class="item-content">
            <h3 class="item-name">${item.name} <span class="item-price">₹${item.price}</span></h3>
            <p class="item-desc">${item.description}</p>
            <button class="add-to-cart-btn" data-id="${item._id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
          </div>
        `;
        container.appendChild(menuItem);
      }
    });
    attachAddToCartListeners();
    
  } catch (error) {
    console.error('Failed to load menu:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
 
  const tabs = document.querySelectorAll('.category-tab');
  const sections = document.querySelectorAll('.menu-section');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tab.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
      
      const cat = tab.getAttribute('data-category');
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === cat) sec.classList.add('active');
      });
    });
  });
  
 
  const adminTabs = document.querySelectorAll('.admin-tab');
  const adminSections = document.querySelectorAll('.admin-section');
  
  adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      adminTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const section = tab.getAttribute('data-section');
      adminSections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === section) sec.classList.add('active');
      });
    });
  });
  

  attachAddToCartListeners();
});


function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    
    button.replaceWith(button.cloneNode(true));
  });
  

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      addToCart(id, name, price);
    });
  });
}


function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }
  
  updateCartCount();
  showCartNotification();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function showCartNotification() {
  const cartCount = document.getElementById('cart-count');
  cartCount.style.animation = 'none';
  setTimeout(() => {
    cartCount.style.animation = 'bounce 0.5s';
  }, 10);
}

function openCart() {
  updateCartModal();
  document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function updateCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty</p>';
    cartTotal.textContent = 'Total: ₹0';
    return;
  }
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  cartTotal.textContent = `Total: ₹${total}`;
}

function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    updateCartModal();
    updateCartCount();
  }
}

function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(id);
      return;
    }
    updateCartModal();
    updateCartCount();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartModal();
  updateCartCount();
}

async function placeOrder() {
  const tableNumber = document.getElementById('table-number').value;
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  if (!tableNumber || tableNumber < 1) {
    alert('Please enter a valid table number');
    return;
  }
  
  const order = {
    tableNumber: tableNumber,
    items: cart, 
    total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  };
  
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    
    if (!res.ok) {
      throw new Error('Order placement failed');
    }
    
    const createdOrder = await res.json();
    

    document.getElementById('menu-page').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'flex';
    document.getElementById('order-id-display').textContent = `Order ID: ${createdOrder._id}`;
    
  
    cart = [];
    updateCartCount();
    closeCart();
    document.getElementById('table-number').value = '';
    
  } catch (error) {
    console.error('Order error:', error);
    alert('Failed to place order. Please try again.');
  }
}

function newOrder() {
  document.getElementById('order-confirmation').style.display = 'none';
  document.getElementById('welcome-page').style.display = 'flex';
}

// --- Admin functions (Modified for API) ---
async function updateOrderLists() {
  await updatePendingOrders();
  await updateCompletedOrders();
}

async function updatePendingOrders() {
  const pendingList = document.getElementById('pending-orders-list');
  pendingList.innerHTML = '<p>Loading...</p>';
  
  try {
    const token = getAdminToken();
    const res = await fetch(`${API_URL}/api/orders?status=pending`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      alert('Session expired. Please log in again.');
      backToLogin();
      return;
    }
    
    const pendingOrders = await res.json();
    pendingList.innerHTML = '';
    
    if (pendingOrders.length === 0) {
      pendingList.innerHTML = '<p>No pending orders</p>';
      return;
    }
    
    pendingOrders.forEach(order => {
      const orderCard = document.createElement('div');
      orderCard.className = 'order-card';
      orderCard.innerHTML = `
        <div class="order-header">
          <div class="order-id">${order._id}</div>
          <div class="order-table">Table ${order.tableNumber}</div>
          <div class="order-status pending">Pending</div>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name} x ${item.quantity}</span>
              <span>₹${item.price * item.quantity}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-total">Total: ₹${order.total}</div>
        <div class="order-actions">
          <button class="action-btn complete-btn" onclick="completeOrder('${order._id}')">Complete</button>
          <button class="action-btn delete-btn" onclick="deleteOrder('${order._id}', 'pending')">Delete</button>
        </div>
      `;
      pendingList.appendChild(orderCard);
    });
    
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    pendingList.innerHTML = '<p>Error loading orders.</p>';
  }
}

async function updateCompletedOrders() {
  const completedList = document.getElementById('completed-orders-list');
  completedList.innerHTML = '<p>Loading...</p>';
  
  try {
    const token = getAdminToken();
    const res = await fetch(`${API_URL}/api/orders?status=completed`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.status === 401) { return; } // Handled by pending
    
    const completedOrders = await res.json();
    completedList.innerHTML = '';
    
    if (completedOrders.length === 0) {
      completedList.innerHTML = '<p>No completed orders</p>';
      return;
    }
    
    completedOrders.forEach(order => {
      const orderCard = document.createElement('div');
      orderCard.className = 'order-card';
      orderCard.innerHTML = `
        <div class="order-header">
          <div class="order-id">${order._id}</div>
          <div class="order-table">Table ${order.tableNumber}</div>
          <div class="order-status completed">Completed</div>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name} x ${item.quantity}</span>
              <span>₹${item.price * item.quantity}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-total">Total: ₹${order.total}</div>
        <div class="order-actions">
          <button class="action-btn delete-btn" onclick="deleteOrder('${order._id}', 'completed')">Delete</button>
        </div>
      `;
      completedList.appendChild(orderCard);
    });
    
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    completedList.innerHTML = '<p>Error loading orders.</p>';
  }
}

async function completeOrder(orderId) {
  try {
    const token = getAdminToken();
    const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) {
      throw new Error('Failed to complete order');
    }
    
    updateOrderLists(); // Refresh both lists
    
  } catch (error) {
    console.error('Error completing order:', error);
    alert('Failed to complete order.');
  }
}

async function deleteOrder(orderId) {
  if (!confirm('Are you sure you want to delete this order?')) {
    return;
  }
  
  try {
    const token = getAdminToken();
    const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete order');
    }
    
    updateOrderLists(); 
    
  } catch (error) {
    console.error('Error deleting order:', error);
    alert('Failed to delete order.');
  }

}
