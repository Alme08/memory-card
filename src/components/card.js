import PropTypes from 'prop-types';

function Card(props) {
  const { pok } = props;
  return (
    <div>
      <img src={pok.sprites.front_default} alt={pok.name} />
      <p>{pok.name}</p>
    </div>
  );
}
Card.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  pok: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Card;
