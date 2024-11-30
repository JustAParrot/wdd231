// JavaScript to populate current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last modified: ' + new Date(document.lastModified).toLocaleString();

// Menu Toggle Functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); 
});




document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp
    document.getElementById("timestamp").value = new Date().toISOString();
  
    // Modal functionality
    const modals = document.querySelectorAll(".modal");
    const modalLinks = document.querySelectorAll(".modal-link");
    const closeButtons = document.querySelectorAll(".close");
  
    modalLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const modalId = link.dataset.modal;
        document.getElementById(modalId).style.display = "flex";
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    window.addEventListener("click", event => {
      modals.forEach(modal => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    // Set the current timestamp
    document.getElementById("timestamp").value = new Date().toISOString();
  
    // Modal functionality
    const modals = document.querySelectorAll(".modal");
    const modalLinks = document.querySelectorAll(".modal-link");
    const closeButtons = document.querySelectorAll(".close");
  
    modalLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const modalId = link.dataset.modal;
        document.getElementById(modalId).style.display = "flex";
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
      });
    });
  
    window.addEventListener("click", event => {
      modals.forEach(modal => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  });