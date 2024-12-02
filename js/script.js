// Initialize EmailJS (Replace with your actual EmailJS user ID)
(function () {
	emailjs.init("VgU2h-mlj0KsKHZkv");
})();

// Get form elements
const form = document.getElementById("contactForm");
const errorContainer = document.getElementById("errorContainer");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Validation functions
function validateName(name) {
	// Must be 3 or more characters, only letters, spaces, and hyphens
	const nameRegex = /^[a-zA-Z\s-]{3,}$/;
	return nameRegex.test(name);
}

function validateEmail(email) {
	// Basic email validation regex
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
	// Clear input fields
	nameInput.value = "";
	emailInput.value = "";
	subjectInput.value = "";
	messageInput.value = "";

	// Clear error messages
	errorContainer.textContent = "";
}

// Add clear form event listener
document.getElementById("clearForm").addEventListener("click", clearForm);

// Validation functions for individual inputs
function validateInput(input, validator, errorMessage) {
	const isValid = validator(input.value);
	if (!isValid) {
		return errorMessage;
	}
	return "";
}

// Add blur event listeners for individual validations
nameInput.addEventListener("blur", function () {
	const error = validateInput(this, validateName, "Name must be at least 3 characters long and contain only letters, spaces, or hyphens");
	updateErrorDisplay();
});

emailInput.addEventListener("blur", function () {
	const error = validateInput(this, validateEmail, "Please enter a valid email address");
	updateErrorDisplay();
});

subjectInput.addEventListener("blur", function () {
	const error = validateInput(this, validateSubject, "Subject must be at least 5 characters long");
	updateErrorDisplay();
});

messageInput.addEventListener("blur", function () {
	const error = validateInput(this, validateMessage, "Message must be at least 25 characters long");
	updateErrorDisplay();
});

// Function to update error display
function updateErrorDisplay() {
	const errors = [];

	// Check each input
	if (!validateName(nameInput.value)) {
		errors.push("Name must be at least 3 characters long and contain only letters, spaces, or hyphens");
	}

	if (!validateEmail(emailInput.value)) {
		errors.push("Please enter a valid email address");
	}

	if (!validateSubject(subjectInput.value)) {
		errors.push("Subject must be at least 5 characters long");
	}

	if (!validateMessage(messageInput.value)) {
		errors.push("Message must be at least 25 characters long");
	}

	// Display errors
	errorContainer.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
}

// Form submission handler
form.addEventListener("submit", function (event) {
	event.preventDefault();

	// Clear previous error messages
	errorContainer.textContent = "";

	// Validate all inputs
	updateErrorDisplay();

	// Check if there are any errors
	if (errorContainer.textContent.trim() === "") {
		// Prepare email parameters
		const templateParams = {
			user_name: nameInput.value,
			user_email: emailInput.value,
			subject: subjectInput.value,
			message: messageInput.value
		};

		// Send email using EmailJS
		emailjs.send("service_eiksqit", "contact_form", templateParams).then(
			function (response) {
				alert("Message sent successfully!");
				clearForm();
			},
			function (error) {
				errorContainer.textContent = "Failed to send message. Please try again.";
				console.log("Email send error:", error);
			}
		);
	}
});
