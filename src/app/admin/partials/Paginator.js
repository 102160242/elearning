import React from 'react';
import { Link } from 'react-router-dom';

export default function Paginator(props) {
    const createQueries = (page) => {
        var queries = props.queries;
        //console.log(queries);
        queries["page"] = page;
        return "?" + new URLSearchParams(queries).toString();
    }

    // console.log(props)
    // console.log("Page cuoi la " + props.paginate.last_page);
    // console.log("Page hien tai la " + props.paginate.current_page);
    var pageNumber = [];
    if (props.paginate.last_page < 10) {
        pageNumber = Array.from({ length: props.paginate.last_page }, (v, k) => k + 1);
    }
    else {
        for (var i = 0; i < 3; i++) {
            pageNumber.push(i + 1);
        }
        pageNumber.push(props.paginate.previous_page);
        pageNumber.push(props.paginate.current_page);
        pageNumber.push(props.paginate.next_page);
        for (var i = props.paginate.last_page; i > props.paginate.last_page - 3; i--) {
            pageNumber.push(i);
        }
        // Xoa key duplicate va sap xep lai
        pageNumber = [...new Set(pageNumber)].sort(function (a, b) { return a - b });
    }

    var previousArrow = <li className="page-item"><Link className="page-link" to={createQueries(props.paginate.previous_page)}><span aria-hidden="true">&laquo;</span></Link></li>;

    /*var pageBtn = pageNumber.map((v, k) => {
        return(
            <li className="page-item" key={k}><Link className="page-link" to={this.createQueries(v)}>{ v } </Link></li>
        );
    });*/
    var pageBtn = [];
    var j = 0;
    for (var i = 0; i < pageNumber.length; i++) {
        //console.log("Page hien tai la " + props.paginate.current_page + " va page dang gen la " + pageNumber[i]);
        if (props.paginate.current_page == pageNumber[i])
            pageBtn.push(<li className="page-item active" key={j++}><Link className="page-link" to={createQueries(pageNumber[i])}>{pageNumber[i]} </Link></li>);
        else pageBtn.push(<li className="page-item" key={j++}><Link className="page-link" to={createQueries(pageNumber[i])}>{pageNumber[i]} </Link></li>);
        // Neu co khoang trong giua cac so page. VD 1,2,3,8,9,10
        //console.log("i la " + i + " va length la " + pageNumber.length)
        if (i != pageNumber.length - 1 && pageNumber[i + 1] - pageNumber[i] > 1)
            pageBtn.push(<li className="page-item disabled" key={j++}><Link className="page-link" to={createQueries(pageNumber[i])}>...</Link></li>);
    }
    // var previousPageBtn = <li className="page-item"><Link className="page-link" to={this.createQueries(props.paginate.previous_page)}>{ props.paginate.previous_page } </Link></li>;
    // var currentPageBtn = <li className="page-item"><Link className="page-link" to={this.createQueries(props.paginate.current_page)}>{ props.paginate.current_page } </Link></li>;
    // var nextPageBtn = <li className="page-item"><Link className="page-link" to={this.createQueries(props.paginate.next_page)}>{ props.paginate.next_page } </Link></li>;

    var nextArrow = <li className="page-item"><Link className="page-link" to={createQueries(props.paginate.next_page)}><span aria-hidden="true">&raquo;</span></Link></li>;

    if (props.paginate.current_page == 1) {
        previousArrow = <li className="page-item disabled"><Link className="page-link" to="#" ><span aria-hidden="true">&laquo;</span></Link></li>
    }
    if (props.paginate.current_page === props.paginate.last_page) {
        nextArrow = <li className="page-item disabled"><Link className="page-link" to="#" ><span aria-hidden="true">&raquo;</span></Link></li>
    }
    return (
        <nav>
            <ul className="pagination">
                {previousArrow}
                {pageBtn}
                {nextArrow}
            </ul>
        </nav>
    );

}