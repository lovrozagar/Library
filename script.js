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

let myLibrary = [];
function Book(title, author, pages, read, order) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.order = order;
}

modalSubmitButton.addEventListener('click', (event) => {
  submitBook(event); // every valid from submitted ads a book to library and displays it
});

overlay.addEventListener('click', () => {
  cardNumber = 0;
  edit = false;
});

function submitBook(event) {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');
  if (title.value !== '' && author.value !== '' && pages.value !== '' && pages.value > 0 && pages.value <= 10000) {
    event.preventDefault();
    const order = myLibrary.length;
    if (!edit) {
      addBookToLibrary(title.value, author.value, pages.value, read.checked, order);
    }
    else {
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
  for (let i = 0; i < removeCards.length; i += 1){
    removeCards[i].remove();
  }

  for (let i = 0; i < myLibrary.length; i += 1){
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
    editButton.textContent = 'Edit'
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
    }
    else {
      read.classList.add('not-read');
    }
    bookCard.appendChild(read);
  
    read.addEventListener('click', () => {
      setTimeout(() => {
        if (myLibrary[i].read === false) {
          myLibrary[i].read = true;
        }
        else {
          myLibrary[i].read = false
        }
        displayBooks();
      }, 100);
    });

    // Adds remove button to card 
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove'
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
}

function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library')) || [];
} 

function saveBooksLocal() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

addLocalStorage();
displayBooks();