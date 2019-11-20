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
            <div className="container">
                <div className="row d-flex justity-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card border-bottom-primary mb-3">
                            <div className="card-header bg-transparent border-primary">
                                <h2>Words List of Categories</h2>
                            </div>
                            <div className = "row">
                                <div className="col-12">
                                    <div className="card-body">
                                        <div className="col-sm-6">
                                            <h5 className="card-title text-info d-inline">run</h5>
                                            <p className="text-muted d-inline">(verb)</p>
                                            <p className="text-muted">/rʌn/</p>
                                            <p>chạy</p>
                                        </div>
                                        <div className="col-sm-6">
                                            <img className="card-img-top img-thumbnail" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/morning-exercise-royalty-free-image-534609714-1558470117.jpg?resize=480:*"></img>
                                        </div>
                                        <button className="btn btn-success">Check as Learnt</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-bottom-success mb-3">
                            <div className="card-header bg-transparent border-success">
                                <h2>Filter and Search</h2>
                            </div>
                            <div class="card-body">
                            <input type="text" name="page" value="1" hidden="">
                                    <div class="form-group">
                                        <label class="" for="search_key">Search</label>
                                        <input type="text" class="form-control" id="search_key" name="search_key" value="" placeholder="For example: juxtaposition"/>
                                    </div>
                                    <div class="form-group">
                                        <label class="my-1 mr-2" for="filter">Filter</label>
                                        <select class="custom-select" id="filter" name="filter">
                                            <option value="all">All</option>
                                            <option value="learnt">Learnt Words</option>
                                            <option value="unlearnt">Unlearnt Words</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="my-1 mr-2" for="order">Order</label>
                                        <select class="custom-select" id="order" name="order">
                                            <option value="az">A-Z</option>
                                            <option value="za">Z-A</option>
                                        </select>
                                    </div>
                                    <button id="search" class="btn btn-primary mb-2">Submit</button>
                                </input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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