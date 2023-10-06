import { useEffect, useState } from "react";
import "./index.css";
import _ from "lodash";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 0,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 0,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const billData = { billValue: 0, expense: 0, friendExpense: 0, personPay: "" };
export default function App() {
  const data = [...initialFriends];

  const [friends, setFriends] = useState(data);
  const [selectFriend, setSelectFriend] = useState({});
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bill, setBill] = useState(billData);

  const [isClicked, setIsClick] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  // useEffect(() => {
  //   if (selectFriend?.id)
  //     setFriends((oldfr) => {
  //       console.log("updated");
  //       const cloneObj = _.cloneDeep(oldfr);
  //       const updatedFriend = cloneObj.map((friend) =>
  //         friend.id === selectFriend.id ? selectFriend : friend
  //       );

  //       return updatedFriend;
  //     });
  // }, [selectFriend]);
  //////////////////////////////////

  function handleClickSelect(id) {
    setIsSelected((isSelected) => (selectFriend?.id !== id ? id : false));

    const frirendSelected = friends.find((friend) => friend.id === id);

    //update the friendSelected
    setSelectFriend((selectFriend) => {
      const deepOnj = _.cloneDeep(frirendSelected);
      return { ...deepOnj };
    });
  }
  function handleClick() {
    setIsClick(!isClicked);
  }
  function addNewFriends(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
  }
  ///////////////////////////////////////////////////
  function handleSubmitAdd(e) {
    e.preventDefault();
    const newFriend = {
      id: Date.now(),
      name: name,
      image: imageUrl,
      balance: 0,
    };
    addNewFriends(newFriend);
    setName("");
    setImageUrl("");
  }
  function handleBill(value, property) {
    setBill((bill) => ({ ...bill, [property]: value }));
  }
  /////////////////////////

  function handleSubmitSplitBill(e) {
    e.preventDefault();
    // setSelectFriend((updatedFriend) => {
    //   const deepCloneObj = _.cloneDeep(updatedFriend);

    //   return { ...deepCloneObj, bill: bill };
    // });
    setSelectFriend((updatedFriend) => {
      const deepCloneObj = _.cloneDeep(updatedFriend);
      const balan =
        bill?.personPay === selectFriend.name
          ? -bill.expense
          : bill.billValue - bill.expense;

      const updatedFriendObj = { ...deepCloneObj, bill: bill, balance: balan };

      setFriends((oldfr) => {
        const cloneObj = _.cloneDeep(oldfr);
        const updatedFriends = cloneObj.map((friend) =>
          friend.id === updatedFriendObj.id ? updatedFriendObj : friend
        );

        return updatedFriends;
      });
      return updatedFriendObj;
    });
  }
  console.log({ friends, selectFriend });
  ////////////////////////////////
  return (
    <div className="app">
      <SideBar>
        <List>
          {friends.map((friend) => (
            <Item
              key={friend.id}
              friend={friend}
              handleClickSelect={handleClickSelect}
            ></Item>
          ))}
        </List>
        <Button handleClick={handleClick}>Add friend</Button>
      </SideBar>
      {!!isClicked && (
        <FormAddFriend
          handleSubmitAdd={handleSubmitAdd}
          setName={setName}
          setImageUrl={setImageUrl}
        />
      )}

      {isSelected && (
        <FormSplitBill
          selectFriend={selectFriend}
          bill={bill}
          handleBill={handleBill}
          handleSubmitSplitBill={handleSubmitSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

///////////////////////////////////////////
function List({ children }) {
  return <ul>{children}</ul>;
}
function Button({ children, handleClick }) {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}
function SideBar({ children }) {
  return <div className="sidebar">{children}</div>;
}
//////////////////////
function Item({ friend, bill, handleClickSelect }) {
  const person = friend.balance > 0 ? "green" : friend.balance < 0 ? "red" : "";
  return (
    <li>
      <img src={`${friend?.image}`} alt="" />
      <h3>{friend.name}</h3>
      <p className={person}>
        {friend?.balance === 0
          ? `you and ${friend?.name} are even`
          : friend.balance > 0
          ? `${friend?.name} owe you ${friend?.balance}`
          : ` you owe ${friend?.name} ${Math.abs(friend.balance)}`}
      </p>

      {/* chose friend to split bill with this friend  */}
      <button className="button" onClick={() => handleClickSelect(friend?.id)}>
        Select
      </button>
    </li>
  );
}
//////////////////////////////////
function FormAddFriend({
  name,
  imageUrl,
  handleSubmitAdd,
  setName,
  setImageUrl,
}) {
  return (
    <form className="form-add-friend" onSubmit={handleSubmitAdd}>
      <label>Friend name:</label>
      <input
        type="text"
        value={name}
        onInput={(e) => setName(e.target.value)}
      />
      <label>Image URL:</label>
      <input
        type="text"
        value={imageUrl}
        onInput={(e) => setImageUrl(e.target.value)}
        placeholder="https://i.pravatar.cc/48"
      />
      <button className="button">Add</button>
    </form>
  );
}
///////////////////////////////////////////////////

function FormSplitBill({
  handleSubmitSplitBill,
  selectFriend,
  bill,
  handleBill,
}) {
  return (
    <form className="form-split-bill" onSubmit={handleSubmitSplitBill}>
      <h2>SPLIT A BILL WITH {selectFriend?.name} </h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill?.billValue}
        onInput={(e) => handleBill(Number(e.target.value), "billValue")}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={bill?.expense}
        onInput={(e) => handleBill(Number(e.target.value), "expense")}
      />
      <label>{selectFriend.name}'s </label>
      <input type="text" readOnly value={bill.billValue - bill.expense} />
      <label>Who is paying the bill?</label>
      <select
        value={bill?.personPay}
        onChange={(e) => handleBill(e.target.value, "personPay")}
      >
        <option value={"you"}>You</option>
        <option value={selectFriend?.name}>{selectFriend?.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
