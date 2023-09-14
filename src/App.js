import { useState } from "react";

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
  const [showAddFriend, setAddFriend] = useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList></FriendList>
        {showAddFriend && <FormAddFriend></FormAddFriend>}
        <Button onClick={() => setAddFriend(!showAddFriend)}>
          {showAddFriend ? "Done" : "Add New Friend"}
        </Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {friend.balance * -1} Rs
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {friend.balance} Rs
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">you and {friend.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🕺Name :</label>
      <input type="text"></input>
      <label>📸Image Url :</label>
      <input type="text"></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>split a bill with x</h2>
      <label>🤑Bill Value :</label>
      <input type="text"></input>
      <label>🤑your expense :</label>
      <input type="text"></input>
      <label>🤑 x's Expense :</label>
      <input type="text" disabled></input>
      <label>🤑Who paid ? :</label>
      <select>
        <option value="user">you</option>
        <option value="friend"> x </option>
      </select>
      <Button>Split the Bill</Button>
    </form>
  );
}
