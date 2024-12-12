document.addEventListener("DOMContentLoaded", () => {
	const navToggle = document.querySelector(".nav-toggle");
	const navToggleLabel = document.querySelector(".nav-toggle-label");
	const navLinks = document.querySelectorAll(".navbar li a");

	// Toggle navigation on label click
	navToggleLabel.addEventListener("click", (event) => {
		navToggle.checked = !navToggle.checked;
		event.preventDefault();
	});

	// Close navigation when a link is clicked
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navToggle.checked = false;
		});
	});
});

// Initialize EmailJS
(function () {
	emailjs.init("VgU2h-mlj0KsKHZkv");
})();

// Get form elements
const form = document.getElementById("contactForm");
const submitButton = form.querySelector('button[type="submit"]');
const errorContainer = document.getElementById("errorContainer");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Validation functions
function validateName(name) {
	const nameRegex = /^[a-zA-Z\s-]{3,}$/;
	return nameRegex.test(name);
}

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function validateSubject(subject) {
	return subject.trim().length >= 5;
}

function validateMessage(message) {
	return message.trim().length >= 25;
}

// Function to clear form and error messages
function clearForm() {
	nameInput.value = "";
	emailInput.value = "";
	subjectInput.value = "";
	messageInput.value = "";
	errorContainer.textContent = "";
}

// Add clear form event listener
document.getElementById("clearForm").addEventListener("click", clearForm);

// Function to update error display
function updateErrorDisplay() {
	const errors = [];

	// Check each input only if it's not empty
	if (nameInput.value.trim() !== "" && !validateName(nameInput.value)) {
		errors.push("Name must be at least 3 characters long and contain only letters, spaces, or hyphens");
	}

	if (emailInput.value.trim() !== "" && !validateEmail(emailInput.value)) {
		errors.push("Please enter a valid email address");
	}

	if (subjectInput.value.trim() !== "" && !validateSubject(subjectInput.value)) {
		errors.push("Subject must be at least 5 characters long");
	}

	if (messageInput.value.trim() !== "" && !validateMessage(messageInput.value)) {
		errors.push("Message must be at least 25 characters long");
	}

	// Display errors
	errorContainer.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
}

// Add blur event listeners for individual validations
nameInput.addEventListener("blur", updateErrorDisplay);
emailInput.addEventListener("blur", updateErrorDisplay);
subjectInput.addEventListener("blur", updateErrorDisplay);
messageInput.addEventListener("blur", updateErrorDisplay);

// Function to display message with minimum display time
function displayMessage(message, isSuccess = false) {
	// Clear previous messages
	errorContainer.innerHTML = `<p style="color: ${isSuccess ? "green" : "red"};">${message}</p>`;

	// Ensure message stays for at least 3 seconds
	submitButton.disabled = true;

	setTimeout(() => {
		submitButton.disabled = false;
		if (isSuccess) {
			errorContainer.textContent = "";
		}
	}, 3000);
}

// Form submission handler
form.addEventListener("submit", async function (event) {
	event.preventDefault();

	// Clear previous error messages
	errorContainer.textContent = "";

	// Validate all inputs
	const errors = [];

	if (!validateName(nameInput.value.trim())) {
		errors.push("Name must be at least 3 characters long and contain only letters, spaces, or hyphens");
	}

	if (!validateEmail(emailInput.value.trim())) {
		errors.push("Please enter a valid email address");
	}

	if (!validateSubject(subjectInput.value.trim())) {
		errors.push("Subject must be at least 5 characters long");
	}

	if (!validateMessage(messageInput.value.trim())) {
		errors.push("Message must be at least 25 characters long");
	}

	// Display errors if any
	errorContainer.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");

	// Check if there are any errors
	if (errors.length === 0) {
		try {
			// Disable submit button and change text
			submitButton.disabled = true;
			submitButton.textContent = "Sending...";

			// Prepare email parameters
			const templateParams = {
				user_name: nameInput.value.trim(),
				user_email: emailInput.value.trim(),
				subject: subjectInput.value.trim(),
				message: messageInput.value.trim()
			};

			// Send email using EmailJS
			const response = await emailjs.send("service_0guyzg9", "contact_form", templateParams);

			// Success message
			displayMessage("Message sent successfully!", true);
			clearForm();
		} catch (error) {
			// Error handling
			console.error("Email send error:", error);
			displayMessage(`Failed to send message. ${error.text || "Please try again."}`, false);
		} finally {
			// Re-enable submit button and restore original text
			submitButton.disabled = false;
			submitButton.textContent = "Send";
		}
	}
});
