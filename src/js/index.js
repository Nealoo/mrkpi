import auth from './auth'
import tl from './tl'
import utilisation from './utilisation'


window.mrkpi_main_function = function (pageType){
	switch (pageType) {
		case 'main':
			auth();
			break;
		case 'tl':
			tl();
			break;
		case 'utilisation':
			utilisation();
			break;
	
		default:
			break;
	}
}