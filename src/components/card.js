import PropTypes from 'prop-types';

function Card(props) {
  const { pok, handleCardClick } = props;
  return (
    <button type="button" onClick={() => handleCardClick(pok.id)}>
      <img src={pok.sprites.front_default} alt={pok.name} />
      <p>{pok.name}</p>
    </button>
  );
}
Card.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  pok: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Card;
