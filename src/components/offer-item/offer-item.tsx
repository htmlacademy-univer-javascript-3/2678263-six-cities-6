import { Link } from 'react-router-dom';
import { OfferPreview } from '../../type/offer';
import { AppRoute } from '../../const';

type OfferItemSize = 'small' | 'large';
type OfferItemProps = {
  offer: OfferPreview;
  block: string;
  size?: OfferItemSize;
  onOfferItemHover?: () => void;
  onOfferItemLeave?: () => void;
};

const sizeMap: Record<OfferItemSize, { width: string; height: string }> = {
  small: { width: '150', height: '110' },
  large: { width: '260', height: '200' },
};

export default function OfferItem({
  offer,
  block,
  size = 'large',
  onOfferItemHover,
  onOfferItemLeave,
}: OfferItemProps) {
  const { isPremium, previewImage, id, price, rating, title, type } = offer;

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => {
        onOfferItemHover?.();
      }}
      onMouseLeave={() => {
        onOfferItemLeave?.();
      }}
      data-testid="offer-item"
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            alt={title}
            {...sizeMap[size]}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
