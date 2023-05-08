export class OverlayScreen {

	overlayScreen = document.querySelector('#overlayScreen')

	removeOverlayScreen() {
		// Remove everything below overlayScreen tag 
		overlayScreen.innerHTML = ''
	}
}