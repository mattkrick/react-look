import Config from '../../api/Config';
/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 * @param {string} query - Media query that gets evaluated
 */
export default function evalMediaQuery(query) {
	/**
	 * Check if browser supports window.matchMedia
	 */
	if (Config.canMatchMedia()) {
		return Config.getMatchMedia()(query.replace('@media', '').trim()).matches;
	} else {
		console.warn('Failed evaluating media query: '+expr+'. Your environment is not able to use window.matchMedia.');
		console.warn('Use .setMatchMedia to inject your very own. See docs for help.');
		return false;
	}
}