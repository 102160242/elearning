import React from 'react';
import _WordCard from './_WordCard';
import { connect } from 'react-redux';
import { getWords, learntWord, unlearntWord } from '../../actions/word';
import { changeLoadingStatus } from '../../actions/app';
import './Words.css'

class Words extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            wordsList: [],
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.sortAtoZ = this.sortAtoZ.bind(this);
        this.sortZtoA = this.sortZtoA.bind(this);
        this.learntWordhandler = this.learntWordhandler.bind(this);
        this.unlearntWordhandler = this.unlearntWordhandler.bind(this);
        this.AllFilterhandler = this.AllFilterhandler.bind(this);
        this.UnLearntWordFilterhandler = this.UnLearntWordFilterhandler.bind(this);
        this.LearntWordFilterhandler = this.LearntWordFilterhandler.bind(this);
    }
    componentDidMount() {
        document.title = "Words";

        var token = localStorage.getItem('token');
        let category_id = this.props.match.params.category_id;

        this.props.getWords(token, category_id).then(() => {
            this.props.changeLoadingStatus(false);
            this.setState({
                wordsList: this.props.wordsList
            });
        })
    }

    searchHandler(e){
        var keyword = e.target.value;
        if(keyword !== ""){
            var arr = [];
            for(var i = 0; i < this.props.wordsList.length; i ++)
            {
                var item = this.props.wordsList[i];
                if (item.word.toLowerCase().includes(keyword.toLowerCase())) arr.push(item);
            }
            this.setState({wordsList: arr});
        }
        else this.setState({wordsList: this.props.wordsList})
    }

    sortAtoZ(){
        var arr = [...this.state.wordsList];
        for(var i = 0; i < arr.length -1; i++)
            for(var j = 0; j < arr.length -1; j++)
                if(arr[j].word > arr[j+1].word)
                {
                    var item = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = item;
                }
        this.setState({wordsList: arr});
        console.log(arr.length)
    }

    sortZtoA(){
        var arr = [...this.state.wordsList];
        for(var i = 0; i < arr.length -1; i++)
            for(var j = 0; j < arr.length -1; j++)
                if(arr[j].word < arr[j+1].word)
                {
                    var item = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = item;
                }
        this.setState({wordsList: arr});
    }

    AllFilterhandler()
    {
        this.setState({wordsList: this.props.wordsList});
    }

    LearntWordFilterhandler()
    {
        var arr = [];
        for(var i = 0; i < this.props.wordsList.length; i++)
        {
            var item = this.props.wordsList[i];
            if(item.learnt)
                arr.push(item);
        }
        this.setState({wordsList: arr});
    }

    UnLearntWordFilterhandler()
    {
        var arr = [];
        for(var i = 0; i < this.props.wordsList.length; i++)
        {
            var item = this.props.wordsList[i];
            if(!item.learnt)
                arr.push(item);
        }
        this.setState({wordsList: arr});
    }

    learntWordhandler(word_id)
    {
        var token = localStorage.getItem('token');
        this.props.learntWord(token, word_id).then(() => {
            if(this.props.status === "success")
            {
                var arr = [...this.state.wordsList];
                for(var i = 0; i < arr.length; i++)
                    if(arr[i].id === word_id)
                    {
                        arr[i].learnt = true;
                        break;
                    }
                this.setState({wordsList: arr});
            }
        });
    }

    unlearntWordhandler(word_id)
    {
        var token = localStorage.getItem('token');
        this.props.unlearntWord(token, word_id).then(() => {
            if(this.props.status === "success")
            {
                var arr = [...this.state.wordsList];
                for(var i = 0; i < arr.length; i++)
                    if(arr[i].id === word_id)
                    {
                        arr[i].learnt = false;
                        break;
                    }
                this.setState({wordsList: arr});
            }
        });
    }

    componentWillUnmount()
    {
        this.props.changeLoadingStatus(true);
    }
    // handleCollapseDropdown(e)
    // {
    //     console.log(e.target.nextElementSibling);
    //     e.target.parentElement.className = "dropdown show";
    //     e.target.nextElementSibling.className = "dropdown-menu show";
    // }
    render() {
        var cards = this.state.wordsList && this.state.wordsList.map((data, key) => 
            <_WordCard data={data} key={key} learntWordhandler={this.learntWordhandler} unlearntWordhandler={this.unlearntWordhandler} />
        );
        // let category_name = this.props.location.search;
        const params = new URLSearchParams(this.props.location.search);
        const name = params.get('name');
        return (
            <>
                <div className="container">
                    <div className="card mt-2 border border-white">
                        <div className="card-header bg-transparent border-success ">
                            <div className="row mt-3 align-items-center">
                                <div className="col-md-6">
                                    <h4>
                                        Words List of {name}
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
                                                    <button className="dropdown-item btn btn-outline-primary" onClick={this.AllFilterhandler} >All</button>
                                                    <button className="dropdown-item btn btn-outline-primary" onClick={this.LearntWordFilterhandler} >Learnt Words</button>
                                                    <button className="dropdown-item btn btn-outline-primary" onClick={this.UnLearntWordFilterhandler} >Unlearnt Words</button>
                                                </div>
                                            </div>    
                                        </div>
                                        <div className="col-auto">
                                            <div id="order" className="dropdown" /*onMouseEnter={this.handleCollapseDropdown}*/>
                                                <button className="btn btn-outline-light text-dark " data-toggle="dropdown" >
                                                    <i className="fas fa-sort"></i> <span>Sort</span>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item btn btn-outline-primary " onClick={this.sortAtoZ} >A-Z</button>
                                                    <button className="dropdown-item btn btn-outline-primary " onClick={this.sortZtoA} >Z-A</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <input className="form-control mr-sm-2 " type="search" placeholder="Search" onChange={this.searchHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {cards}
                        </div>
                    </div>
                    <div className="m-3">
                        <nav>
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        wordsList: state.words.list,
        status: state.words.status,
    }
}

const mapDispatchToProps = dispatch => ({
    getWords: (token, category_id) => dispatch(getWords(token, category_id)),
    learntWord: (token, word_id) => dispatch(learntWord(token, word_id)),
    unlearntWord: (token, word_id) => dispatch(unlearntWord(token, word_id)),
    changeLoadingStatus: (status) => dispatch(changeLoadingStatus(status))
});
export default connect(mapStateToProps, mapDispatchToProps) (Words);