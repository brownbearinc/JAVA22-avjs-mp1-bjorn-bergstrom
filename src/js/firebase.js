const firebaseURL = 'https://play-a-game-b2437-default-rtdb.europe-west1.firebasedatabase.app/';

export async function getHighScoreList() {
	const highscorelistURL = `${firebaseURL}/highscore.json`;
	const response = await fetch(highscorelistURL);
	const data = await response.json();

	return data;
}

export async function updateHighScoreList(player, playerScore) {
	// get data from Realtime Database
	const highScoreList = await getHighScoreList();

	// user's score
	const newScore = { name: player, score: playerScore };

	// add new score to array list 
	highScoreList.push(newScore);

	// sort the array list
	highScoreList.sort((a, b) => b.score - a.score);

	// trim the array list to 5 objects
	const updatedHighScoreList = highScoreList.slice(0, 5);
	console.log('Updated list:', updatedHighScoreList);

	// update Realtime Database 
	await fetch(`${firebaseURL}/highscore.json`, {
		method: 'PUT',
		body: JSON.stringify(updatedHighScoreList),
		headers: { "Content-Type": "application/json" }
	});
}
