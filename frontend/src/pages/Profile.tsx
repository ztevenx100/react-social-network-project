const Profile = () => {
  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      
      <div className="profile-info">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="profile-avatar" 
        />
        
        <div className="profile-details">
          <h2>John Doe</h2>
          <p>@johndoe</p>
          <p>Joined: January 2025</p>
          <p>Bio: React developer passionate about creating amazing web experiences.</p>
        </div>
      </div>
      
      <section className="user-stats">
        <div className="stat">
          <h3>Posts</h3>
          <span>42</span>
        </div>
        <div className="stat">
          <h3>Followers</h3>
          <span>256</span>
        </div>
        <div className="stat">
          <h3>Following</h3>
          <span>128</span>
        </div>
      </section>
    </div>
  );
};

export default Profile;
