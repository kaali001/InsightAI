

const Team = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>
      <p className="text-gray-600 mb-4">Invite and manage your team members.</p>
      <form className="mb-4 flex gap-2">
        <input type="email" placeholder="Team member email" className="flex-1 border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Invite</button>
      </form>
      <ul className="bg-white rounded shadow p-4 space-y-2">
        <li className="flex justify-between">john@example.com <span className="text-sm text-gray-500">Admin</span></li>
        <li className="flex justify-between">jane@example.com <span className="text-sm text-gray-500">Editor</span></li>
      </ul>
    </div>
  );
};

export default Team;
