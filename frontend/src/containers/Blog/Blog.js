import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios.js';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        post: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('/recipes')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({post: updatedPosts})
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
        if(!this.state.error) {
            posts = this.state.post.map(post => {
                return <Post key={post.id}
                 title={post.title}
                 author={post.author}
                 clicked={() => this.postSelectedHandler(post.id)} />
            });
        }
            
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;