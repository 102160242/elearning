import React from 'react';
import _WordCard from './_WordCard';
import { connect } from 'react-redux';
import { getWords, learntWord, unlearntWord } from '../../actions/word';
import { changeLoadingStatus } from '../../actions/app';
import queryString from 'query-string';
import Paginator from '../pages/partials/Paginator';
import './Words.css'

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: "",
            page: 1,
            search: "",
            order: "asc",
            filter: "All",
            wordsList: [],
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.orderhandler = this.orderhandler.bind(this);
        this.learntWordhandler = this.learntWordhandler.bind(this);
        this.unlearntWordhandler = this.unlearntWordhandler.bind(this);
        this.Filterhandler = this.Filterhandler.bind(this);
    }

    getQueries() {
        const params = new URLSearchParams(this.props.location.search);
        const name = params.get('name');
        var query = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        var queries = {};
        queries["name"] = name;
        queries["search"] = query.search ? query.search : "";
        queries["page"] = query.page ? query.page : 1;
        queries["order"] = "";
        queries["filter"] = "All";
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
                category_name: queries["name"],
                search: queries["search"],
                wordsList: this.props.wordsList.list,
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
                wordsList: this.props.wordsList.list,
            });
        });
        // var keyword = e.target.value;
        // if(keyword !== ""){
        //     var arr = [];
        //     for(var i = 0; i < this.props.wordsList.length; i ++)
        //     {
        //         var item = this.props.wordsList[i];
        //         if (item.word.toLowerCase().includes(keyword.toLowerCase())) arr.push(item);
        //     }
        //     this.setState({wordsList: arr});
        // }
        // else this.setState({wordsList: this.props.wordsList})
    }

    orderhandler(e) {
        // var arr = [...this.state.wordsList];
        // for(var i = 0; i < arr.length -1; i++)
        //     for(var j = 0; j < arr.length -1; j++)
        //         if(arr[j].word < arr[j+1].word)
        //         {
        //             var item = arr[j];
        //             arr[j] = arr[j+1];
        //             arr[j+1] = item;
        //         }
        // this.setState({wordsList: arr});
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
                wordsList: this.props.wordsList.list,
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
                wordsList: this.props.wordsList.list,
            });
        });
    }

    learntWordhandler(word_id) {
        var token = localStorage.getItem('token');
        this.props.learntWord(token, word_id).then(() => {
            if (this.props.status === "success") {
                var arr = [...this.state.wordsList];
                for (var i = 0; i < arr.length; i++)
                    if (arr[i].id === word_id) {
                        arr[i].learnt = true;
                        break;
                    }
                this.setState({ wordsList: arr });
            }
        });
    }

    unlearntWordhandler(word_id) {
        var token = localStorage.getItem('token');
        this.props.unlearntWord(token, word_id).then(() => {
            if (this.props.status === "success") {
                var arr = [...this.state.wordsList];
                for (var i = 0; i < arr.length; i++)
                    if (arr[i].id === word_id) {
                        arr[i].learnt = false;
                        break;
                    }
                this.setState({ wordsList: arr });
            }
        });
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
    render() {
        var cards = this.props.wordsList && this.props.wordsList.list && this.props.wordsList.list.map((data, key) =>
            <_WordCard data={data} key={key} learntWordhandler={this.learntWordhandler} unlearntWordhandler={this.unlearntWordhandler} />
        );
        // let category_name = this.props.location.search;
        return (
            <>
                <div className="container">
                    <div className="card mt-2 border border-white">
                        <div className="card-header bg-transparent border-success ">
                            <div className="row mt-3 align-items-center">
                                <div className="col-md-6">
                                    <h4>
                                        Words List of {this.state.category_name}
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
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wordsList: state.words.list,
        status: state.words.status,
    }
}

const mapDispatchToProps = dispatch => ({
    getWords: (token, category_id, params) => dispatch(getWords(token, category_id, params)),
    learntWord: (token, word_id) => dispatch(learntWord(token, word_id)),
    unlearntWord: (token, word_id) => dispatch(unlearntWord(token, word_id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Words);