// import "./ShortlistedInterns.css";
// import React, { useState, useEffect } from "react";
// import Navbar from "../components/navbar/Navbar";

// const ShortlistedInterns = () => {
//   const [interns, setInterns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchShortlistedInterns();
//   }, []);

//   const fetchShortlistedInterns = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/shortlisted-interns");
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setInterns(data.shortlisted_interns || []);
//     } catch (error) {
//       console.error("Error fetching shortlisted interns:", error);
//       setError("Failed to load shortlisted interns. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearAll = async () => {
//     if (!window.confirm("Are you sure you want to delete all shortlisted interns?")) {
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/clear-shortlisted", {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Refresh the list after clearing
//       setInterns([]);
//       alert("All shortlisted interns have been removed.");
//     } catch (error) {
//       console.error("Error clearing shortlisted interns:", error);
//       alert("Failed to clear shortlisted interns. Please try again later.");
//     }
//   };

//   const handleHireIntern = async (intern) => {
//     if (!window.confirm(`Are you sure you want to hire ${intern.name}? An email will be sent to notify them and they will be removed from the shortlist.`)) {
//       return;
//     }
  
//     try {
//       setLoading(true);
      
//       const response = await fetch(`http://127.0.0.1:5000/hire-intern/${intern.cv_id}`, {
//         method: "POST",
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // Show success message
//       alert(`${data.message}`);
      
//       // Remove the intern from the local state since they've been hired and removed from the database
//       setInterns(interns.filter(i => i.cv_id !== intern.cv_id));
      
//     } catch (error) {
//       console.error("Error hiring intern:", error);
//       alert(`Failed to hire intern: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteIntern = async (cv_id) => {
//     if (!window.confirm("Are you sure you want to remove this intern from the shortlist?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/remove-shortlisted/${cv_id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Update the interns list after deletion
//       setInterns(interns.filter(intern => intern.cv_id !== cv_id));
//       alert("Intern removed from shortlist successfully.");
//     } catch (error) {
//       console.error("Error removing intern from shortlist:", error);
//       alert("Failed to remove intern from shortlist. Please try again later.");
//     }
//   };

//   return (
//     <div className="page-container2">
//       <div className="nav-container">
//         <Navbar />
//       </div>
//       <div className="content-wrapper">
//         <div className="shortlisted-header">
//           <div className="header-with-button">
//             <div>
//               <h1>Shortlisted Interns</h1>
//               <p>Candidates you've selected for further consideration</p>
//             </div>
//             {interns.length > 0 && (
//               <button className="clear-all-button" onClick={handleClearAll}>
//                 Clear All
//               </button>
//             )}
//           </div>
//         </div>
        
//         {loading ? (
//           <div className="loading-container">
//             <div className="loader"></div>
//             <p>Loading shortlisted interns...</p>
//           </div>
//         ) : error ? (
//           <div className="error-container">
//             <p className="error-message">{error}</p>
//           </div>
//         ) : interns.length === 0 ? (
//           <div className="empty-state">
//             <h2>No shortlisted interns yet</h2>
//             <p>When you shortlist candidates, they will appear here</p>
//           </div>
//         ) : (
//           <div className="container">
//             <div className="interns-grid">
//               {interns.map((intern, index) => {
//                 const allSkills = Object.values(intern.skills || {}).flat();
//                 return (
//                   <div key={index} className="intern-card">
//                     <div className="intern-role intern-role-shortlisted">
//                       <p>
//                         <a href={intern.cv_link} target="_blank" rel="noopener noreferrer">
//                           <strong>Shortlisted Candidate</strong>
//                         </a>
//                       </p>
//                     </div>
//                     <div className="intern-details">
//                       <h3>{intern.name}</h3>
//                       <p><strong>Education:</strong> {intern.degree}</p>
//                       <p><strong>Contact:</strong> {intern.contact_no}</p>
//                       <p><strong>Email:</strong> {intern.email}</p>
//                       <p><strong>Starting Date:</strong> {intern.starting_date}</p>
//                       <p><strong>University:</strong> {intern.university}</p>
//                       <p><strong>Possible Roles:</strong> {Array.isArray(intern.expected_role) ? intern.expected_role.join(", ") : JSON.stringify(intern.expected_role)}</p>
//                       <p><strong>Year:</strong> {intern.current_year}</p>
//                       <p><strong>Internship Period:</strong> {intern.internship_period}</p>
//                       <p><strong>Working Mode:</strong> {intern.working_mode}</p>
//                       <div className="skills-container">
//                         {allSkills.map((skill, skillIndex) => (
//                           <span key={skillIndex} className="skill-tag">
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="action-buttons">
//                       <a href={intern.cv_link} target="_blank" rel="noopener noreferrer" className="view-cv">
//                         View CV
//                       </a>
//                       <button 
//                         className="hire-button" 
//                         onClick={() => handleHireIntern(intern)}
//                       >
//                         Hire
//                       </button>
//                       <button 
//                         className="delete-button" 
//                         onClick={() => handleDeleteIntern(intern.cv_id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShortlistedInterns;

import "./ShortlistedInterns.css";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";

const ShortlistedInterns = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  
  // Calculate default date (30 days from now)
  const getDefaultDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    fetchShortlistedInterns();
  }, []);

  useEffect(() => {
    // Set default date when date picker is opened
    if (showDatePicker) {
      setSelectedDate(getDefaultDate());
    }
  }, [showDatePicker]);

  const fetchShortlistedInterns = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/shortlisted-interns");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setInterns(data.shortlisted_interns || []);
    } catch (error) {
      console.error("Error fetching shortlisted interns:", error);
      setError("Failed to load shortlisted interns. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete all shortlisted interns?")) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/clear-shortlisted", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Refresh the list after clearing
      setInterns([]);
      alert("All shortlisted interns have been removed.");
    } catch (error) {
      console.error("Error clearing shortlisted interns:", error);
      alert("Failed to clear shortlisted interns. Please try again later.");
    }
  };

  const openDatePicker = (intern) => {
    setSelectedIntern(intern);
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
    setSelectedIntern(null);
  };

  const handleHireIntern = async () => {
    if (!selectedIntern || !selectedDate) return;
    
    if (!window.confirm(`Are you sure you want to hire ${selectedIntern.name}? An email will be sent to notify them and they will be removed from the shortlist.`)) {
      closeDatePicker();
      return;
    }
  
    try {
      setLoading(true);
      
      const response = await fetch(`http://127.0.0.1:5000/hire-intern/${selectedIntern.cv_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          deadline_date: selectedDate 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Show success message
      alert(`${data.message}`);
      
      // Remove the intern from the local state since they've been hired and removed from the database
      setInterns(interns.filter(i => i.cv_id !== selectedIntern.cv_id));
      
      // Close the date picker modal
      closeDatePicker();
      
    } catch (error) {
      console.error("Error hiring intern:", error);
      alert(`Failed to hire intern: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIntern = async (cv_id) => {
    if (!window.confirm("Are you sure you want to remove this intern from the shortlist?")) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/remove-shortlisted/${cv_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the interns list after deletion
      setInterns(interns.filter(intern => intern.cv_id !== cv_id));
      alert("Intern removed from shortlist successfully.");
    } catch (error) {
      console.error("Error removing intern from shortlist:", error);
      alert("Failed to remove intern from shortlist. Please try again later.");
    }
  };

  return (
    <div className="page-container2">
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="content-wrapper">
        <div className="shortlisted-header">
          <div className="header-with-button">
            <div>
              <h1>Shortlisted Interns</h1>
              <p>Candidates you've selected for further consideration</p>
            </div>
            {interns.length > 0 && (
              <button className="clear-all-button" onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading shortlisted interns...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : interns.length === 0 ? (
          <div className="empty-state">
            <h2>No shortlisted interns yet</h2>
            <p>When you shortlist candidates, they will appear here</p>
          </div>
        ) : (
          <div className="container">
            <div className="interns-grid">
              {interns.map((intern, index) => {
                const allSkills = Object.values(intern.skills || {}).flat();
                return (
                  <div key={index} className="intern-card">
                    <div className="intern-role intern-role-shortlisted">
                      <p>
                        <a href={intern.cv_link} target="_blank" rel="noopener noreferrer">
                          <strong>Shortlisted Candidate</strong>
                        </a>
                      </p>
                    </div>
                    <div className="intern-details">
                      <h3>{intern.name}</h3>
                      <p><strong>Education:</strong> {intern.degree}</p>
                      <p><strong>Contact:</strong> {intern.contact_no}</p>
                      <p><strong>Email:</strong> {intern.email}</p>
                      <p><strong>Starting Date:</strong> {intern.starting_date}</p>
                      <p><strong>University:</strong> {intern.university}</p>
                      <p><strong>Possible Roles:</strong> {Array.isArray(intern.expected_role) ? intern.expected_role.join(", ") : JSON.stringify(intern.expected_role)}</p>
                      <p><strong>Year:</strong> {intern.current_year}</p>
                      <p><strong>Internship Period:</strong> {intern.internship_period}</p>
                      <p><strong>Working Mode:</strong> {intern.working_mode}</p>
                      <div className="skills-container">
                        {allSkills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="action-buttons">
                      <a href={intern.cv_link} target="_blank" rel="noopener noreferrer" className="view-cv">
                        View CV
                      </a>
                      <button 
                        className="hire-button" 
                        onClick={() => openDatePicker(intern)}
                      >
                        Hire
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => handleDeleteIntern(intern.cv_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Date Picker Modal */}
        {showDatePicker && (
          <div className="modal-overlay">
            <div className="date-picker-modal">
              <h2>Select Deadline Date</h2>
              <p>Please select the deadline date for {selectedIntern?.name} to submit their documents:</p>
              
              <div className="date-input-container">
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Can't select dates in the past
                  className="date-input"
                />
              </div>
              
              <div className="date-picker-buttons">
                <button className="cancel-button" onClick={closeDatePicker}>
                  Cancel
                </button>
                <button 
                  className="confirm-button" 
                  onClick={handleHireIntern}
                  disabled={!selectedDate}
                >
                  Confirm & Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedInterns;