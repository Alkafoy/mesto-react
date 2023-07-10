import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function AddPlacePopup({onClose, isOpen, onAddPlace, isSending, onOverlayClick}) {


    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ title: document.getElementById('title-input').value, link: document.getElementById('url-input').value });

    }

    return (
        <PopupWithForm
            name='addCard'
            title='Новое место'
            nameButton='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onOverlayClick}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_picture-title"
                id="title-input"
                name="title"
                type="text"
                placeholder="Название"
                required=""
                minLength={2}
                maxLength={30}
            />
            <span className="title-input-error popup__input-error"/>
            <input
                className="popup__input popup__input_type_picture-link"
                id="url-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span className="url-input-error popup__input-error"/>
        </PopupWithForm>
    )
}