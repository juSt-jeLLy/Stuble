import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import AuctionList from './AuctionList.js';
import '../../styles/Auction.css';
import AppContext from '../../context/AppContext';

const auctionserver = process.env.REACT_APP_AUCTIONSERVER;
const ENDPOINT = `${auctionserver}`;
const socket = io(ENDPOINT, {
  transports: ['websocket', 'polling'],
});

function Auction() {
  const { user } = useContext(AppContext);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState('');
  const [Code, setCode] = useState('');
  const [bids, setBids] = useState([]);
  const [Start, setStart] = useState(0);
  const [Cuser, setCuser] = useState('');
  const [sDate, setSDate] = useState('');
  const [cDate, setCDate] = useState(new Date());
  const [Hig, setHig] = useState(0);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuctionEnded) {
      alert("The auction has ended. No more bids can be placed.");
      return;
    }
    if (!amount || amount <= 0) {
      alert("Please enter a valid bid amount");
      return;
    }
    if (Hig < amount) {
      setPrice(amount);
      socket.emit('send_bid', { bid: amount, Code, user });
    } else {
      alert("Bid must be higher than current highest bid");
      return;
    }
    setAmount('');
  };

  const SubmitCode = (event) => {
    event.preventDefault();
    socket.emit('join room', { Code });
  };

  useEffect(() => {
    socket.on("auth_error", (data) => {
      alert(data.msg);
    });

    socket.on("room_error", (data) => {
      alert("Cannot find room with this id");
    });

    socket.on("startDetails", (data) => {
      setStart(data.StartBid);
      setSDate(new Date(data.endDate).toLocaleString());
    });

    socket.on("curr_bid", (data) => {
      setHig(data.Bid);
      setCuser(data.User);
    });

    socket.on("bids", (data) => {
      setBids((prevBids) => {
        const newBids = data.filter(
          (bid) => !prevBids.some((prevBid) => prevBid._id === bid._id)
        );
        return [...prevBids, ...newBids];
      });
    });

    socket.on("receive_bid", (data) => {
      setBids((prevBids) => [...prevBids, data]);
      setHig(data.Bid);
      setCuser(data.User);
    });

    socket.on("auction_ended", () => {
      setIsAuctionEnded(true);
      alert("The auction has ended.");
    });

    const checkAuctionEnd = () => {
      const endTime = new Date(sDate).getTime();
      const currentTime = new Date().getTime();
      if (currentTime >= endTime) {
        setIsAuctionEnded(true);
      }
    };

    const timer = setInterval(checkAuctionEnd, 1000);
    const dateTimer = setInterval(() => setCDate(new Date()), 1000);

    return () => {
      clearInterval(timer);
      clearInterval(dateTimer);
      socket.off("receive_bid");
      socket.off("auth_error");
      socket.off("room_error");
      socket.off("startDetails");
      socket.off("curr_bid");
      socket.off("bids");
      socket.off("auction_ended");
    };
  }, [sDate]);

  return (
    <div className="auction-container">
      <h1>Enter Auction Code</h1>
      <form onSubmit={SubmitCode} className="auction-form">
        <input
          type="text"
          value={Code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Auction room code"
        />
        <button type="submit">Submit</button>
      </form>

      <div className="bid-info">
        <h3>Initial Bid: {Start} | Highest Bid: {Hig}</h3>
        <h3>End Date: {sDate} | Current: {cDate.toLocaleString()}</h3>
      </div>
      {isAuctionEnded ? (
        <div className="bid-winner">
          {Cuser === user ? "You Win!" : `${Cuser} wins the Auction!`}
        </div>
      ) : (
        <>
          <div className="auction-chat">
            <AuctionList bids={bids} user={user} />
          </div>
          <form onSubmit={handleSubmit} className="auction-form">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter your bid..."
            />
            <button type="submit">Place Bid</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Auction;
