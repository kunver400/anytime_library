import React, { Component } from 'react';
import { Table, Icon } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import BOOK_ACTIONS from '../../redux/actions/book_actions';
import Auxi from '../../hoc/Auxi/Auxi';
import BookCard from './BookCard/BookCard';
import Issue from '../Issue/Issue';
import common from '../../utils/common';
// import classes from './IndexedCollection.css';

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    key: 0
    // width: '20%',
}, {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a, b) => a.title.localeCompare(b.title),
    //defaultSortOrder: 'ascend',
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
    sorter: (a, b) => {
        let adate = new Date(a.date_string), bdate = new Date(b.date_string);
        return (adate < bdate ? 1 : (adate === bdate ? 0 : -1));
    },
    render: date_string => common.formatDate(date_string),
    key: 3
    // width: '20%',
}, {
    title: 'Available units',
    dataIndex: 'availablity',
    sorter: (a, b) => a.availablity - b.availablity,
    key: 4
    // width: '20%',
}, {
    title: 'Popularity',
    dataIndex: 'times_issued',
    sorter: (a, b) => a.times_issued - b.times_issued,
    key: 5
    // width: '20%',
}
];



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
                let formattedResponse = common.formatBooks(response.data);
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
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.title,
        }),
    };
    onRowClick = (record) => {
        this.setState({
            selectedBook: record
        })
    };
    // handleTableChange = (pagination, filters, sorter) => {
    //     console.log('params', pagination, filters, sorter);
    // }
    componentDidMount() {
        this.fetchBooks();
    };
    render() {
        return (
            <Auxi>
                <BookCard book={this.state.selectedBook} {...this.props}/>
                <Table columns={columns}
                    //rowKey={record => record.registered}
                    dataSource={this.state.data}
                    //pagination={this.state.pagination}
                    loading={this.state.loading}
                    rowSelection={this.rowSelection}
                    onRow={(record) => {
                        return { onClick: () => this.onRowClick(record) };
                    }}
                    // onChange={this.handleTableChange}
                    size='middle'
                />
                <Issue {...this.props}/>
                </Auxi>
        )
    }
}

const mapStateToProps = state => {
    return {
      issueVisible: state.bookReducer.issueModalVisible,
      selectedBook: state.bookReducer.currentBook
    }
  }
  const mapDispatchToProps = dispatch => {
      return {
        issuepopupToggled: (book) => dispatch({type:BOOK_ACTIONS.TOGGLE_ISSUE_MODAL,book: book}),
      }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(IndexedCollection);