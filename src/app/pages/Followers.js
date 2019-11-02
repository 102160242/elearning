import React from 'react';
import { connect } from 'react-redux';
import { getFollowers } from '../../actions/user';
import _Following_Follower_Card from './_Following_Follower_Card';

class Followers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            filterList: []
         };
         this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(e){
        var keyword = e.target.value;
        if(keyword != ""){
            var filterList = [];
            for(var i = 0; i < this.props.followersList.length; i ++)
            {
                var item = this.props.followersList[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) filterList.push(item);
            }
            this.setState({filterList: filterList})
        }
        else this.setState({filterList: this.props.followersList})
    }

    componentDidMount()
    {
        var token = localStorage.getItem('token');
        this.props.getFollowers(token).then(() => {
            this.setState({
                filterList: this.props.followersList
            });
        });
    }
    render() {
        var list = [];
        for(var i = 0; i < this.state.filterList.length; i++)
        {
            var item = <_Following_Follower_Card name={this.state.filterList[i].name} />;
            list.push(item);
        }
        return (
            <>
                <div class="container">
                    <div className="row mt-3 d-flex justify-content-between ">
                        <div className="col-sm-4 ">
                            <h3>Total <span class="badge badge-primary p-2">{this.props.followersList.length}</span></h3>
                        </div>
                        <div class="col-md-3">
                            <input class="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler} />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row d-flex justify-content-start">
                        {list}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        followersList: state.user.followersList,
    }
}
const mapDispatchToProps = dispatch => ({
    getFollowers: (token) => dispatch(getFollowers(token))
})
export default connect(mapStateToProps, mapDispatchToProps)(Followers);