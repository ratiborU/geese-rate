import styles from "./star.module.css";
import { useState } from 'react';
import Star from "./Star";


type StarRateProps = {
  changeRate: (rate: number) => void
}

const StarRate = (props: StarRateProps) => {
  const { changeRate } = props;
  const [hoverRate, setHoverRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);

  return (
    <div className={styles.starRate}>
      {...[...Array(5)].map((_x, i) =>
        <Star
          key={i}
          currentRate={i}
          hoverRate={hoverRate}
          selectedRate={selectedRate}
          changeSelectedRate={(rate: number) => {
            setSelectedRate(rate);
            changeRate(rate);
          }}
          changeHoverRate={(rate: number) => setHoverRate(rate)}
        />
      )}
    </div>
  );
};

export default StarRate;