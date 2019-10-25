import React from 'react';

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
          <a href="<%= learn_path(category.id) %>">
            <img src={ data.image_url } className="card-img-top img-thumbnail" style={{ maxWidth: "500px;max-height:500px"}} />
          </a>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col">
                <h4 class="card-title mb-2 name">
                    <a href="#">{ data.name }</a>
                </h4>
                <p class="card-text small text-muted">
                  { data.total_words } words
                </p>
              </div>
            </div> 
          </div>
        </div>
        </div>
        );
    }
}

export default _CategoryCard;