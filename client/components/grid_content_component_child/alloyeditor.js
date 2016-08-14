var React = require('react');
var AlloyEditor = require('/public/dist/alloy-editor/alloy-editor-all-min.js');

var AlloyEditorComponent = React.createClass({
    getInitialState: function () {
        return { value: '' };
    },

    componentDidMount: function () {

        if (this.props.edit) {
            this._editor = AlloyEditor.editable(this.props.container, {               
            });
        }
        else {
            this._editor = AlloyEditor.editable(this.props.container, {                
                readOnly: true
            });

        }

        this._editor.get('nativeEditor').on('imageAdd', function (event) {
            let maxWidthImage = window.innerWidth / 3;
            if (event.data.el.$.width > maxWidthImage) {
                orgWidth = event.data.el.$.width;
                orgHeight = event.data.el.$.height;
                event.data.el.$.width = maxWidthImage;
                event.data.el.$.height = (maxWidthImage * orgHeight) / orgWidth;
                console.log(event.data.el.$.width);
            }
            //console.log(event.data);
        });

    },

    componentWillUnmount: function () {
        this._editor.destroy();
    },



    render: function () {
        var value = this.props.text;


        return (
            <textarea ref="alloyeditor" style={{ overflow: 'hidden' }} id={this.props.container} defaultValue= {value} />

        );
    }
});

module.exports = AlloyEditorComponent;