import React, { useState, useEffect } from "react";

export default function() {
    const [val, setVal] = useState('')
    const [occupationData, setOccupationData] = useState([{}])
    const [stateData, setStateData] = useState([{}])

    function getData(){ //Gets the data from API.

      useEffect(() =>{
        fetch("https://frontend-take-home.fetchrewards.com/form").then(
            respone => respone.json()
      ).then(data => setOccupationData(data.occupations))}, [])

      useEffect(() =>{
        fetch("https://frontend-take-home.fetchrewards.com/form").then(
            respone => respone.json()
      ).then(data => setStateData(data.states))}, [])
    }

    getData()//Calls to the function above to retrieve data from API.

    var occupation = []//Variables used for select options in form, they are loaded with the options.
    
    //Makes arrays usuable for the options.
    for(var i=0; i < occupationData.length; i++){
        occupation.push(occupationData[i].toString())
    }

    var state = []//Variables used for select options in form, this on handles the states.
    
    //Makes arrays usuable for the options. This one took a few more steps since the object has two variables.
    for(var i=0; i < stateData.length; i++){
        state.push(Object.values(stateData[i]))
        state[i] = String(state[i]).replace(/([A-Z])/g, ' $1').trim()
        state[i] = String(state[i]).replace(/ /g, "")
    }

    //Handles the submit so information gets back to API correctly.
    async function handleOnSubmit(e){
        e.preventDefault();
        var status = 0
        await fetch('https://frontend-take-home.fetchrewards.com/form',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "name": document.getElementById('name').value,
              "email": document.getElementById('email').value,
              "password": document.getElementById('password').value,
              "occupation": document.getElementById('occupatiuon').value,
              "state": document.getElementById('state').value
            })
          })
          .then((response) => {
            console.log(response.status);
            status = response.status //Saved Status code from webpage.
          })
          .catch((error) => {
            console.log(error);
          })

          //Informs user that submit was successful, or if an error occured causing a failure to submit data.
          if(status == 201){
            document.getElementById('userForm').reset()
            document.getElementById('status').innerHTML = "Submitted"
            document.getElementById('status').style.color = "green"
          }else{
            document.getElementById('status').innerHTML = "Failed to submit, please try again later."
            document.getElementById('status').style.color = "red"
          }
    }

  //Page html
  return (
    <div>
      <div class="header">
        <h1 id="form_header">User Form:</h1>
      </div>

      <div id="form">
        <form id="userForm" method="post" onSubmit={handleOnSubmit}>
            <div class="field">
                <h2>User Information:</h2>
                <label for="name">Name: </label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required/>
                <small></small>
            </div>
            <div class="field">
                <label for="email">Email: </label>
                <input type="text" id="email" name="email" placeholder="Enter your email address" required/>
                <small></small>
            </div>
            <div class="field">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                <small></small>
            </div>
            <div class="field">
                <label for="occupation-field">Occupation: </label>
                <select id = "occupatiuon" value={val} onChange={e=>setVal(e.target.value1)} required>
                <option value="" disabled selected>Select your occupatiuon</option>  
                {
                  //Receives data from above array and converts it to options for the user.
                  //This one is for occupation selection.
                    occupation.map(item =>{
                        return (<option key={item} value={item}>{item}</option>);
                    })
                }  
                </select> 
            </div>
            <div class="field">
                <label for="state-field">State: </label>
                <select id = "state" value={val} onChange={e=>setVal(e.target.value2)} required>
                <option value="" disabled selected>Select your state</option>  
                {
                  //Receives data from above array and converts it to options for the user.
                  //This one is for state selection.
                    state.map(item =>{
                        return (<option key={item} value={item}>{item}</option>);
                    })
                }  
                </select>
            </div>
            <input id="submit_button" type="submit" name="submit" value="Send"/>
        </form>
      </div>
      <div class="lower_body">
        <p id="status">
        </p>
      </div>
    </div>
    
  );
}