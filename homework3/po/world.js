const MainPage = require('./pages/main-page');
const SearchResultsPage = require('./pages/search-results-page');

class World {

	constructor() {
        this.mainPage = new MainPage();
        this.searchResultsPage = new SearchResultsPage();
    };
    
};

module.exports = new World();