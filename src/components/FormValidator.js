export default class FormValidator {
	constructor(object, formElement) {
		this._formElement = formElement;
		this._inputSelector = object.inputSelector;
		this._submitButtonSelector = object.submitButtonSelector;
		this._inactiveButtonClass = object.inactiveButtonClass;
		this._inputErrorClass = object.inputErrorClass;
		this._errorClass = object.errorClass;
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;

		errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	}

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		}
		else {
			this._hideInputError(inputElement);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_toggleButtonState(inputList) {
		const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		if (this._hasInvalidInput(inputList)) {
			this.removeButtonActive(buttonElement, this._inactiveButtonClass);
		}
		else {
			this.addButtonActive(buttonElement, this._inactiveButtonClass);
		}
	}

	removeButtonActive(buttonElement) {
		buttonElement.classList.add(this._inactiveButtonClass);
		buttonElement.disabled = true;
	}

	addButtonActive(buttonElement) {
		buttonElement.classList.remove(this._inactiveButtonClass);
		buttonElement.disabled = false;
	}

	_setEventListeners() {
		const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

		this._toggleButtonState(inputList);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);

				this._toggleButtonState(inputList);
			});
		});
	}

	hideAllErrors() {
		const inputElements = Array.from(this._formElement.querySelectorAll('.modal__text'));
		const errorElement = Array.from(this._formElement.querySelectorAll('.modal__input-error'));

		inputElements.forEach((input) => {
			input.classList.remove(this._inputErrorClass);
		});

		errorElement.forEach((error) => {
			error.classList.remove(this._errorClass);
			error.textContent = '';
		});
	}

	enableValidation() {
		this._setEventListeners();
	}
}
