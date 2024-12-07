// JavaScript to populate current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last modified: ' + new Date(document.lastModified).toLocaleString();

// Menu Toggle Functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); 
});

// Days between two dates
function daysBetween(lastVisitDate) {
    const currentDate = new Date();
    const lastVisit = new Date(lastVisitDate);
    const diffTime = Math.abs(currentDate - lastVisit);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function checkVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const userMessage = document.getElementById('user-message');
    
    if (!lastVisit) {
        // First visit
        userMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const days = daysBetween(lastVisit);
        if (days < 1) {
            userMessage.textContent = "Back so soon! Awesome!";
        } else {
            userMessage.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', new Date().toISOString());
}

// Current date
function displayCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = `Today's Date: ${formattedDate}`;
}

// Call the function on page load
window.onload = function() {
    checkVisitMessage(); 
    displayCurrentDate(); 
};

