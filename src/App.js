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
            popularThing : 'water',
            latestThing : null //{name:'none',type:'none'}
        }
        this.thingCreatedHandler = this.thingCreatedHandler.bind(this);

        this.state.latestThing = this.state.thingList[0];
    }

    thingCreatedHandler(thing){
        alert(thing.name);
        const updatedThing = this.state.thingList
        updatedThing.push({id:'',name:thing.name,type:'?'})
        this.setState({
            thingList : updatedThing,
            latestThing : thing
        })
    }

    render(){
        return(
            <div className='App'>
                <Header popularThing={this.state.popularThing} latestThing={this.state.latestThing} count={this.state.thingList.length}/>
                <h1>class app</h1>
                <main>
                    <ThingsList thingList={this.state.thingList} onThingCreate={this.thingCreatedHandler} />
                </main>
                <Footer text='©Griffin™'/>
            </div>
        )
    }
}

class ThingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            thingType : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        if(event.target.name === "thing-name"){
            const newName = event.target.value
            console.log('target name:',event.target.value)

            this.setState({
                name : newName,
            })
        }else{ //only other thing is thing-type
            const newType = event.target.value
            console.log('target name:',event.target.value)

            this.setState({
                type : newType
            })
        }
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
                    <input name='thing-name' type='text' value={this.state.name} onChange={this.handleChange}></input>
                </label> <br></br>
                <label>
                    type:
                    <input name='thing-type' type='text' value={this.state.type} onChange={this.handleChange}></input>
                </label> <br></br>
                <button>submit</button>
            </form>
        )
    }
}

function Thing(props){
    return <li>i am thing {props.item.name} and i am {props.item.type}</li>
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


function Header(props){
    return (
        <>
        <h2>things count : {props.count}</h2>
        <h2>a popular thing is: {props.popularThing}</h2>
        <h2>latest thing is : {props.latestThing.name}, type: {props.latestThing.type}</h2>
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
