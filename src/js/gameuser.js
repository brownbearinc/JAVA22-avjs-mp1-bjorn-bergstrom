export class GameUser {
	#user;
	#userScore;

	setUser(user) {
		this.#user = user;
		this.#userScore = 0;
	}

	getUser() {
		return this.#user;
	}

	addOnePointToUserScore() {
		this.#userScore++;
	}

	getUserScore() {
		return this.#userScore;
	}

	resetUserScore() {
		this.#userScore = 0;
	}
}
