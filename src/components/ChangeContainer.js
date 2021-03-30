import React from "react";
import $ from "jquery";
class changeContainer extends React.Component {
  render() {
    return (
      <>
      <div id="change" className="centered">
        <textarea
          readOnly
          id="changeBox"
          defaultValue={"                    "}
        />
      </div>
      <div className="centered">
        <button id="changeButton" className="btn btn-danger" onClick={makeChange}>Change Return</button>
      </div>
      </>
    );
  }
}

//Creates change from the total in field
function makeChange() {
  //initialize a var for each coin, get the amount we're converting, and turn it into cents
  var quarters = 0;
  var dimes = 0;
  var nickels = 0;
  var pennies = 0;
  var total = $('#totalInField').val();
  total *= 100;

  //Use floor with division to get the total amount of a coin,
  // then use mod to get the remainder change minus the amount converted
  quarters = Math.floor(total / 25);
  total = total % 25;
  dimes = Math.floor(total / 10);
  total = total % 10;
  nickels = Math.floor(total / 5);
  total = total % 5;
  pennies = Math.floor(total);

  //Converts to a human readable message by checking if it needs a plural name, commas etc. 
  var message = "";
  if (quarters !== 0) {
      message += quarters;
      if (quarters > 1) {
          message += " Quarters";
      } else {
          message += " Quarter";
      }
  } 
  if (dimes !== 0) {
      
      if (message !== "") {
          message+= ", ";
      }
      message +=dimes;
      if (dimes > 1) {
          message += " Dimes";
      } else {
          message += " Dime";
      }
  }
  if (nickels !== 0) {
      if (message !== "") {
          message+= ", ";
      }
      message += nickels;
      if (nickels > 1) {
          message += " Nickels";
      } else {
          message += " Nickel";
      }
  }
  if (pennies !== 0) {
      if (message !== "") {
          message+= ", ";
      }
      message += pennies;
      if (pennies > 1) {
          message += " Pennies";
      } else {
          message += " Penny";
      }
  }
  if (message === "" ) {
      message += "No Change";
  }
  $('#changeBox').val(message);
  clear();
}

//Clears all text areas
function clear() {
  $('#totalInField').val("0.00");
  $('#messageArea').val("");
  $('#itemIDBody').val("");
}
export default changeContainer;
