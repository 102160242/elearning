import React from 'react';
import _WordCard from './_WordCard';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { getWords, learntWord, unlearntWord } from '../../actions/word';
import { changeLoadingStatus } from '../../actions/app';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';
import { createNewTest } from '../../actions/test';
import './Words.css'

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: "",
            order: "asc",
            filter: "All",
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.orderhandler = this.orderhandler.bind(this);
        this.learntWordhandler = this.learntWordhandler.bind(this);
        this.unlearntWordhandler = this.unlearntWordhandler.bind(this);
        this.Filterhandler = this.Filterhandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getQueries() {
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = 1;
        queries["order"] = query.order ? query.order : "asc";
        queries["filter"] = query.filter ? query.filter : "All";
        return queries;
    }

    componentDidMount() {
        document.title = "Words";

        var token = localStorage.getItem('token');
        let category_id = this.props.match.params.category_id;
        var queries = this.getQueries();

        this.props.getWords(token, category_id, queries).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                search: queries["search"],
            });
        })
    }

    searchHandler(e) {
        var category_id = this.props.match.params.category_id;
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
        this.props.getWords(token, category_id, queries).then(() => {
            this.setState({
                search: queries["search"],
            });
        });
        // var keyword = e.target.value;
        // if(keyword !== ""){
        //     var arr = [];
        //     for(var i = 0; i < this.props.wordsData.length; i ++)
        //     {
        //         var item = this.props.wordsData[i];
        //         if (item.word.toLowerCase().includes(keyword.toLowerCase())) arr.push(item);
        //     }
        //     this.setState({wordsData: arr});
        // }
        // else this.setState({wordsData: this.props.wordsData})
    }

    orderhandler(e) {
        // var arr = [...this.state.wordsData];
        // for(var i = 0; i < arr.length -1; i++)
        //     for(var j = 0; j < arr.length -1; j++)
        //         if(arr[j].word < arr[j+1].word)
        //         {
        //             var item = arr[j];
        //             arr[j] = arr[j+1];
        //             arr[j+1] = item;
        //         }
        // this.setState({wordsData: arr});
        var category_id = this.props.match.params.category_id;
        var token = localStorage.getItem('token');
        var queries = this.getQueries();
        queries["order"] = e.target.value;
        this.setState({
            order: e.target.value
        });
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getWords(token, category_id, queries).then(() => {
            this.setState({
                order: queries["order"],
            });
        });
    }

    Filterhandler(e) {
        var category_id = this.props.match.params.category_id;
        var token = localStorage.getItem('token');
        var queries = this.getQueries();
        queries["filter"] = e.target.value;
        this.setState({
            filter: e.target.value
        });
        this.props.history.push({
            search: "?" + new URLSearchParams(queries).toString()
        });
        this.props.getWords(token, category_id, queries).then(() => {
            this.setState({
                filter: queries["filter"],
            });
        });
    }

    learntWordhandler(word_id) {
        var token = localStorage.getItem('token');
        this.props.learntWord(token, word_id);
    }

    unlearntWordhandler(word_id) {
        var token = localStorage.getItem('token');
        this.props.unlearntWord(token, word_id);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log("getDerivedStateFromProps called")
        var query = queryString.parse(nextProps.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = query.order ? query.order : "asc";
        queries["filter"] = query.filter ? query.filter : "All"

        var token = localStorage.getItem('token');
        let category_id = nextProps.match.params.category_id;

        if (queries["search"] !== prevState.search || queries["order"] !== prevState.order || queries["filter"] !== prevState.filter || queries["page"] !== prevState.page) {
            nextProps.getWords(token, category_id, queries);
            console.log(nextProps.wordsData.list);
            nextProps.changeLoadingStatus(false);
            return { search: queries["search"], page: queries["page"], order: queries["order"], filter: queries["filter"] }
        }
        return null;
    }

    componentWillUnmount() {
        this.props.changeLoadingStatus(true);
    }
    // handleCollapseDropdown(e)
    // {
    //     console.log(e.target.nextElementSibling);
    //     e.target.parentElement.className = "dropdown show";
    //     e.target.nextElementSibling.className = "dropdown-menu show";
    // }
    handleClick()
    {
        var token = localStorage.getItem("token");
        var category_id = this.props.match.params.category_id;
        this.props.createNewTest(token, category_id).then(() => {
            // Neu tao thanh cong thi chuyen huong sang bai test moi
            if(this.props.testStatus === "success")
            {
                //console.log(this.props.test);
                this.props.history.push("/test/" + this.props.test.id + "/do");
            }
        });
    }
    render() {
        if(this.props.isLoggedIn === false)
        {
            return (<Redirect to={"/auth/login"} />);
        }
        var cards;
        if (this.props.wordsData && this.props.wordsData.list && this.props.wordsData.list.length === 0) {
            cards = <p>There is nothing to show</p>;
        }
        else {
            cards = this.props.wordsData && this.props.wordsData.list && this.props.wordsData.list.map((data, key) =>
                <_WordCard data={data} key={key} type={true} learntWordhandler={this.learntWordhandler} unlearntWordhandler={this.unlearntWordhandler} />
            );
        }
        return (
            <>
                <div className="container">
                    <div className="card mt-2 border border-white">
                        <div className="card-header bg-transparent border-success ">
                            <div className="row mt-3 align-items-center">
                                <div className="col-md-6">
                                    <h4>
                                        Words List of {this.props.wordsData && this.props.wordsData.category_name}
                                    </h4>
                                </div>
                                <div className="col-md-6 col-sm-12 ">
                                    <div className="row d-flex justify-content-end">
                                        <div className="col-auto">
                                            <div className="dropdown">
                                                <button className="btn btn-outline-light text-dark " data-toggle="dropdown" >
                                                    <i className="fas fa-sort"></i> <span>Filter</span>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item btn btn-outline-primary" value="all" onClick={this.Filterhandler} >All</button>
                                                    <button className="dropdown-item btn btn-outline-primary" value="learnt" onClick={this.Filterhandler} >Learnt Words</button>
                                                    <button className="dropdown-item btn btn-outline-primary" value="unlearnt" onClick={this.Filterhandler} >Unlearnt Words</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div id="order" className="dropdown" /*onMouseEnter={this.handleCollapseDropdown}*/>
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
                                            <input className="form-control mr-sm-2 " type="search" placeholder="Search" value={this.state.search} onChange={this.searchHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {cards}
                            <div className="mt-4">
                                <button className="btn btn-outline-success btn-block" onClick={ this.handleClick }>Wanna do a Test?</button>
                            </div>
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
        testStatus: state.test.status,
        test: state.test.test
    }
}

const mapDispatchToProps = dispatch => ({
    getWords: (token, category_id, params) => dispatch(getWords(token, category_id, params)),
    learntWord: (token, word_id) => dispatch(learntWord(token, word_id)),
    unlearntWord: (token, word_id) => dispatch(unlearntWord(token, word_id)),
    createNewTest: (token, category_id) => dispatch(createNewTest(token, category_id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Words);