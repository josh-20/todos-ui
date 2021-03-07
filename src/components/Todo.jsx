import React from "react";



class Todo extends React.PureComponent{
    render(){

        const onChange = typeof this.props.onChange === "function" ? this.props.onChange : ()=>{};

        return (
            <div>
              <h1>{this.props.title}</h1>
              Done: <input type="checkbox" onChange={onChange} checked = {this.props.done}></input>
            </div>
          );
    }
}

export default Todo;