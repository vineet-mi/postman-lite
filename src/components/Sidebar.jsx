/* eslint-disable react/prop-types */
function Sidebar({ collections, handleLogout, handleSelectCollection, handleNewCollection }) {
    return (
      <div className="w-full lg:w-1/4 bg-gray-800 text-white p-6 flex flex-col text-start">
        <h2 className="text-2xl font-semibold mb-6">Collections</h2>
        <div className="mb-4 overflow-y-auto flex-1">
          {collections.map((collection) => (
            <button
              key={collection.id}
              className="bg-gray-700 text-white p-2 rounded mb-2 hover:bg-gray-600 transition duration-200"
              onClick={() => handleSelectCollection(collection)}
            >
              {collection.name}
            </button>
          ))}
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600 transition duration-200"
          onClick={handleNewCollection}
        >
          New Collection
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }
  
  export default Sidebar;
  