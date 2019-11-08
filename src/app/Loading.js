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
            <div className="container">
                <div class="d-flex align-items-center justify-content-center overlay">
                    <div className={"spinner-grow text-" + this.random_color()} role="status" style={{ width: "6rem", height: "6rem" }}>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;