


const Profile = () => {
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
        <input type="email" placeholder="Email Address" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
