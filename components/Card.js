// import "./styles"
import React, { Component } from 'react'

class Card extends Component {



    render() {
        return (
            <div className="cuttingGuidesBackground">
                <div className={"cuttingGuides"}>
                {/* <div className="outer">
                <div className="inner"> */}

                    <div className={"myContainer" + this.props.labelSize}>
                        <div id="content">
                            <div id="container2WidthAndHeight">

                                <div id="container2" >
                                    {this.props.children}
                                </div>
                            </div>
                            </div>
                    </div>
                        </div>
                        </div>
                    // </div>
            // </div>
        )
        //   <h1>Hello, {this.props.name}</h1>;
    }
}

export default Card