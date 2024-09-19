import { useState } from "react";

/* eslint-disable react/prop-types */

function ApiForm({
  url,
  method,
  headers,
  params,
  body,
  setUrl,
  setMethod,
  setHeaders,
  setParams,
  setBody,
  handleApiRequest,
  handleSaveCollection,
  activeTab, // New prop
  setActiveTab, // New prop
}) {
  const tabs = [
    { label: "None", value: "none" },
    { label: "Headers", value: "headers" },
    { label: "Params", value: "params" },
    { label: "Body", value: "body" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">API Tester</h1>
      <div className="flex flex-col lg:flex-row mb-6 space-x-0 lg:space-x-4">
        <input
          className="flex-1 mb-4 lg:mb-0 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="flex justify-center mb-6 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded ${
              activeTab === tab.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition duration-200`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "headers" && (
        <textarea
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Headers (JSON format)"
          value={headers || ""} // Show empty field if null or empty
          onChange={(e) =>
            setHeaders(e.target.value === "" ? null : e.target.value)
          } // Set to null if empty
        />
      )}

      {activeTab === "params" && (
        <textarea
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Params (JSON format)"
          value={params || ""} // Show empty field if null or empty
          onChange={(e) =>
            setParams(e.target.value === "" ? null : e.target.value)
          } // Set to null if empty
        />
      )}

      {activeTab === "body" && (
        <textarea
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Body (JSON format)"
          value={body || ""} // Show empty field if null or empty
          onChange={(e) =>
            setBody(e.target.value === "" ? null : e.target.value)
          } // Set to null if empty
        />
      )}

      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200 w-full"
          onClick={handleApiRequest}
        >
          Send
        </button>
        <button
          className="bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600 transition duration-200 w-full"
          onClick={handleSaveCollection}
        >
          Save Collection
        </button>
      </div>
      {activeTab === "none" && (
        <p className="text-gray-500 mt-4">No additional input selected.</p>
      )}
    </div>
  );
}

export default ApiForm;
