import React from 'react';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    random_color()
    {
        var color = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
        return color[Math.floor(Math.random() * (color.length - 1))]
    }
    render() {
        return (
            <div class={"spinner-grow text-" + this.random_color()} role="status" style={{ width: "6rem", height: "6rem" }}>
                <span class="sr-only">Loading...</span>
            </div>
        );
    }
}

export default Loading;