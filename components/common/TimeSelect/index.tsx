import {
  ButtonType,
  LONG_TERM,
  MEDIUM_TERM,
  SHORT_TERM,
} from "utils/constants";
import s2 from "./styles.module.scss";
import CustomButton from "../CustomButton";

const TimeSelect = ({ setTerm, resetSaved }) => {
  return (
    <div className={s2.row}>
      <CustomButton
        type={ButtonType.Button}
        label="Past Month"
        onClick={() => {
          setTerm(SHORT_TERM);
          resetSaved();
        }}
      />
      <CustomButton
        type={ButtonType.Button}
        label="Past 6 Months"
        onClick={() => {
          setTerm(MEDIUM_TERM);
          resetSaved();
        }}
      />
      <CustomButton
        type={ButtonType.Button}
        label="All Time"
        onClick={() => {
          setTerm(LONG_TERM);
          resetSaved();
        }}
      />
    </div>
  );
};

export default TimeSelect;
