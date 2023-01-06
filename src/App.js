import { useState, useEffect } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-row-gap: 1rem; */
  /* grid-column-gap: 1rem; */
`;

const Item = styled.div`
  /* background-color: lightcoral; */
  width: 100%;
  height: 100px;
  border: 5px solid black;
  /* :nth-child(-n + 3) {
    border-top: 10px solid black;
    border-left: 10px solid black;
  }
  :nth-last-child(-n + 3) {
    border-bottom: 10px solid black;
  }
  :nth-child(n + 3) {
    border-left: 10px solid black;
  } */

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 42px;
  font-weight: 700;
  color: ${({ value }) => (value === "O" ? "lightgreen" : "lightblue")};
`;

const Container = styled.div`
  padding: 1rem;
`;

const DEFAULT_STATE = [
  { index: 0 },
  { index: 1 },
  { index: 2 },
  { index: 3 },
  {
    index: 4,
  },
  {
    index: 5,
  },
  { index: 6 },
  {
    index: 7,
  },
  {
    index: 8,
  },
];
function App() {
  const [itemList, setItemList] = useState(DEFAULT_STATE);
  const [isMyTurn, setIsMyTurn] = useState(true);

  const updateTurn = (index) => {
    setIsMyTurn((prev) => !prev);
    setItemList((prev) => {
      return [...prev].map((item) =>
        item.index === index
          ? { ...item, value: isMyTurn ? "O" : "X" }
          : { ...item }
      );
    });
  };

  useEffect(() => {
    const winCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCondition.length; i++) {
      const [a, b, c] = winCondition[i];
      if (
        itemList[a]?.value &&
        itemList[a]?.value === itemList[b]?.value &&
        itemList?.[a].value === itemList?.[c].value
      ) {
        setItemList(DEFAULT_STATE);
        return window.alert(`the winner is :::: ${itemList?.[a].value}`);
      }
    }
    return null;
  }, [itemList]);

  return (
    <Container>
      <Grid>
        {itemList.map((item) => {
          return (
            <Item
              value={item.value}
              key={item.index}
              onClick={() => updateTurn(item.index)}
            >
              {item.value}
            </Item>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;
