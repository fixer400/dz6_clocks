import React from "react"

class Clock extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      date : new Date(),
    }
  }

  componentDidMount(){
    this.tick()
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  
  tick() {
    let date = new Date()
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let newDate = new Date (utc + (3600000* this.props.timeZone))
    this.setState({
      date: newDate
    });
  }

  render(){
    return(
      <div className="Clock">
        <h2>{this.props.name}</h2>
        <p>{this.state.date.toLocaleTimeString()}.</p>
        <button onClick={this.props.delete}>Удалить</button>
      </div>
    )
  }
}

export default Clock