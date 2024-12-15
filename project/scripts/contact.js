// Get the URL parameter form
const urlParams = new URLSearchParams(window.location.search);
const formType = urlParams.get('form');

const formContainer = document.getElementById('form-container');

// Contact Us form
function createContactUsForm() {
    formContainer.innerHTML = `
        <h2>Contact Us</h2>
        <form action="submit-form.php" method="POST">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="case">Brief Description of Your Case:</label>
            <textarea id="case" name="case" rows="4" required></textarea>

            <label for="urgency">Urgency:</label>
            <select id="urgency" name="urgency" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">Send Request</button>
        </form>
    `;
}

// Work with Us form
function createWorkWithUsForm() {
    formContainer.innerHTML = `
        <h2>Work with Us</h2>
        <form action="submit-form.php" method="POST">
            <label for="trainer-name">Full Name:</label>
            <input type="text" id="trainer-name" name="trainer-name" required>

            <label for="trainer-email">Email:</label>
            <input type="email" id="trainer-email" name="trainer-email" required>

            <label for="experience">Years of Experience:</label>
            <input type="number" id="experience" name="experience" required>

            <label for="specialization">Specialization (e.g., obedience, agility):</label>
            <input type="text" id="specialization" name="specialization" required>

            <label for="certifications">Certifications (if any):</label>
            <input type="text" id="certifications" name="certifications">

            <button type="submit">Send Information</button>
        </form>
    `;
}

if (formType === 'contact-us') {
    createContactUsForm();
} else if (formType === 'work-with-us') {
    createWorkWithUsForm();
} else {
    formContainer.innerHTML = "<p>Error: Invalid form type.</p>";
}

const modal = document.getElementById('exit-modal');
const confirmExitBtn = document.getElementById('confirm-exit');
const cancelExitBtn = document.getElementById('cancel-exit');
let isFormDirty = false;

document.querySelectorAll('form input, form textarea, form select').forEach((input) => {
    input.addEventListener('input', () => {
        isFormDirty = true; // Mark form as modified
    });
});

// Leave page modal
window.addEventListener('beforeunload', (e) => {
    if (isFormDirty) {
        e.preventDefault(); 
        e.returnValue = ''; 
        return ''; 
    }
});

window.addEventListener('popstate', (e) => {
    if (isFormDirty) {
        e.preventDefault();
        modal.style.display = 'flex'; 
    }
});

confirmExitBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    isFormDirty = false; 
    window.history.back();
});

cancelExitBtn.addEventListener('click', () => {
    modal.style.display = 'none'; 
});
