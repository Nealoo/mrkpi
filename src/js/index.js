import dev from './dev'
import utilisation from './utilisation'


window.mrkpi_main_function = function (pageType){
	switch (pageType) {
		case 'dev':
			dev();
			break;
		case 'utilisation':
			utilisation();
			break;
	
		default:
			break;
	}
}