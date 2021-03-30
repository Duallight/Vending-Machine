
import './App.css';
import React from 'react';
import PurchaseContainer from './components/PurchaseContainer';
import ItemContainer from './components/ItemContainer';
import MoneyContainer from './components/MoneyContainer';
import ChangeContainer from './components/ChangeContainer';

class App extends React.Component {
  render() {
    return (
        <>
            <div>
                <h1 style={{fontFamily: 'Bangers'}}>Vending Machine</h1>
            </div>
            <hr className="thick"/>
            <div id = "activeContainer" className="container-fluid">
                <div className="row">
                    <ItemContainer/>
                    <div id = "formArea" className="container col-md-4">
                        <MoneyContainer/>
                        <hr className="thick"/>
                        <PurchaseContainer/>
                        <hr className="thick"/>
                        <ChangeContainer/>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default App;
