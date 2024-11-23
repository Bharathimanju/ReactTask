import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import pic1 from './images/pic1.jpeg'

function App() {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [dob, setDob] = useState('');
  const [status, setStatus] = useState('');
  const [personList, setPersonList] = useState([]);
  const [newName, setNewName] = useState('');
  const [newRelationship, setNewRelationship] = useState('');
  const [newDob, setNewDob] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3002/reads')
      .then((response) => {
        setPersonList(response.data);
      });
  }, []);

  const addPersonData = () => {
    Axios.post('http://localhost:3002/insert', {
      name,
      relationship,
      dob,
      status,
    }).then(() => {
      setPersonList([...personList, { name, relationship, dob, status }]);
    });
  };

  const updatePersonData = (id) => {
    Axios.put('http://localhost:3002/update', {
      id,
      newName,
      newRelationship,
      newDob,
      newStatus,
    }).then(() => {
      setPersonList(
        personList.map((val) =>
          val._id === id
            ? {
              ...val,
              name: newName,
              relationship: newRelationship,
              dob: newDob,
              status: newStatus,
            }
            : val
        )
      );
    });
  };

  const deletePersonData = (id) => {
    console.log("Deleting ID:", id);  // Add this log
    Axios.delete(`http://localhost:3002/delete/${id}`).then(() => {
      setPersonList(personList.filter((val) => val._id !== id));
      alert("Beneficiary deleted successfully");
    });
  };





  // const deletePersonData = (id) => {
  //   console.log("Deleting ID:", id);
  //   Axios.delete(`http://localhost:3002/delete/${id}`).then(() => {
  //     setPersonList(personList.filter((val) => val._id !== id));
  //     alert("Beneficiary deleted successfully");
  //   });


  // };

  return (
    <div className="App">

      <div className="container mt-">
        {/* <h1 className="text-center">CRUD - MERN</h1> */}

        <div className="row mt-">
          <div className=' col col-lg-3 col-md-3 col-sm-6'>
            <div className='card  height'>
              <img src={pic1} className='pic1'></img><br />
              <div className='para'>
                <p>D.O.B 28.4.2024 <br /><cite >Status</cite>: Complete</p>
              </div>
              <button className='oo'>Back Home</button>
            </div>
          </div>

          {/* ............................................................ */}
          {/* Form Section */}
          <div className=" col-lg-9 col-md-9">

            <div className="d-flex gap-2">

              <button className="h" style={{ backgroundColor: "#9400D3" }}>Add Beneficiaries</button>
              <button className="btn btn-secondary" style={{ background: "#9400D3" }}>ADD Asset</button>
              <button className="btn btn-success" style={{ backgroundColor: "#9400D3" }}>ADD Liability</button>
              <button className="btn btn-danger" style={{ backgroundColor: "#9400D3" }}>CREATE Links</button>
              <button className="btn btn-danger" style={{ backgroundColor: "#9400D3" }}>ADD Signatures</button>
              <button className="btn btn-danger" style={{ backgroundColor: "#9400D3" }}>Will Generation</button>
            </div>



            {/* ============================================================================== */}



            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Relationship</th>
                    <th>Date of Birth</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {personList.map((val, key) => (
                    <tr key={val._id}>
                      <td>{key + 1}</td>

                      {/* Name Input */}
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={val.name}  // This will hold the current name
                          onChange={(event) => {
                            const updatedList = [...personList];
                            updatedList[key].name = event.target.value;
                            setPersonList(updatedList);  // Update the state
                          }}
                        />
                      </td>

                      {/* Relationship Input */}
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={val.relationship}  // This will hold the current relationship
                          onChange={(event) => {
                            const updatedList = [...personList];
                            updatedList[key].relationship = event.target.value;
                            setPersonList(updatedList);  // Update the state
                          }}
                        />
                      </td>

                      {/* Date of Birth Input */}
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          value={val.dob}  // This will hold the current DOB
                          onChange={(event) => {
                            const updatedList = [...personList];
                            updatedList[key].dob = event.target.value;
                            setPersonList(updatedList);  // Update the state
                          }}
                        />
                      </td>

                      {/* Status Input */}
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={val.status}  // This will hold the current status
                          onChange={(event) => {
                            const updatedList = [...personList];
                            updatedList[key].status = event.target.value;
                            setPersonList(updatedList);  // Update the state
                          }}
                        />
                      </td>

                      {/* Actions */}
                      <td>
                        <button
                          className="bt"
                          onClick={() => updatePersonData(val._id, val.name, val.relationship, val.dob, val.status)}
                        >
                          Edit
                        </button>
                        <button
                          className="bt"
                          onClick={() => deletePersonData(val._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>



            {/* ================================================================================ */}

            <br />

            <div className='no'>
              <h4>Add New Beneficiary</h4>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label>Relationship</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter relationship"
                  required
                  onChange={(event) => setRelationship(event.target.value)}
                />
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter date of birth"
                  required
                  onChange={(event) => setDob(event.target.value)}
                />
              </div>
              <div>
                <label>Status</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter status"
                  required
                  onChange={(event) => setStatus(event.target.value)}
                />
              </div>
              <div className="mt-2">
                <button onClick={addPersonData} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default App;



