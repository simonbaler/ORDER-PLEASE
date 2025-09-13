// orders.js - Simulated order data and functions

let orders = JSON.parse(localStorage.getItem('orders') || '[]');

function addOrder(order) {
  order.id = Date.now();
  order.status = 'Order Placed';
  order.timestamp = new Date().toISOString();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  return order.id;
}

function getOrdersByUser(email) {
  return orders.filter(o => o.user && o.user.email === email);
}

function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}

// Export for use in other files
window.addOrder = addOrder;
window.getOrdersByUser = getOrdersByUser;
window.updateOrderStatus = updateOrderStatus;
