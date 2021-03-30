import React from "react";
import $ from "jquery";
class moneyContainer extends React.Component {
  render() {
    return (
      <div id="totalIn" className="container addMoney centered">
        <div>
          <h3>Total $ In</h3>
        </div>
        <div>
          <input type="text" defaultValue="0.00" id="totalInField" readOnly />
        </div>
        <div className="addGroup">
          <button id="addDollar" className="btn btn-money mr-1" onClick={addDollar}>
            Add Dollar
          </button>
          <button id="addQuarter" className="btn btn-money" onClick={addQuarter}>
            Add Quarter
          </button>
          <button id="addDime" className="btn btn-money mr-1" onClick={addDime}>
            Add Dime
          </button>
          <button id="addNickle" className="btn btn-money" onClick={addNickle}>
            Add Nickle
          </button>
        </div>
      </div>
    );
  }
}

//addAmount functions add a corresponding amount to the total in text box
function addDollar() {

  updateTotalIn(1.00);
}


function addQuarter() {

  updateTotalIn(0.25);
}


function addDime() {

  updateTotalIn(0.1);
}


function addNickle() {

  updateTotalIn(0.05);
}

//Used to add a value to the total in textbox. Parses to a float, then fixes it to 2 decimals
function updateTotalIn(addValue) {
  var current = parseFloat($('#totalInField').val());
  current += addValue;
  $('#totalInField').val(current.toFixed(2));
}



export default moneyContainer;
