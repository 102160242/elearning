import React from 'react';
import { connect } from 'react-redux';
import { changeLoadingStatus } from '../../actions/app';
import { getMyWords } from '../../actions/word';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';
import { Redirect } from 'react-router-dom'
import _WordCard from './_WordCard';
import './Words.css'

class LearntWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: "",
            order: "asc",
            category_id: 0,
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.orderhandler = this.orderhandler.bind(this);
        this.Categoryhandler = this.Categoryhandler.bind(this);
    }

    getQueries() {
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = query.order ? query.order : "asc";
        queries["category_id"] = query.category_id ? query.category_id : 0;
        return queries;
    }

    orderhandler(e) {
        var token = localStorage.getItem('token');
        var queries = this.getQueries();
        queries["order"] = e.target.value;
        this.setState({
            order: e.target.value
        });
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getMyWords(token, queries).then(() => {
            this.setState({
                order: queries["order"],
            });
        });
    }

    Categoryhandler(e) {
        var token = localStorage.getItem('token');
        var queries = this.getQueries();
        queries["category_id"] = e.target.value;
        this.setState({
            filter: e.target.value
        });
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getMyWords(token, queries).then(() => {
            this.setState({
                category_id: queries["category_id"],
            });
        });
    }

    componentDidMount() {
        document.title = "Learnt Words";
        
        var token = localStorage.getItem('token');
        var queries = this.getQueries();

        this.props.getMyWords(token, queries).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                search: queries["search"],
            });
        })
    }

    searchHandler(e) {
        var token = localStorage.getItem('token');

        // Params
        var queries = this.getQueries();
        queries["search"] = e.target.value;
        queries["page"] = 1;
        this.setState({
            search: queries["search"],
            page: queries["page"]
        })
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getMyWords(token, queries).then(() => {
            this.setState({
                search: queries["search"],
            });
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        var query = queryString.parse(nextProps.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = query.order ? query.order : "asc";
        queries["category_id"] = query.category_id ? query.category_id : 0;

        var token = localStorage.getItem('token');

        if (queries["search"] !== prevState.search || queries["order"] !== prevState.order || queries["category_id"] !== prevState.category_id || queries["page"] !== prevState.page) {
            nextProps.getMyWords(token, queries);
            nextProps.changeLoadingStatus(false);
            return { search: queries["search"], page: queries["page"], order: queries["order"], category_id: queries["category_id"] }
        }
        return null;
    }

    

    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    render() {
        if(!this.props.isLoggedIn)
        {
            return (<Redirect to={"/auth/login"} />);
        }
        var cards;
        var categories = this.props.wordsData && this.props.wordsData.category_data && this.props.wordsData.category_data.map((data, key) =>
            <button className="dropdown-item btn btn-outline-primary" value={data.id} onClick={this.Categoryhandler} > {data.name} </button>
        );
        if (this.props.wordsData && this.props.wordsData.list.length === 0) {
            cards = <p>There is nothing to show</p>;
        }
        else {
            cards = this.props.wordsData && this.props.wordsData.list && this.props.wordsData.list.map((data, key) =>
                <_WordCard data={data} type={false} key={key} />
            );
        }
        return (
            <>
                <div className="container">
                    <div className="card mt-2 border border-white">
                        <div className="card-header bg-transparent border-success ">
                            <div className="row mt-3 align-items-center">
                                <div className="col-md-4">
                                    <h4>
                                        My Words List
                                    </h4>
                                </div>
                                <div className="col-md-8 col-sm-12 ">
                                    <div className="row d-flex justify-content-end">
                                        <div className="col-auto">
                                            <div id="order" className="dropdown">
                                                <button className="btn btn-outline-light text-dark " data-toggle="dropdown" >
                                                    <i className="fas fa-sort"></i> <span>Sort</span>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item btn btn-outline-primary " value="asc" onClick={this.orderhandler} >A-Z</button>
                                                    <button className="dropdown-item btn btn-outline-primary " value="desc" onClick={this.orderhandler} >Z-A</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className="dropdown">
                                                <button className="btn btn-outline-light text-dark " data-toggle="dropdown" >
                                                    <i className="fas fa-sort"></i> <span>Categories</span>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item btn btn-outline-primary" value="0" onClick={this.Categoryhandler} >All</button>
                                                    {categories}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input className="form-control mr-sm-2 " type="search" placeholder="Search" value={this.state.search} onChange={this.searchHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {cards}
                        </div>
                        <Paginator paginate={this.props.wordsData && this.props.wordsData.paginate} queries={this.getQueries()} />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wordsData: state.words.data,
        isLoggedIn: state.auth.isLoggedIn,
        status: state.words.status,
    }
}

const mapDispatchToProps = dispatch => ({
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
    getMyWords: (token, params) => dispatch(getMyWords(token, params))
});

export default connect(mapStateToProps, mapDispatchToProps)(LearntWords);