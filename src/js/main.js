import { GameFunctions } from './gamefunctions.js'
import { OverlayScreen } from './overlayscreen.js'

const functions = new GameFunctions()
const screen = new OverlayScreen()

// Add highscore list
functions.showHighScoreList()

// Game starts when user clicking on go! button  
document.querySelector('#setPlayerForm').addEventListener('submit', (event) => {
	event.preventDefault(); // prevent form submission
	const playerName = document.getElementById('playerName').value;

	if (playerName === 'Yoda') {
		alert('No, Yoda. You are not welcome.')
	} else {

		screen.removeOverlayScreen()
		functions.gameUser.setUser(playerName);

		const rockButton = document.getElementById('rock');
		const paperButton = document.getElementById('paper');
		const scissorsButton = document.getElementById('scissors');

		// Call to main game method at gameFunction  
		rockButton.addEventListener('click', () => functions.play('rock'));
		paperButton.addEventListener('click', () => functions.play('paper'));
		scissorsButton.addEventListener('click', () => functions.play('scissors'));
	}
})
