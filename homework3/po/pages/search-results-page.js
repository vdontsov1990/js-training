const BasePage = require('./base-page');

class SearchResultPage extends BasePage {

    constructor() {
        super();
        this.serchText = element(by.id('search_result_title_text'));
        this.productImages = element.all(by.className('rz-lazy-load'));
        this.productTitles = element.all(by.css('div[class*=title] a'));
        this.priceValues = element.all(by.css('span[id*=price]'));
        this.priceCurrencies = element.all(by.css('span[class*=sign]'));
        this.ratingStars = element.all(by.css('span[class*="rating-stars"]'));
        this.reviews = element.all(by.css('span[class*="reviews"]'));
    };

}

module.exports = SearchResultPage;