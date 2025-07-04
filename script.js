const DATE_OF_DEPARTURE = "2026-04-07T21:00:00";

const headerElement = document.querySelector("header");
const mainElement = document.querySelector("main");
const timerElement = document.querySelector(".timer");

const daysDigits = document.querySelector("#days");
const hoursDigits = document.querySelector("#hours");
const minutesDigits = document.querySelector("#minutes");
const secondsDigits = document.querySelector("#seconds");

function startCountdown(targetDate) {
	const end = new Date(targetDate);

	function update() {
		const now = new Date();
		const diff = end - now; // milliseconds

		if (diff <= 0) {
			timerElement.replaceChildren();
			mainElement.querySelector("h1").textContent = "Lift Off";
			timerElement.append(timesUp());
			clearInterval(timer);
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		// Change in UI
		daysDigits.textContent = days;
		hoursDigits.textContent = hours;
		minutesDigits.textContent = minutes;
		secondsDigits.textContent = seconds;
	}

	update(); // call immediately
	const timer = setInterval(update, 1000);
}

function setVariableMainHeight() {
	const headerHeight = headerElement.getBoundingClientRect().height;
	mainElement.style.height = `calc(100vh - ${headerHeight}px)`;
}

function timesUp() {
	const element = document.createElement("div");
	element.classList.add("complete-message");
	element.textContent = "🛫";

	return element;
}

setVariableMainHeight();
window.addEventListener("resize", setVariableMainHeight);
startCountdown(DATE_OF_DEPARTURE);
