import React, { Component } from "react";

import "./App.css";
import Conform from "./components/Conform";

interface IState {
  confirmOpen: boolean;
  condfirmMessage: string,
  confirmVisible: boolean,
  countDown: number
}

class App extends Component<{}, IState> {

  private timer : number =0;
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: true,
      condfirmMessage:"Please hit the button to confirm you understand",
      confirmVisible: true,
      countDown: 10
    };
  }
private handleConfirmClick = () => {
  this.setState({ confirmOpen: true });
  clearInterval(this.timer)
};
 

  private handleCancelConfirm = () => {
    this.setState({ confirmOpen: false , condfirmMessage: "Take a break and return later "});
    clearInterval(this.timer)
  };
  private handleOkConfirmClick = () => {
    this.setState({
      confirmOpen: false, condfirmMessage: "Cool , continue reading the message "
    });
    clearInterval(this.timer)
  };
 
private handleTimerTick=()=> {

  this.setState({
    condfirmMessage:`Please hit the confirm button ${this.state.countDown} secs to go`
  , countDown: this.state.countDown -1} ,()=> {
    if(this.state.countDown <= 0){
    clearInterval(this.timer);
    this.setState({ condfirmMessage:'Too late to confirm', confirmVisible: false})
  }
  });
  

}

public static getDerivedStateFromProps(props: {}, state: IState) {
  console.log("getDerivedStateFromProps", props, state);
  return null;
}


  public componentDidMount(){
    this.timer = window.setInterval(()=>this.handleTimerTick(), 1000)
  }

  public render() {
    return (<>
<p>{this.state.condfirmMessage}</p>
      {this.state.confirmVisible && (<button onClick={this.handleConfirmClick}>{this.state.condfirmMessage}</button>)}
      <Conform
        open={this.state.confirmOpen}
        title="I loved React"
        content="Welcome to React TS"
        cancelCaption="No way"
        okCaption="Yes pleases"
        onCancelClick={this.handleCancelConfirm}
        onOkClick={this.handleOkConfirmClick}
      />
      </>
    );
  }
}

export default App;
