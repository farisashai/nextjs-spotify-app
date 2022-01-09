import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from "utils/constants";
import s from "styles/Home.module.scss";
import s2 from "./styles.module.scss";

const TimeSelect = ({ setTerm }) => {
  return (
    <div className={s2.row}>
      <button onClick={() => setTerm(SHORT_TERM)} className={s.button}>
        Past month
      </button>
      <button onClick={() => setTerm(MEDIUM_TERM)} className={s.button}>
        Past 6 month
      </button>
      <button onClick={() => setTerm(LONG_TERM)} className={s.button}>
        All time
      </button>
    </div>
  );
};

export default TimeSelect;
