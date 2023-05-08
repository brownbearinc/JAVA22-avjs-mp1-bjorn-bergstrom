import { GameUser } from './gameuser.js'
import { getHighScoreList, updateHighScoreList } from './firebase.js';

import rockImg from '../media/rock.png';
import paperImg from '../media/paper.png';
import scissorsImg from '../media/scissors.png'; 

export class GameFunctions {

	gameUser = new GameUser();

	// main function 
	play(userChoice) {

		this.showHighScoreList()

		// Add computer's random equipment
		const computerChoice = this.createRandomEquipment()

		// Add computer equipment as picture 
		console.log('computer:', computerChoice)
		this.showEquipmentImg('computer', computerChoice)

		// Add user equipment as picture 
		console.log('user:', userChoice);
		this.showEquipmentImg('user', userChoice)

		if (userChoice === computerChoice) {
			console.log('Its a tie');
			this.showTextResultat('tie')

		} else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
			(userChoice === 'paper' && computerChoice === 'rock') ||
			(userChoice === 'scissors' && computerChoice === 'paper')) {

			console.log('You win');
			this.showTextResultat('win')
			this.gameUser.addOnePointToUserScore()
			this.updateUserScoreH1()

		} else {
			console.log('You lose');
			this.showTextResultat('lose')

			const player = this.gameUser.getUser()
			const playerScore = this.gameUser.getUserScore()

			updateHighScoreList(player, playerScore)
			this.gameUser.resetUserScore()
			this.updateUserScoreH1()
		}
	}

	createRandomEquipment() {
		const equipmentArray = ['rock', 'scissors', 'paper'];
		const rnd = Math.floor(Math.random() * 3);
		return equipmentArray[rnd];
	}

	showEquipmentImg(user, equipment) {
		const img = document.createElement('img');

		switch (equipment) {
			case 'rock':
				img.src = rockImg;
				break;
			case 'paper':
				img.src = paperImg;
				break;
			case 'scissors':
				img.src = scissorsImg;
				break;
			default:
				console.error('Invalid equipment:', equipment);
				return;
		}

		// Chose windows 
		if (user !== 'computer') {
			const div = document.querySelector('#userChoice');
			div.innerHTML = '';
			div.appendChild(img);
		} else {
			const div = document.querySelector('#computerChoice');
			div.innerHTML = '';
			div.appendChild(img);
		}
	}

	showTextResultat(resultat) {
		const p = document.querySelector('#resultat')

		switch (resultat) {
			case 'tie':
				p.textContent = 'Its a tie!'
				p.className = 'orange'
				break;
			case 'win':
				p.textContent = 'You win!'
				p.className = 'green'
				break;
			case 'lose':
				p.textContent = 'You lose!'
				p.className = 'red'
				break;
			default:
				console.error('Invalid equipment:', resultat);
				return;
		}
	}

	updateUserScoreH1() {
		const h1 = document.querySelector('#userScore');
		h1.textContent = `User Score: ${this.gameUser.getUserScore()}`
	}

	async showHighScoreList() {
		const data = await getHighScoreList()

		// Clear the child elements to #highscoreList div
		document.querySelector('#highscoreList').innerHTML = ''

		for (const key of data) {
			const li = document.createElement('li')
			li.textContent = `${key.name}: ${key.score}`
			const ol = document.querySelector('#highscoreList')
			ol.appendChild(li)
		}
	}
}
