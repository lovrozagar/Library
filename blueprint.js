/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const form = document.querySelector('form');
const submitButton = document.querySelector('#submit');
const bookGrid = document.querySelector('.book-container-grid');
// modal constants 
const openModalButton = document.querySelector('#modal-btn');
const overlay = document.getElementById('overlay');
const modal = document.querySelector('#modal');

const myLibrary = [];
let numberOfBooks = 0;

openModalButton.addEventListener('click', () => {
  openModal(modal);
});

overlay.addEventListener('click', () => {
  closeModal(modal);
});

const addBook = (event) => {
  const bookName = document.getElementById('book');
  const bookAuthor = document.getElementById('author');
  const bookPages = document.getElementById('pages');
  const isRead = document.getElementById('is-read');
  wasRead(isRead);
  const book = {
    name: bookName.value,
    author: bookAuthor.value,
    pages: bookPages.value,
    isRead: isRead.value,
    order: 0
  }
  if (book.name !== '' && book.name.length <= 20 &&
    book.author !== '' && book.author.length <= 20 && 
    book.pages !== '' && book.pages.length <= 20) {
    event.preventDefault();
    myLibrary.push(book);
    closeModal();
    resetForm();
    book.order = creteBookDiv();
  }
  console.table(myLibrary);
}

submitButton.addEventListener('click', addBook);

function creteBookDiv() {
  for (; numberOfBooks < myLibrary.length; numberOfBooks += 1){
    const book = document.createElement('div');
    bookGrid.appendChild(book);
    fillBookDiv(book);
  }
  return numberOfBooks - 1;
}

function fillBookDiv(book) {
  // book name
  const bookName = document.createElement('div');
  book.appendChild(bookName);
  bookName.textContent = myLibrary[numberOfBooks].name;
  // book author
  const bookAuthor = document.createElement('div');
  book.appendChild(bookAuthor);
  bookAuthor.textContent = myLibrary[numberOfBooks].author;
  // book number of pages
  const bookPages = document.createElement('div');
  book.appendChild(bookPages);
  bookPages.textContent = myLibrary[numberOfBooks].pages;
  // is read button
  const isRead = document.createElement('button');
  book.appendChild(isRead);
  isRead.textContent = myLibrary[numberOfBooks].isRead;
  setWasReadColor(isRead);
  // edit button
  const edit = document.createElement('button');
  book.appendChild(edit);
  edit.textContent = 'Edit';
  // remove button
  const remove = document.createElement('button');
  book.appendChild(remove);
  remove.textContent = 'Remove';
}

function wasRead(isRead) {
  if (isRead.checked === true) {
    isRead.value = 'Read';
    return;
  }
  isRead.value = 'Not read';
}

function setWasReadColor(isRead) {
  if (isRead.textContent === 'Read') {
    isRead.classList.add('read-green');
    return;
  }
  isRead.classList.add('not-read-red');
}

function resetForm() {
  setTimeout(() => {
    form.reset();
  }, 100);
}

function openModal() {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  resetForm();
}