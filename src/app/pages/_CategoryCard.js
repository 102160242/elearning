import React from 'react';
import { Link } from 'react-router-dom';

class _CategoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        var data = this.props.data;      
        return (
            <div class="col-sm-6 col-md-4">
        <div class="card mb-4">
          <Link to={"/words/" + data.id}>
            <img src={ data.image_url } className="card-img-top img-thumbnail" style={{ maxWidth: "500px;max-height:500px"}} />
          </Link>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col">
                <h4 class="card-title name d-inline">
                    <Link to={"/words/" + data.id} style={{ textDecoration: "none" }}>{ data.name }</Link>
                </h4>
              </div>
              <span class="badge badge-primary d-inline p-2">{ data.total_words } words</span>
            </div> 
          </div>
        </div>
        </div>
        );
    }
}

export default _CategoryCard;