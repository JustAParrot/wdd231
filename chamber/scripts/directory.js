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

    function displayMembers(members) {
        memberDirectory.innerHTML = ''; // Clear previous content
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

    function toggleView(view) {
        if (view === 'grid') {
            memberDirectory.classList.remove('list-view');
            memberDirectory.classList.add('grid-view');
        } else {
            memberDirectory.classList.remove('grid-view');
            memberDirectory.classList.add('list-view');
        }
    }

    // Initial fetch
    fetchMemberData();
});
