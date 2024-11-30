// JavaScript to populate current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last modified: ' + new Date(document.lastModified).toLocaleString();

// Menu Toggle Functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); 
});

const urlParams = new URLSearchParams(window.location.search);
const submittedInfo = document.getElementById("submitted-info");

// Define fields to display
const fields = [
  { label: "First Name", param: "first" },
  { label: "Last Name", param: "last" },
  { label: "Email", param: "email" },
  { label: "Mobile Number", param: "phone" },
  { label: "Business Name", param: "organization" },
  { label: "Timestamp", param: "timestamp" },
];

// Loop through fields and create HTML for each one
fields.forEach((field) => {
  const value = urlParams.get(field.param);
  if (value) {
    submittedInfo.innerHTML += `
      <div class="info-item">
        <strong>${field.label}:</strong> ${value}
      </div>
    `;
  }
});
