// import "./styles"
import React, { Component } from 'react'

class CardBack extends Component {



    render() {
        return (
            <div className={"myContainer"+this.props.labelSize}>
                <div id="contentCardBack">
                    <div id="container2WidthAndHeight">

                        <div id="container2" >
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
        //   <h1>Hello, {this.props.name}</h1>;
    }
}

export default CardBack