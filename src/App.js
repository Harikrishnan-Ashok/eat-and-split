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
  const [selectedFriend, setselectedFriend] = useState(null);
  const [friends, setfriends] = useState(initialFriends);
  const [showAddFriend, setAddFriend] = useState(false);

  function handleSetFriend(friend) {
    setselectedFriend(friend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          handleSetFriend={handleSetFriend}
        ></FriendList>
        {showAddFriend && (
          <FormAddFriend
            friends={friends}
            setfriends={setfriends}
            setAddFriend={setAddFriend}
          ></FormAddFriend>
        )}
        <Button onClick={() => setAddFriend(!showAddFriend)}>
          {showAddFriend ? "Close ❌" : "Add New Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill selectedFriend={selectedFriend}></FormSplitBill>
      )}
    </div>
  );
}

function FriendList({ friends, handleSetFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSetFriend={handleSetFriend}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend, handleSetFriend }) {
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
      <Button onClick={() => handleSetFriend(friend)}>Select</Button>
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

function FormAddFriend({ setfriends, setAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();
    if (!name || !image) {
      return;
    }
    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    setfriends((curr) => [...curr, newFriend]);
    setImage("https://i.pravatar.cc/48");
    setName("");
    setAddFriend(false);
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>🕺Name :</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      ></input>
      <label>📸Image Url :</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(() => e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>split the bill with {selectedFriend.name}</h2>
      <label>🤑Bill Value :</label>
      <input type="text"></input>
      <label>🤑your expense :</label>
      <input type="text"></input>
      <label>🤑 {selectedFriend.name}'s Expense :</label>
      <input type="text" disabled></input>
      <label>🤑Who paid ? :</label>
      <select>
        <option value="user">you</option>
        <option value="friend"> {selectedFriend.name} </option>
      </select>
      <Button>Split the Bill</Button>
    </form>
  );
}
