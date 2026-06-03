import { useEffect, useState } from "react";

function App() {
  const [countUseEffectWithoutArray, setCountUseEffectWithoutArray] =
    useState(0);

  const [countUseEffectWithArrayEmpty, setCountUseEffectWithArrayEmpty] =
    useState(0);

  const [
    countUseEffectWithArrayWithValue,
    setCountUseEffectWithArrayWithValue,
  ] = useState(0);

  const [
    clickBotonToUseEffectWithValueInArray,
    setClickBotonToUseEffectWithValueInArray,
  ] = useState(0);

  useEffect(() => {
    setCountUseEffectWithoutArray(countUseEffectWithoutArray + 1);
  });

  useEffect(() => {
    setCountUseEffectWithArrayEmpty(countUseEffectWithArrayEmpty + 1);
  }, []);

  useEffect(() => {
    setCountUseEffectWithArrayWithValue(countUseEffectWithArrayWithValue + 1);
  }, [clickBotonToUseEffectWithValueInArray]);

  const handleClickToUseEffect = () => {
    setClickBotonToUseEffectWithValueInArray(
      clickBotonToUseEffectWithValueInArray + 1,
    );
  };

  return (
    <>
      <h1>USE EFFECT FUNCTIONALITY!!!!</h1>
      <p>Count without array: {countUseEffectWithoutArray}</p>
      <p>Count with array empty: {countUseEffectWithArrayEmpty}</p>
      <p>Count with array and value: {countUseEffectWithArrayWithValue}</p>

      <button onClick={handleClickToUseEffect}>
        Click to useEffect with value in array
      </button>
    </>
  );
}

export default App;
