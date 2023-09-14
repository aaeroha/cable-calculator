import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/reduxTypes";
import { getCables } from "../../redux/thunk/getCables";
import "./index.scss";

export default function Calculator() {
  const dispatch = useDispatch();
  const cablesList = useSelector((state: RootState) => state.calcSlice.cables);

  const [selectGroup, setGroup] = useState<string>("");
  const [selectSubGroup, setSubGroup] = useState<string>("");
  const [inputLength, setInputLength] = useState<number>(0);
  const [cableTotalWeight, setcableTotalWeight] = useState<number>(0);

  const groupList = useMemo(() => {
    return Object.keys(cablesList);
  }, [cablesList]);

  const subGroupList = useMemo(() => {
    return selectGroup ? Object.keys(cablesList[selectGroup]) : [];
  }, [cablesList, selectGroup]);

  const cableWeightHandler = () => {
    setcableTotalWeight(
      cablesList[selectGroup][selectSubGroup][0]["value"] * inputLength
    );
  };

  const scheckValues = () => {
    if (selectSubGroup) setSubGroup("");
    if (inputLength) setInputLength(0);
    if (cableTotalWeight) setcableTotalWeight(0);
  };

  const toggleGroupHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(e.target.value);
    scheckValues();
  };

  const toggleSubGroupHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubGroup(e.target.value);
    scheckValues();
  };

  useEffect(() => {
    (function () {
      dispatch(getCables());
    })();
  }, []);

  return (
    <div className="calc">
      <h1>Калькулятор массы кабеля:</h1>
      <div className="container">
        <div className="calc-form">
          <label>
            Группа маркаразмера:
            <select
              className="calc-form__input"
              value={selectGroup}
              onChange={toggleGroupHandler}
            >
              <option value="" defaultValue>
                &mdash;
              </option>
              {groupList.map((key, i) => (
                <option key={"grup-" + i} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>

          <label>
            Подгруппа маркаразмера:
            <select
              className="calc-form__input"
              value={selectSubGroup}
              disabled={!selectGroup}
              onChange={toggleSubGroupHandler}
            >
              <option value="" defaultValue>
                &mdash;
              </option>
              {subGroupList.map((key, i) => (
                <option key={"sub" + i} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>

          <label>
            Длина(км):
            <input
              className="calc-form__input"
              disabled={!selectSubGroup}
              type="number"
              min="0"
              value={inputLength ? inputLength : ""}
              onChange={(e) => setInputLength(e.target.value)}
            />
          </label>

          <button
            className="calc-form__btn btn"
            disabled={!inputLength}
            onClick={() => cableWeightHandler()}
          >
            Расcчитать
          </button>
          {cableTotalWeight ? (
            <>
              <h3>Итого: {cableTotalWeight.toFixed(1)} кг</h3>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
