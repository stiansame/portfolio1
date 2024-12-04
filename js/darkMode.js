// Toggle dark mode
function toggleDarkMode() {
	document.body.classList.toggle("darkMode");
	localStorage.setItem("darkMode", document.body.classList.contains("darkMode") ? "enabled" : "disabled");
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("darkMode");
	}
});
