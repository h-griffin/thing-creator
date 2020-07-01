import React from 'react';
import './App.css';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            thingList : [
                {
                    id : 1,
                    name : 'milk',
                    type : 'flat',
                },
                {
                    id : 2,
                    name : 'soda',
                    type : 'carbonated',
                }
            ],
            popularThing : 'water'
        }
        this.thingCreatedHandler = this.thingCreatedHandler.bind(this);
    }

    thingCreatedHandler(thing){
        alert(thing.name);
        const updatedThing = this.state.thingList
        updatedThing.push({id:'?',name:'?',type:'?'})
        this.setState({
            thingList : updatedThing
        })
    }

    render(){
        return(
            <div className='App'>
                <Header popularThing={this.state.popularThing} count={this.state.thingList.length}/>
                <h1>class app</h1>
                <main>
                    <ThingsList thingList={this.state.thingList} onThingCreate={this.thingCreatedHandler} />
                </main>
                <Footer text='©Griffin™'/>
            </div>
        )
    }
}

function ThingsList(props){
    return(
        <>
        <h2>things</h2>
        <ul>
            {props.thingList.map(thingList => <Thing item={thingList} key={thingList.id}/>)}
        </ul>
        <ThingForm onThingCreate={props.onThingCreate}/>
        </>
    )
}

class ThingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'name a thing!',
            thingType : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const newName = event.target.value
        this.setState({
            name : newName
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onThingCreate(this.state);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    name:
                    <input type='text' value={this.state.name} onChange={this.handleChange}></input>
                </label>
            </form>
        )
    }
}

function Thing(props){
    return <li>i am thing {props.item.name}</li>
}

function Header(props){
    return (
        <>
        <h2>things count : {props.count}</h2>
        <h2>popular thing is: {props.popularThing}</h2>
        </>
    )
}

function Footer(props){
    return (
        <footer>
            <small>hi there from footer, {props.text}</small>
        </footer>
    );
}


export default App;
