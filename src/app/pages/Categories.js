import React from 'react';
import _CategoryCard from './_CategoryCard';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/categories';
import { changeLoadingStatus } from '../../actions/app';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            page: 1,
            order: "asc",
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
    }
    searchHandler(e) {
        // var keyword = e.target.value;
        // if (keyword !== "") {
        //     var filteredList = [];
        //     for (var i = 0; i < this.props.categoriesData.list.length; i++) {
        //         var item = this.props.categoriesData.list[i];
        //         if (item.name.toLowerCase().includes(keyword.toLowerCase())) filteredList.push(item);
        //     }
        //     this.setState({ filteredList: filteredList });
        // }
        // else this.setState({ filteredList: this.props.categoriesData.list });
        // Params
        var queries = this.getQueries();
        queries["search"] = e.target.value;
        queries["page"] = 1;
        this.setState({
            search: queries["search"],
            page: parseInt(queries["page"])
        })
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getCategories(queries);
    }

    orderHandler(e)
    {
        var queries = this.getQueries();
        queries["order"] = e.target.value;
        this.setState({
            order: e.target.value
        });
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getCategories(queries);
    }
    getQueries()
    {
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = query.order ? query.order : "asc";
        return queries;
    }
    static getDerivedStateFromProps(nextProps, prevState)
    {
        //console.log("getDerivedStateFromProps called")
        //console.log(nextProps)
        var query = queryString.parse(nextProps.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = query.order ? query.order : "asc";
        //console.log(queries);
        //console.log(prevState);
        if(queries["search"] !== prevState.search || parseInt(queries["page"]) != prevState.page || queries["order"] !== prevState.order)
        {
            nextProps.getCategories(queries);
            //nextProps.changeLoadingStatus(false);
            return { search: queries["search"], page: queries["page"], order: queries["order"] }
        }
        return null;
    }
    componentDidMount() {
        //console.log("componentDidMount called")
        // Thay đổi title trang
        document.title = 'Categories';
        // Gọi API lấy dữ liệu
        this.props.getCategories(this.getQueries()).then(() => {
            this.props.changeLoadingStatus(false);
        //     // this.setState({
        //     //     filteredList: this.props.categoriesData.list
        //     // });
        })
    }
    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    render() {
        //console.log("Loading state is: " + this.props.isLoading);
        if (this.props.categoriesData && this.props.categoriesData.list && this.props.categoriesData.list.length == 0) {
            //var cards = this.state.isLoading ? <Loading /> : "There is nothing to show";
            var cards = "There is nothing to show";
        }
        else {
            //console.log(this.state.filteredList);
            var cards = this.props.categoriesData && this.props.categoriesData.list && this.props.categoriesData.list.map((data, i) =>
                <_CategoryCard data={data} key={i}/>
            );
        }

        return (
            <>
                <div className="container title-bar mt-3">
                    <div className="row d-flex justify-content-between">
                        <div className="d-inline">
                            <strong>Categories</strong> | { this.props.categoriesData && this.props.categoriesData.list && this.props.categoriesData.list.length} total
                        </div>
                        <form className="form-inline">
                            <input type="text" className="form-control mr-sm-2" placeholder="Search" onChange={this.searchHandler} />
                            <select className="form-control" value={this.state.order} onChange={this.orderHandler}>
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row d-flex justify-content-center">
                        {cards}
                    </div>
                    <Paginator paginate={this.props.categoriesData && this.props.categoriesData.paginate } queries={this.getQueries()}/>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        categoriesData: state.categories.data,
        status: state.categories.status,
        message: state.categories.message,
        isLoading: state.app.isLoading
    }
}
const mapDispatchToProps = dispatch => ({
    getCategories: (queries) => dispatch(getCategories(queries)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps) (Categories);
