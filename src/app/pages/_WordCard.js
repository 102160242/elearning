import React from 'react';
import ReactDOM from 'react-dom';

class _WordCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = { };
        this.dofunLearnt = this.dofunLearnt.bind(this);
        this.dofunUnLearnt = this.dofunUnLearnt.bind(this);
    }

    dofunLearnt(){
        var id = this.props.data.id;
        this.props.learntWordhandler(id);
        var btnDiv = document.querySelector("#btn_"+id);
        var btn = <button className="btn btn-warning" onClick={this.dofunUnLearnt} > Remove From List </button>
        ReactDOM.render(btn, btnDiv);

    }

    dofunUnLearnt(){
        var id = this.props.data.id;
        this.props.unlearntWordhandler(id);
        var btnDiv = document.querySelector("#btn_"+id);
        var btn = <button className="btn btn-success" onClick={this.dofunLearnt} > Check as Learnt </button>
        ReactDOM.render(btn, btnDiv);
    }

    render() {
        var data = this.props.data;
        return(
            <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                        <div className="content-left col-md-8 col-sm-6 col-xs-6">
                            <h5 className="card-title text-info d-inline"> {data.word} </h5>
                            <p className="text-muted d-inline"> {data.word_class} </p>
                            <p className="text-muted"> /{data.ipa}/ </p>                         
                            <p> {data.meaning} </p>
                            {
                                this.props.type ? (
                                <div id={"btn_" + data.id}> 
                                {
                                    data.learnt ? (
                                        <button className="btn btn-warning" onClick={this.dofunUnLearnt} > Remove From List </button>
                                    ) : (
                                        <button className="btn btn-success" onClick={this.dofunLearnt} > Check as Learnt </button>
                                    )
                                }
                                </div>) : ( <> </>)
                            }       

                        </div>
                        <div className="content-right col-md-4 col-sm-6 col-xs-6">
                            <div className="img-thumbnail">
                                <img src={data.img_url} ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default _WordCard;