import React from 'react';
import './App.css';
import Clock from './components/Clock';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      timeZone: 0,
      errorMsg:'',
      clockArr:[],
    }
    this.handleChange = this.handleChange.bind(this);
    this.addClock = this.addClock.bind(this);
  }

  handleChange(event){
    const target = event.target.name
    this.setState({[target] : event.target.value})
  }

  addClock(){
    const name = this.state.name
    const timeZone = this.state.timeZone
    const newClock = {name, timeZone}
    if(timeZone < -10  ||  timeZone > 14){
      this.setState({errorMsg:'Зона должны быть от -10 до 14'})
    }
    else if(name === ''){
      this.setState({errorMsg:'Имя не может быть пустым'})
    }
    else if(this.state.clockArr.find((e)=>e.name === name)){
      this.setState({errorMsg:'Это имя уже занято'})
    }
    else{
      this.setState({clockArr:[...this.state.clockArr,newClock]})
      this.setState({errorMsg:''})
    }
    this.setState({timeZone: 0})
    this.setState({name: ''})
  }

  deleteClock(clockName){
    const newArr = this.state.clockArr.filter((e) => e.name !== clockName)
    this.setState({clockArr:newArr})
  }

  render(){
    return (
      <div className="App">
        <div className='App__header'>

          <div className = 'App__input'>
            <label>Название</label>
            <input 
              placeholder = 'Введите название' 
              type = 'text' 
              name = 'name' 
              onChange = {this.handleChange} 
              value = {this.state.name}>
              </input>
          </div>

          <div className = 'App__input'>
            <label>Временная зона</label>
            <input 
              placeholder = 'введите число от -10 до +14' 
              type = 'number' 
              name = 'timeZone' 
              onChange = {this.handleChange} 
              value = {this.state.timeZone}>
            </input>
          </div>

          <button onClick={this.addClock}>Добавить</button>
        </div>
        <div className='App__error-msg'>
          {this.state.errorMsg !== '' && (<label>{this.state.errorMsg}</label>)}
        </div>
        <div className='App__clocks'>
          {this.state.clockArr.map(e => 
            <Clock 
              delete = {() => this.deleteClock(e.name)} 
              key = {e.name} 
              timeZone = {e.timeZone} 
              name = {e.name}
            />)}
        </div>
      </div>
    );
  }
  
}

export default App;
