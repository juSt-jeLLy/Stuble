import "../../styles/Auction.css";

function AuctionList({ bids, user }) {
  return (
    <div>
      {bids.map((bid, idx) => (
        <div className="chat-message" key={idx}>
          <div className={bid.User === user ? 'float-right' : 'float-left'}>
            <span className="sender">{bid.User}:</span>
            <span className="message">{bid.Bid}</span>
            <span className="timestamp">12:35 PM</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuctionList;
