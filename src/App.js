/* eslint-disable no-unused-vars */
import React,{useState,Component} from 'react';
import './App.css';
import { render } from 'react-dom';
import Base from './Base.js';




class App extends Component {

  constructor() {
    
    super();

    this.state={
      name:"B",
      stats:this.theStats(),
      x:1,
      time:0,
      dat: "",
      isLoading:true,
      total:0,
      key:"",
      totalCountry:""
    };


    this.changeField=this.changeField.bind(this);
  }
 

  theTotalCases(Countries){
    var total=0;
      
     for(let i=2;i<Countries.length;i++) 
   { var x=Countries[i];  
     var {TotalConfirmed}=x;
    total+=TotalConfirmed;
  }

    return total;

  }

  changeField(event){
    this.setState({
      key:event.target.value
    });

 

    for(let i=2;i<this.state.dat.length;i++)
    {var x=this.state.dat[i];  

    var {Country}=x;
      if(Country===event.target.value)
     {    var {TotalConfirmed}=x;
     this.setState({
       totalCountry:TotalConfirmed
     });
     return;

    }
    }

    this.setState({
      totalCountry:0
    });


  }


  static getDerivedStateFromProps(){   
    return null;
  }

  getSnapshotBeforeUpdate(){
    return false;
  }

    changeName(e){
      return (e==='B')?'b':'B';

    }


  theStats(){

    const date= new Date();
  const hrs=date.getHours();
 
  return (hrs<12)?"Morning":(hrs>=12&&hrs<16)?"Afternoon":(hrs>=16&&hrs<20)?"Evening": "Night";

}



componentDidMount()
{

  fetch('https://api.covid19api.com/summary').then(response=>response.json()).then((data=>{const {Countries}=data;this.setState({dat:Countries,total:this.theTotalCases(Countries)})}));
  this.myInterval=setInterval(()=>{
    this.setState(prevState=>({
      time:prevState.time+1
    }))
  },1000);

}


render()
{
 var total=(this.state.total===0)?"Loading...":this.state.total;
 var totalC=(this.state.totalCountry==="")?"No Such Country":this.state.totalCountry;
  return (
    <div>
      
      <h1>Good {this.state.stats},{this.state.name}</h1>
     <Base time={this.state.time} ></Base> 
  <label>The Total Case Of COVID-19 is {total}</label>

     <form onSubmit={(event)=>{alert(`${this.state.key} has total confirmed cases of ${this.state.totalCountry}`);event.preventDefault()}}>
       <label>Enter The Country You Want To Track    </label>
       <input type="text" value={this.state.key} onChange={this.changeField} ></input>
       
     </form>
      

    </div>
  );
}



componentDidUpdate()
{

  

}


}



export default App;





