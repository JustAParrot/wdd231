// Fetch the trainer data and display it on the page
async function fetchMemberData() {
  try {
    const response = await fetch("data/trainers.json");
    const data = await response.json();

    const container = document.getElementById("members-container");
    container.innerHTML = ""; 

    data.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add("member-card");
      const membershipLevel = getMembershipLevel(member.membership_level);
      card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <div class="text-content">
              <h3>${member.name}</h3>
              <p><strong>Description:</strong> ${member.description}</p>
              <p><strong>Membership Level:</strong> ${membershipLevel}</p>
              <p><strong>Address:</strong> ${member.address}</p>
              <p><strong>Phone:</strong> ${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
        `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "New";
    case 2:
      return "Professional";
    case 3:
      return "Expert";
    default:
      return "Unknown";
  }
}

// Toggle between grid and list view
function toggleView() {
  const container = document.getElementById("members-container");
  const button = document.getElementById("toggleViewBtn");

  if (container.classList.contains("grid-view")) {
    container.classList.remove("grid-view");
    container.classList.add("list-view");
    button.textContent = "Switch to Grid View";
  } else {
    container.classList.remove("list-view");
    container.classList.add("grid-view");
    button.textContent = "Switch to List View";
  }
}

// DOM is loaded before the script
document.addEventListener("DOMContentLoaded", () => {
  fetchMemberData();
  document
    .getElementById("toggleViewBtn")
    .addEventListener("click", toggleView);

  // Set default button text
  document.getElementById("toggleViewBtn").textContent = "Switch to List View";
});
