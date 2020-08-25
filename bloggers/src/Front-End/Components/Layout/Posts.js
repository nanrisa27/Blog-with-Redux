import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { database } from '../../../Back-End/Firebase';
import _ from "lodash";
import ReactQuill from "quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
//import App from '../../../App';


class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            posts: {}
        };

        //bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    //lifecycle method

    componentDidMount() {
        database.on('value', snapshot => {
            this.setState({
                posts: snapshot.val()
            })
        });
    }

    //render post and return the title and post

    renderPosts() {
        return _.map(this.state.posts, (post, key) => {
            return (<div key={key}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            );

        });
    }

    //using arrow function to replace the bind(this)

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //saving the data to the database on submit using a method "savepsot"
    //using arrow function here too to replace the binding
    handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body
        };
        database.push(post);
        this.setState({
            title: "",
            body: ""
        })

    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input value={this.state.title} type="text" name="title" placeholder="Title"
                            onChange={this.handleChange} ref="title" className="form-control"></input>
                    </div>

                    <div className="form-group" >
                        <ReactQuill
                            modules={App.modules}
                            formats={App.modules}
                            value={this.state.body}
                            placeholder="Body"
                            onChange={this.handleChange}
                        ></ReactQuill>
                    </div>
                    <Button variant="info">Post</Button>{' '}




                </form>
                <br />
                {this.renderPosts()}



            </div>
        );
    }
}
App.modules = {
    toolbar: [
        [{ "header": '1' }, { 'header': '2' }, { 'font': [] }
        ],
        [{ 'size': [] }],
        ['bold', 'italics', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'unordered' }, { 'list': 'bullet' }],

    ]
};

export default Posts;
