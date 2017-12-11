import React,{Component} from 'react';
import alphabets from './alphabets.json';
import classNames from 'classnames';
class EasyABC extends Component {
  constructor(props){
    super(props);

    this.state = {
      alphabets: alphabets,
      currentPosition:0,
      currentTick: 0,
      random: false,
      sound: true
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.playSound = this.playSound.bind(this);
    this.switchRandom = this.switchRandom.bind(this);
    this.switchSound = this.switchSound.bind(this);
    this.manualPlaySound = this.manualPlaySound.bind(this);
  }

  componentDidMount(){
    //this just for refresh one, the "A" first time appear
    let letterSound = document.querySelector(`audio[data-key = "letter"]`);
  //  if(this.state.currentPosition === 0) {
    //  letterSound.currentTime = 0;
    // maybe the currentTime is needed in 2.0react, I think now it is useless
      letterSound.play();
  //}
}
  componentDidUpdate() {
    //everytime the component update, play sound
    this.playSound();
  }
  manualPlaySound(){
    let letterSound = document.querySelector(`audio[data-key = "letter"]`);
    let wordSound = document.querySelector(`audio[data-key = "word"]`);
    if(this.state.currentTick === 0) {
    //  letterSound.currentTime = 0;
      letterSound.play();
    }else{
      wordSound.play();
    }
  }
  playSound(){
    let letterSound = document.querySelector(`audio[data-key = "letter"]`);
    let wordSound = document.querySelector(`audio[data-key = "word"]`);
    if(this.state.sound){
      if(this.state.currentTick === 0) {
      //  letterSound.currentTime = 0;
        letterSound.play();
      }else{
        wordSound.play();
      }
    }
  }
  randomNumber(min,max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  next(){
    if(this.state.random){
      if(this.state.currentTick < 2) {
        this.setState({currentTick : this.state.currentTick + 1})
      }else {
        this.setState({currentPosition: this.randomNumber(0, 25), currentTick:0})
      }
    }else{
    if(this.state.currentPosition === this.state.alphabets.length -1  && this.state.currentTick === 2) {
      this.setState({currentPosition: 0,currentTick: 0});
    }else {
    if(this.state.currentTick < 2){
      this.setState({currentTick: this.state.currentTick + 1})
    }else{
    this.setState({currentPosition:this.state.currentPosition + 1,
    currentTick: 0});
    }
  }
}
}
  prev() {
    console.log('prev button clicked');
    if(this.state.currentPosition > 0){
    this.setState({currentPosition: this.state.currentPosition - 1});
  }else {
    this.setState({currentPosition : this.state.alphabets.length -1})
  }
  }
  switchRandom() {
    this.setState({random: !this.state.random});
  }
  switchSound(){
    this.setState({sound: !this.state.sound});

  }
  render() {
    let showImage = this.state.currentTick !== 0? false: true;
    let showWord = this.state.currentTick === 2 ? true : false;
    console.log(this.state.currentTick, showImage);
    return(
      <div className = "game">
        <span className="random-label">Random Letters: </span>
        <label className="switch">
          <input type="checkbox"
          onClick = {this.switchRandom}
          defaultValue="false"
          checked={this.state.random} />
          <div className="slider round"></div>
        </label>
        <span className="random-label">Sound: </span>
        <label className="switch">
          <input type="checkbox"
          onClick = {this.switchSound}
          defaultValue="false"
          checked={this.state.sound} />
          <div className="slider round"></div>
        </label>

        <div className ="option">
          <div className ="fields">
            <div className ="field-block">
              {this.state.alphabets[this.state.currentPosition].letter}
            </div>
            <audio src={this.state.alphabets[this.state.currentPosition].letterSound}
              data-key ="letter" />
          </div>
            CurrentPosition: {this.state.currentPosition} <br />
            CurrentTick :{this.state.currentTick}
            <div className ="buttons">
              <a onClick = {this.prev} href = "#" className = "button prev">Previous</a>
              <a onClick = {this.manualPlaySound} href = "#" className = "button sound">Play Sound Again</a>
              <a onClick = {this.next} href = "#" className = "button next">Next</a>
            </div>
            <div className ="fields">
              <div className = "field-block">
                <div className = "left-field">
                  <div className ={classNames("placeholder-span",{hide: !showImage})}>
                  Click Next to view Image</div>
                  <img className = {classNames("letter-image",{hide: showImage})}
                  alt = {this.state.alphabets[this.state.currentPosition].word}
                  src ={this.state.alphabets[this.state.currentPosition].image}/>
                  <audio src={this.state.alphabets[this.state.currentPosition].wordSound}
                    data-key ="word" />
                </div>
                <div className ="right-field">
                  <div className ={classNames("placeholder-span",{hide: showWord})}>Click Next to view Spelling</div>
                    <div className ={classNames("word",{hide: !showWord})}>
                      {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                    </div>
                </div>
              </div>
             </div>
        </div>
      </div>
    );
  }
}
export default EasyABC;
