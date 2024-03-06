
let buttonModal = document.querySelector('.delivery__button');
let modal = document.querySelector('.modal-container');
let modalSuccess = document.querySelector('.modal-container-success');
let modalFieldPhone = document.querySelector('.modal-page__input--phone');
let modalFieldName = document.querySelector('.modal-page__input--name');
let sendButton = document.querySelector('.modal-page__send-button');
let closeSuccessButton = document.querySelector('.modal-page__success-close-button');
let successButton = document.querySelector('.modal-page__success-button');
let modalCloseButton = document.querySelector('.modal-page__close-button');


const isEscapeKey = (evt) => evt.key === 'Escape';

let pageBody = document.querySelector('body');

const openCloseModal = () => {

  const onModalFormEscDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModalWindow();
      closeSuccessModal();
    }

    function closeModalWindow() {
      closeModal();
      document.removeEventListener('keydown', onModalFormEscDown);
    }
  };

  const closeSuccessModal = () => {
    modalSuccess.classList.remove('modal-container-success--opened');
    modalSuccess.classList.add('modal-container-success--closed');
    pageBody.classList.remove('no-overflow');
    document.removeEventListener('keydown', onModalFormEscDown);
  };

  const openModal = function () {
    modal.classList.remove('modal-container--closed');
    modal.classList.add('modal-container--opened');
    modalFieldName.value = '';
    modalFieldPhone.value = '';
    pageBody.classList.add('no-overflow');
    document.addEventListener('keydown', onModalFormEscDown);
    closeSuccessButton.addEventListener('click', closeSuccessModal);
    successButton.addEventListener('click', closeSuccessModal);
    modalCloseButton.addEventListener('click', closeModal);
    buttonModal.removeEventListener('click', openModal);

  };

  const closeModal = () => {
    modal.classList.remove('modal-container--opened');
    modal.classList.add('modal-container--closed');
    pageBody.classList.remove('no-overflow');
    document.removeEventListener('keydown', onModalFormEscDown);
  };

  const opensuccessModal = function () {
    modal.classList.add('modal-container--closed');
    modal.classList.remove('modal-container--opened');
    modalSuccess.classList.add('modal-container-success--opened');
    modalSuccess.classList.remove('modal-container-success--closed');
    sendButton.removeEventListener('click', opensuccessModal);
  }

  buttonModal.addEventListener('click', function () {
    openModal();
    sendButton.addEventListener('click', opensuccessModal);
  });
};

openCloseModal();

const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
  },
});
$(document).ready(function () {
  $("#phone").mask("+7(999) 999-9999");
});