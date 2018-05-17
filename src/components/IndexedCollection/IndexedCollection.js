import React, { Component } from 'react';
import { Table } from 'antd';
import Axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import BookCard from './BookCard/BookCard';
import classes from './IndexedCollection.css';

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: (a,b)=>a.title.localeCompare(b.title),
    key: 0
    // width: '20%',
},{
    title: 'Author',
    dataIndex: 'author',
    sorter: (a,b)=>a.title.localeCompare(b.title),
    defaultSortOrder: 'ascend',
    key: 1,
    // width: '20%',
},
// {
//     title: 'Description',
//     dataIndex: 'desc',
//     key: 2
//     // width: '20%',
// },
{
    title: 'Date Added',
    dataIndex: 'date_added',
    sorter: (a,b)=>{
      let adate = new Date(a.date_string),bdate = new Date(b.date_string);
      return (adate<bdate?1:(adate===bdate?0:-1));
    },
    render: date_string=>formatDate(date_string),
    key: 3
    // width: '20%',
},{
    title: 'Available units',
    dataIndex: 'availablity',
    sorter: (a,b)=> a.availablity-b.availablity,
    key: 4
    // width: '20%',
},{
    title: 'Popularity',
    dataIndex: 'times_issued',
    sorter: (a,b)=> a.times_issued-b.times_issued,
    key: 5
    // width: '20%',
}
];

const formatBooks = (data) => {
    let books = [];
    for (let key in data) {
        books.push({
            ...data[key],
            key: key
        });
    }
    console.log(books);
    return books;
};
const formatDate = (date_string) => {
    let date = new Date(date_string);
    return date.getUTCDate()+'/'+date.getUTCMonth()+'/'+date.getUTCFullYear();
}


class IndexedCollection extends Component {

    state = {
        data: [],
        loading: false,
        selectedBook: null
    };
    fetchBooks = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        Axios.get('/books.json')
            .then(response => {
                let formattedResponse = formatBooks(response.data);
                this.setState({
                    loading: false,
                    data: formattedResponse,
                    selectedBook: formattedResponse[0]
                });
            })
            .catch(response => {
                console.log('something went wrong.');
            });
    };
    rowSelection  = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.title,
          }),
    };
    onRowClick=(record) => {
    this.setState({
        selectedBook: record
    })        
    };
    componentDidMount() {
        this.fetchBooks();
    };
    render() {
        return (
            <Aux>
                <BookCard book={this.state.selectedBook}/>
            <Table columns={columns}
                //rowKey={record => record.registered}
                dataSource={this.state.data}
                //pagination={this.state.pagination}
                loading={this.state.loading}
                rowSelection={this.rowSelection}
                onRow={(record)=>{
                    return {onClick: ()=>this.onRowClick(record)};
                }}
                // onChange={this.handleTableChange}
            size='middle'
            /></Aux>
        )
    }
}

export default IndexedCollection;