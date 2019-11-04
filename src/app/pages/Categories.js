import React from 'react';
import _CategoryCard from './_CategoryCard';
import Loading from '../Loading';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            order: "asc",
            filteredList: []
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
    }
    searchHandler(e) {
        var keyword = e.target.value;
        if (keyword !== "") {
            var filteredList = [];
            for (var i = 0; i < this.props.list.length; i++) {
                var item = this.props.list[i];
                if (item.name.toLowerCase().includes(keyword.toLowerCase())) filteredList.push(item);
            }
            this.setState({ filteredList: filteredList });
        }
        else this.setState({ filteredList: this.props.list });
    }

    orderHandler(e)
    {
        this.setState({
            order: e.target.value,
            filteredList: this.state.filteredList.reverse()
        });
    }

    componentDidMount() {
        // Thay đổi title trang
        document.title = 'Categories';
        // Gọi API lấy dữ liệu
        this.props.getCategories().then(() => {
            this.setState({
                isLoading: false,
                filteredList: this.props.list
            });
        })
    }

    render() {
        if (this.state.filteredList.length == 0) {
            var cards = this.state.isLoading ? <Loading /> : "There is nothing to show";
        }
        else {
            console.log(this.state.filteredList);
            var cards = this.state.filteredList.map((data, i) =>
                <_CategoryCard data={data} />
            );
        }

        return (
            <>
                <div className="container title-bar mt-3">
                    <div className="row d-flex justify-content-between">
                        <div className="d-inline">
                            <strong>Categories</strong> | {this.props.list.length} total
                        </div>
                        <form className="form-inline">
                            <input type="text" className="form-control mr-sm-2" placeholder="Search" onChange={this.searchHandler} />
                            <select className="form-control" value={this.state.order} onChange={this.orderHandler}>
                                <option value="acs">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row d-flex justify-content-center">
                        {cards}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    //console.log(state);
    return {
        list: state.categories.list,
        status: state.categories.status,
        message: state.categories.message,
    }
}
const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
