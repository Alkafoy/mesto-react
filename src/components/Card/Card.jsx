export default function Card({card, openCardClick}) {
    return (
        <article>
            <img
                className="element__image"
                src={card.link}
                alt={`Где-то в ${card.name}`}
                onClick={() => openCardClick({name: card.name, link: card.link})}
            />
            <div className="element__caption">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like" type="button" aria-label="Нравится"/>
                    <p className="element__like-counter">0</p>
                </div>
            </div>
            <button className="element__trash" type="button"/>
        </article>
    )
}