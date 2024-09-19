function MainContent({ response }) {
  return (
    <div className="flex flex-col flex-grow mt-4">
      <h2 className="text-xl font-semibold">Response</h2>
      <div
        className="bg-white p-4 border border-gray-300 rounded overflow-y-auto flex-grow text-start"
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </div>
  );
}

export default MainContent;
