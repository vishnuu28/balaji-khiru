import { saveContact, saveOrder } from "./firebase-init.js";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const orderForm = document.getElementById("orderForm");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const status = document.getElementById("contactStatus");

  if (!name || !phone || !message) {
    status.textContent = "Please fill all fields.";
    status.style.color = "#d32f2f";
    return;
  }

  if (!isValidPhone(phone)) {
    status.textContent = "Please enter a valid 10-digit Indian phone number.";
    status.style.color = "#d32f2f";
    return;
  }

  try {
    await saveContact({ name, phone, message });
    status.textContent = "Thank you! Your message is saved. We will contact you soon.";
    status.style.color = "#2e7d32";
    contactForm.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "Could not save your message. Please try again.";
    status.style.color = "#d32f2f";
  }
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const product = document.getElementById("orderProduct").value;
  const quantity = document.getElementById("orderQuantity").value.trim();
  const status = document.getElementById("orderStatus");

  if (!name || !phone || !product || !quantity) {
    status.textContent = "Please complete all order details.";
    status.style.color = "#d32f2f";
    return;
  }

  if (!isValidPhone(phone)) {
    status.textContent = "Please enter a valid 10-digit Indian phone number.";
    status.style.color = "#d32f2f";
    return;
  }

  if (Number(quantity) <= 0) {
    status.textContent = "Quantity must be greater than zero.";
    status.style.color = "#d32f2f";
    return;
  }

  try {
    await saveOrder({
      name,
      phone,
      product,
      quantity: Number(quantity)
    });
    status.textContent = `Order saved for ${product}. We will call you shortly.`;
    status.style.color = "#2e7d32";
    orderForm.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "Could not save your order. Please try again.";
    status.style.color = "#d32f2f";
  }
});
