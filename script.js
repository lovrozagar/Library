/* eslint-disable max-classes-per-file */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
// modal constants

const openModalButton = document.querySelector('#modal-btn');
const overlay = document.getElementById('overlay');
const modal = document.querySelector('#modal');
const modalSubmitButton = document.querySelector('#modal-submit-btn');
let edit = false;
let cardNumber = 0;

class Library {
  constructor() {
    this.books = [];
  }
}

let myLibrary = new Library();
class Book {
  constructor(title, author, pages, read, order) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.order = order;
  }
}

modalSubmitButton.addEventListener('click', (event) => {
  submitBook(event); // every valid from submitted ads a book to library and displays it
});

overlay.addEventListener('click', () => {
  cardNumber = 0;
  edit = false;
});

// BOOK FORM VALIDATION
function unInitBookInput() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  title.removeEventListener('input', validateTitle);
  author.removeEventListener('input', validateAuthor);
  pages.removeEventListener('input', validatePages);
}

function initBookInput() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  title.addEventListener('input', validateTitle);
  author.addEventListener('input', validateAuthor);
  pages.addEventListener('input', validatePages);
}

function validateInputs() {
  const bool1 = validateAuthor();
  const bool2 = validateTitle();
  const bool3 = validatePages();
  if (bool1 && bool2 && bool3) {
    return true;
  }
  return false;
}

function validateTitle() {
  const title = document.getElementById('title');
  const error = document.getElementById('title-error');

  if (!title.validity.valid) {
    showError(title, error);
    return false;
  }
  clearError(title, error);
  return true;
}

function validateAuthor() {
  const author = document.getElementById('author');
  const error = document.getElementById('author-error');

  if (!author.validity.valid) {
    showError(author, error);
    return false;
  }
  clearError(author, error);
  return true;
}

function validatePages() {
  const pages = document.getElementById('pages');
  const error = document.getElementById('pages-error');

  if (!pages.validity.valid) {
    showError(pages, error);
    return false;
  }
  clearError(pages, error);
  return true;
}

function removeErrors() {
  unInitBookInput();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  title.classList.remove('invalid');
  author.classList.remove('invalid');
  pages.classList.remove('invalid');
}

function showError(el, elError) {
  // CHECK TO SHORT
  if (el.validity.tooShort) {
    switch (el.id) {
      case 'title':
        elError.textContent = 'Minimum title length is 3 characters';
        break;
      default:
        elError.textContent = 'Minimum author length is 3 characters';
    }
    el.classList.add('invalid');
    return;
  }
  if (el.validity.tooLong) {
    switch (el.id) {
      case 'title':
        elError.textContent = 'Maximum title length is 100 characters';
        break;
      default:
        elError.textContent = 'Maximum author length is 40 characters';
    }
    el.classList.add('invalid');
    return;
  }
  if (el.validity.valueMissing) {
    switch (el.id) {
      case 'title':
        elError.textContent = 'Please enter the title';
        break;
      case 'author':
        elError.textContent = 'Please enter an author';
        break;
      default:
        elError.textContent = 'Please enter the number of pages';
    }
    el.classList.add('invalid');
    return;
  }
  if (el.validity.rangeUnderflow) {
    elError.textContent = 'New book should have at least 5 pages';
    el.classList.add('invalid');
    return;
  }
  if (el.validity.rangeOverflow) {
    elError.textContent = 'New book should not have more than 10000 pages';
    el.classList.add('invalid');
  }
}

function clearError(el, elError) {
  elError.textContent = '';
  el.classList.remove('invalid');
}

function submitBook(event) {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  event.preventDefault();

  if (!validateInputs()) {
    initBookInput();
    return;
  }
  unInitBookInput();

  if (
    title.value !== '' &&
    author.value !== '' &&
    pages.value !== '' &&
    pages.value > 0 &&
    pages.value <= 10000
  ) {
    event.preventDefault();
    const order = myLibrary.length;
    if (!edit) {
      addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        read.checked,
        order
      );
    } else {
      myLibrary[cardNumber].title = title.value;
      myLibrary[cardNumber].author = author.value;
      myLibrary[cardNumber].pages = pages.value;
      myLibrary[cardNumber].read = read.checked;
      cardNumber = 0;
      edit = false;
    }
    displayBooks();
    closeModal();
  }
}

function addBookToLibrary(title, author, pages, read, order) {
  let book = new Book(title, author, pages, read, order);
  myLibrary.push(book);
}

function displayBooks() {
  const booksGrid = document.querySelector('.book-grid');
  const removeCards = document.querySelectorAll('.card');
  for (let i = 0; i < removeCards.length; i += 1) {
    removeCards[i].remove();
  }

  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookCard = document.createElement('div');
    bookCard.dataset.linkedArray = i;
    bookCard.classList.add('card');
    booksGrid.appendChild(bookCard);

    const index = parseInt(bookCard.dataset.linkedArray, 10);

    // Adds title para to card
    const title = document.createElement('p');
    title.textContent = `"${myLibrary[i].title}"`;
    bookCard.appendChild(title);

    // Adds author para to card
    const author = document.createElement('p');
    author.textContent = myLibrary[i].author;
    bookCard.appendChild(author);

    // Adds pages para to card
    const pages = document.createElement('p');
    pages.textContent = `${myLibrary[i].pages} pages`;
    bookCard.appendChild(pages);

    // Adds edit button to card
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    bookCard.appendChild(editButton);

    editButton.addEventListener('click', () => {
      setTimeout(() => {
        edit = true;
        cardNumber = index;
        openModal('Edit book', edit, index);
      }, 100);
    });

    // Adds read button to card
    const read = document.createElement('button');
    read.textContent = isRead(myLibrary[i].read);
    if (myLibrary[i].read) {
      read.classList.add('read');
    } else {
      read.classList.add('not-read');
    }
    bookCard.appendChild(read);

    read.addEventListener('click', () => {
      setTimeout(() => {
        if (myLibrary[i].read === false) {
          myLibrary[i].read = true;
        } else {
          myLibrary[i].read = false;
        }
        displayBooks();
      }, 100);
    });

    // Adds remove button to card
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    bookCard.appendChild(removeButton);

    // Listens for remove button click
    removeButton.addEventListener('click', () => {
      setTimeout(() => {
        removeBook(index);
        displayBooks();
      }, 100);
    });
  }
  saveBooksLocal();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function isRead(read) {
  return read ? 'Read' : 'Not read';
}

openModalButton.addEventListener('click', () => {
  openModal('Add new book');
});

overlay.addEventListener('click', () => {
  closeModal();
});

function resetForm() {
  setTimeout(() => {
    document.querySelector('#form').reset();
  }, 100);
}

function openModal(string, isInEdit, index) {
  if (modal == null) return;
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = string;
  modal.classList.add('active');
  overlay.classList.add('active');
  if (isInEdit) {
    const title = document.querySelector('#title');
    title.value = myLibrary[index].title;
    const author = document.querySelector('#author');
    author.value = myLibrary[index].author;
    const pages = document.querySelector('#pages');
    pages.value = myLibrary[index].pages;
    const read = document.querySelector('#read');
    read.checked = myLibrary[index].read;
  }
}

function closeModal() {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  resetForm();
  removeErrors();
}

function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library')) || [];
}

function saveBooksLocal() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

addLocalStorage();
displayBooks();
