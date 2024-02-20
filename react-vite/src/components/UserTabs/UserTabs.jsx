function UserTabs({ setActiveTab }) {
    return (
        <div className="user-tabs">
            <button onClick={() => setActiveTab('hobbies')}>Hobbies</button>
            {/* <button onClick={() => setActiveTab('bookmarks')}>Bookmarks</button> */}
            <button onClick={() => setActiveTab('reviews')}>Reviews</button>
        </div>
    );
}

export default UserTabs;
