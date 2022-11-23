import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const page = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1, there are others
    if (page === 1 && numPages > 1) return this._generateMarkupButton('next');
    // Last Page
    if (page === numPages && numPages > 1)
      return this._generateMarkupButton('previous');
    // Other page
    if (page < numPages) return this._generateMarkupButton('both');
    // page 1, there are no other pages
    return;
  }

  _generateMarkupButton(type) {
    const page = this._data.page;
    if (type === 'previous')
      return `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page - 1}</span>
    </button>    
    `;

    if (type === 'next')
      return `
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${page + 1}</span>
    </button>
    `;

    if (type === 'both')
      return (
        this._generateMarkupButton('previous') +
        this._generateMarkupButton('next')
      );
  }
}

export default new PaginationView();
