var React = require('react');

var Spinner = React.createClass({

    render: function() {

        if (this.props.display == true) {
            return (
                <div id="spin">
                  <div className="spinner">
                    <div className="double-bounce1" />
                    <div className="double-bounce2" />
                  </div>
                </div>
            )
        } else {
            return null
        }

    }
})

module.exports = Spinner;