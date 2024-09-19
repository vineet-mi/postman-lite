import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ApiForm from "./ApiForm";
import MainContent from "./MainContent";

function Home() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [params, setParams] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [body, setBody] = useState(null);
  const [response, setResponse] = useState("");
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [activeTab, setActiveTab] = useState("none");


  const navigate = useNavigate();

  // Fetch collections for the user
  useEffect(() => {
    const fetchCollections = async () => {
      const user = auth.currentUser;
      const uid = user ? user.uid : null;

      if (!uid) {
        console.error("User not authenticated");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/collections`, {
          params: { uid },
        });
        setCollections(res.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Handle API request
  const handleApiRequest = async () => {
    try {
      const config = {
        method,
        url,
        headers: headers ? JSON.parse(headers) : undefined,
        params: params ? JSON.parse(params) : undefined,
        data: body ? JSON.parse(body) : undefined,
      };

      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      if (err.response) {
        setResponse(`Error ${err.response.status}: ${err.response.data}`);
      } else if (err.request) {
        setResponse("Error: No response received from the server.");
      } else {
        setResponse(`Error: ${err.message}`);
      }
    }
  };

  // Save collection (update if it exists)
  const handleSaveCollection = async () => {
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (!uid) {
      alert("You need to be logged in to save a collection.");
      return;
    }

    if (!url) {
      alert("Please enter a URL before saving the collection.");
      return;
    }

    const name = currentCollection
      ? currentCollection.name
      : prompt("Enter a name for this collection:");
    if (!name) return;

    try {
      if (currentCollection) {
        // Update existing collection
        await axios.put(`http://localhost:5000/api/collections/${currentCollection.id}`, {
          uid: uid || null,
          name: name || null,
          url: url || null,
          method: method || null,
          params: params ? JSON.parse(params) : null,
          headers: headers ? JSON.parse(headers) : null,
          body: body ? JSON.parse(body) : null,
        });

        alert("Collection updated successfully!");
      } else {
        // Create new collection
        await axios.post("http://localhost:5000/api/save-collection", {
          uid,
          name,
          url,
          method,
          params,
          headers,
          body,
        });
        alert("Collection saved successfully!");
      }
      const newCollections = await axios.get(`http://localhost:5000/api/collections`, {
        params: { uid },
      });
      setCollections(newCollections.data);
    } catch (error) {
      console.error("Error saving collection:", error);
    }
  };

  // Handle selecting a collection from the sidebar
  const handleSelectCollection = (collection) => {
    setCurrentCollection(collection);
    setUrl(collection.url);
    setMethod(collection.method);
    setParams(collection.params);
    setHeaders(collection.headers);
    setBody(collection.body);
  
    // Properly check for non-empty values and set the active tab accordingly
    if (collection.params && collection.params.trim() !== "") {
      setActiveTab("params");
    } else if (collection.body && collection.body.trim() !== "") {
      setActiveTab("body");
    } else if (collection.headers && collection.headers.trim() !== "") {
      setActiveTab("headers");
    } else {
      setActiveTab("none");
    }
  };
  
  

  // Handle clearing the form for a new collection
  const handleNewCollection = () => {
    setCurrentCollection(null);
    setUrl("");
    setMethod("GET");
    setParams("");
    setHeaders("");
    setBody("");
    setResponse("");
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row  p-5">
      <Sidebar
        collections={collections}
        handleLogout={handleLogout}
        handleSelectCollection={handleSelectCollection}
        handleNewCollection={handleNewCollection}
      />
      <div className="flex-1 p-4">
        <ApiForm
          url={url}
          method={method}
          headers={headers}
          params={params}
          body={body}
          setUrl={setUrl}
          setMethod={setMethod}
          setHeaders={setHeaders}
          setParams={setParams}
          setBody={setBody}
          handleApiRequest={handleApiRequest}
          handleSaveCollection={handleSaveCollection}
          activeTab={activeTab}  // Pass active tab to ApiForm
          setActiveTab={setActiveTab}  // Pass function to change tab
        />
        <MainContent response={response} />
      </div>
    </div>
  );
}

export default Home;
