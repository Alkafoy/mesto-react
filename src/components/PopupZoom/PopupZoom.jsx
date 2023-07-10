export default function PopupZoom(card, isOpen, onclose) {
    return (
        <div className={`popup popup-zoom ${isOpen && 'popup_opened'}`}>
            <div className="popup-zoom__container">
                <button className="popup__close-icon" onClick={onclose}/>
                <img className="popup-zoom__image" src="#" alt=""/>
                <h2 className="popup-zoom__caption"/>
            </div>
        </div>
    )
}