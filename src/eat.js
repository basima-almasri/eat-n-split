import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const data = [...initialFriends];

  const [friends, setFriends] = useState(data);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [balance, setBalance] = useState(0);
  const [billValue, setBillValue] = useState(0);
  const [expense, setExpense] = useState(0);
  const [personPay, serPersonPay] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isClicked, setIsClick] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  function handleIsAdd() {
    setIsAdd(!isAdd);
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
  }
  /////////////////////////////////////////
  function handleSubmitSplit(e, name) {
    e.preventDefault();
    console.log(name);
    const friendExpense = billValue - expense;
    setBalance(friendExpense);
  }

  /////////////////////////////////////////////
  function handleClickSelect(id) {
    const frirendSelected = friends.find((friend) => friend.id === id);
    setName(frirendSelected.name);

    setIsSelected(!isSelected);
  }
  //////////////////////////////

  function handleClick() {
    setIsClick(!isClicked);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <img src={`${friend.image}`} alt="" />
              <h3>{friend.name}</h3>
              <p className={personPay === friend.name ? "green" : "red"}>
                {personPay === friend.name
                  ? `${friend.name}owe you ${balance}`
                  : ` you owe ${friend.name} ${expense}`}
              </p>
              <button
                className="button"
                onClick={() => handleClickSelect(friend.id)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
        <button className="button" onClick={handleClick}>
          Add friend
        </button>
        )
      </div>
      <div>
        {isClicked && (
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
            <button className="button" onClick={handleIsAdd}>
              Add
            </button>
          </form>
        )}
      </div>
      {isSelected && (
        <form
          className="form-split-bill"
          onSubmit={(e) => handleSubmitSplit(e, name)}
        >
          <h2>SPLIT A BILL WITH {name} </h2>
          <label>Bill value</label>
          <input
            type="text"
            value={billValue}
            onInput={(e) => setBillValue(Number(e.target.value))}
          />
          <label>Your expense</label>
          <input
            type="text"
            value={expense}
            onInput={(e) => setExpense(Number(e.target.value))}
          />
          <label>{name}'s </label>
          <input type="text" readOnly value={billValue - expense} />
          <label>Who is paying the bill?</label>
          <select
            value={personPay}
            onChange={(e) => serPersonPay(e.target.value)}
          >
            <option value={"you"}>You</option>
            <option value={name}>{name}</option>
          </select>
          <button className="button">Split bill</button>
        </form>
      )}
    </div>
  );
}
