import React from 'react';
import axios from 'axios';
import _CategoryCard from './_CategoryCard';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            list: [],
            filteredList: [],
            currentPage: 1
        };
        this.searchHandler = this.searchHandler.bind(this);
        //this.filterList = this.filterList.bind(this);
    }
    searchHandler(e)
    {
        var keyword = e.target.value;
        if(keyword !== "")
        {
            console.log(this.state.list.length)
            var filteredList = [];
            for(var i = 0; i < this.state.list.length; i++)
            {
                var item = this.state.list[i];
                if(item.name.toLowerCase().includes(keyword.toLowerCase())) filteredList.push(item);
            }
            this.setState({filteredList: filteredList});
        }
        else this.setState({ filteredList: this.state.list });
    }
    // filterList(keyword)
    // {
    //     console.log(this.state.list.count)
    //     if(keyword !== "")
    //     {
    //         var filteredList = [];
    //         for(var i = 0; i < this.state.list.count; i++)
    //         {
    //             console.log(this.state.list[i].name.toLowerCase())
    //             if(this.state.list[i].name.toLowerCase() == keyword.toLowerCase()) filteredList.push(this.state.list[i]);
    //         }
    //         return filteredList;
    //     }
    //     else return this.state.list;
    // }
    componentDidMount()
    {
        axios.get(process.env.REACT_APP_API_URL + 'categories.json?all=true')
        .then(res => {
            console.log(res);
            if(res.status == 200)
            {
                var data = res.data;
                if(data.status == "success")
                {
                    this.setState({
                        list: data.data,
                        filteredList: data.data
                    });
                }
            }
            else
            {
                console.log("Khong the ket noi den server! Ma loi: " + res.status);
            }
        })
        .catch(error => console.log(error));
    }
    render() {
        var cards = this.state.filteredList.map((data, i) => 
            <_CategoryCard data={data} />
        );
        return (
            <>
                <div className="container-fluid title-bar mt-3">
                    <div className="row d-flex justify-content-between">
                        <div className="d-inline">
                            <strong>Categories</strong> | { this.state.list.length } total
                        </div>
                        <form className="form-inline">
                            <input type="text" className="form-control mb-2 mr-sm-2" placeholder="Search" onChange={this.searchHandler} />
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

export default Categories;