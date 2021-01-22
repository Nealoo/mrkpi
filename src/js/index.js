import dev from './dev'
import tl from './tl'
import utilisation from './utilisation'


window.mrkpi_main_function = function (pageType){
	switch (pageType) {
		case 'dev':
			dev();
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