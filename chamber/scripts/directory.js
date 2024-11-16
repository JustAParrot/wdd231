document.addEventListener("DOMContentLoaded", () => {
    const memberDirectory = document.getElementById('member-directory');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    async function fetchMemberData() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    }

    // Function to display the companies
    function displayMembers(members) {
        memberDirectory.innerHTML = ''; 
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <img src="${member.image_icon}" alt="${member.name}" />
                <h3>${member.name}</h3>
                <p><strong>Representative:</strong> ${member.representative}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone_number}</p>
                <p><a href="${member.website_url}" target="_blank">Visit Website</a></p>
            `;
            memberDirectory.appendChild(memberCard);
        });
    }

    // Function to toggle between grid and list view
    function toggleView(view) {
        if (view === 'grid') {
            memberDirectory.classList.remove('list-view');
            memberDirectory.classList.add('grid-view');
        } else {
            memberDirectory.classList.remove('grid-view');
            memberDirectory.classList.add('list-view');
        }
    }

    // Event listeners for buttons
    gridViewButton.addEventListener('click', () => toggleView('grid'));
    listViewButton.addEventListener('click', () => toggleView('list'));

    fetchMemberData();
});

// JavaScript to populate current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last modified: ' + new Date(document.lastModified).toLocaleString();