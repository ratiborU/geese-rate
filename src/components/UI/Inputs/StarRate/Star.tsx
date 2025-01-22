import styles from "./star.module.css";
import star from "../../../../assets/Star 1.svg"
import starGrey from "../../../../assets/Star 8.svg"


type StarProps = {
  currentRate: number,
  hoverRate: number,
  selectedRate: number,
  changeSelectedRate: (rate: number) => void
  changeHoverRate: (rate: number) => void
}

const Star = (props: StarProps) => {
  const { currentRate, hoverRate, selectedRate, changeSelectedRate, changeHoverRate } = props;

  // console.log(props);
  const getStar = () => {
    if (currentRate < selectedRate && hoverRate == 0 && selectedRate != 0) {
      return star
    }
    if (currentRate >= hoverRate) {
      return starGrey
    }

    return star
  }

  return (
    <button
      className={styles.starButton}
      type="button"
      onMouseEnter={() => changeHoverRate(currentRate + 1)}
      onMouseLeave={() => changeHoverRate(0)}
      onClick={() => changeSelectedRate(currentRate + 1)}
    >
      <img src={getStar()} alt="" />
    </button>
  );
};

export default Star;