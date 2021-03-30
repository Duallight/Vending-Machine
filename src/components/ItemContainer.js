import React from "react";
import $ from "jquery";

const SERVICE_URL = "http://tsg-vending.herokuapp.com/items"
class itemContainer extends React.Component {
  state = { //sets the initial state to false, with fake item data for loading purposes. 
    loading: true,
    itemData: [
      {
        "itemId" : 1,
        "name" : "fake",
        "price": 20,
        "quantity": 1
      }
    ]
  }
  componentDidMount() { //if this component successfully mounts, load all items. 
    this.setState({loading: false})
    loadItems();
  }
  render() {
    return (
      <div id="itemContainer" className="container col-md-8 p1 scroll"></div>
    );
  }
}

function loadItems() {
  //Get the item container from the dom and make sure its empty
  var itemContainer = $('#itemContainer');
  itemContainer.empty();

  fetch(SERVICE_URL)
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
        //Add the new card to the container
        itemContainer.append(card);
      })
    })
    //If the request fails, out put the error to the message box
    .catch(function(error) {
      $('#messageArea').val("Error calling web service. Please try again later.");
    })
}

export default itemContainer;
