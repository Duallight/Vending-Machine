import React from "react";
import $ from "jquery";

const SERVICE_URL = "http://tsg-vending.herokuapp.com";
class purchaseContainer extends React.Component {
  render() {
    return (
      <div id="messages" className="purchaseContainer centered">
        <div >
          <textarea
            readOnly
            id="messageArea"
            defaultValue={"                        "}
          />
        </div>
        <div  id="idContainer">
          <label htmlFor="itemIDBody">Item:</label>
          <input type="text" id="itemIDBody" readOnly />
        </div>
        <div >
          <button id="purchase" className="btn btn-primary" onClick={makePurchase}>
            Make Purchase
          </button>
        </div>
      </div>
    );
  }
}

function makePurchase() {
  // Gets the amount of money put in the machine
  var amount = $('#totalInField').val();
  // Gets the items id to purchase
  var id = $('#itemIDBody').val();
  //sets fetchData, just need the method of POST for purchasing
  let fetchData = {
    method: "POST",
  }
  fetch(SERVICE_URL + "/money/" + amount + "/item/" + id, fetchData)
    .then(data => {
      if(data.ok) {
        //if data is fine, refresh the items with updated quantities, and say thanks in the message box
          loadItems();
          $('#messageArea').val("Thank You!");
          //take the response and pass it to the change function.
          data.json().then((value) => {
            var change = value;
            displayChange(change);
          })
          $('#totalInField').val("0.00");
      } else { //if purchase unsuccessfull, get the response, and pass the error value to the message area. 
        data.json().then((value) => { 
          $('#messageArea').val(value.message);
        })
        
      }
    })
    .catch(function(error){ // catches all other errors and puts the message in the message box. 
      $('#messageArea').val(error);
    })
}

function loadItems() {
  //Get the item container from the dom and make sure its empty
  var itemContainer = $('#itemContainer');
  itemContainer.empty();

  fetch(SERVICE_URL + "/items")
    .then((resp) => resp.json())
    .then(function(data) {
      var items = data;
      items.forEach(function(item) { 
        // for each item in the response, create a new card with its id, name, price and quantity
        // Each card has an onCLick function that passes its id to the item id text box
        
        var id = item.id;
        var name = item.name;
        var price = item.price;
        var quantity = item.quantity;
        var card = '<div class = "card-body outline cardClass" onClick={$("#itemIDBody").val(' + id + ')}>'
            + '<h5 class="card-title">' + id + '</h5>'
            + '<h5 class="card-title centered">' + name + '</h5>'
            + '<h6 class="centered">$' +price + '</h6>'
            + '<h6 class="centered">Quantity Left: ' + quantity + '</h6>'
            + '</div>';
        // Add the new card to the container
        itemContainer.append(card);
      })
    })
    .catch(function(error) {
      $('#messageArea').val("Error calling web service. Please try again later.");
    })
}

function displayChange(change) {
  //Creates a blank string that we will use to build our change string. 
  var message = "";
  //For every coin in change that is not 0, add the amount of coins, + the name of the coin. 
  //Make the name plural if there is more than one coin.
  if (change.quarters !== 0) {
      message += change.quarters;
      if (change.quarters > 1) {
          message += " Quarters";
      } else {
          message += " Quarter";
      }
  } 
  if (change.dimes !== 0) {
      
      if (message !== "") { //adds a comma to the string if the string is not empty
          message+= ", ";
      }
      message += change.dimes;
      if (change.dimes > 1) {
          message += " Dimes";
      } else {
          message += " Dime";
      }
  }
  if (change.nickels !== 0) {
      if (message !== "") {
          message+= ", ";
      }
      message += change.nickels;
      if (change.nickels > 1) {
          message += " Nickels";
      } else {
          message += " Nickel";
      }
  }
  if (change.pennies !== 0) {
      if (message !== "") {
          message+= ", ";
      }
      message += change.pennies;
      if (change.pennies > 1) {
          message += " Pennies";
      } else {
          message += " Penny";
      }
  }
  if (message === "" ) {
      message += "No Change";
  }
  //Sets the change box to the change message. 
  $('#changeBox').val(message);
}

export default purchaseContainer;
