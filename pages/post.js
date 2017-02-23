import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import Layout from '../source/base/components/Layout';
import Loading from '../source/shared/components/Loading';
import BasePage from '../source/base/components/BasePage';
import Container from '../source/shared/components/Container';
import PostHeader from '../source/posts/components/PostHeader';
import PostContent from '../source/posts/components/PostContent';
import CommentsList from '../source/comments/components/CommentsList';

import actions from '../source/actions';

class PostDetail extends Component {

	static async getInitialProps(context) {
		const postId = context.query.id;
		await context.actions.loadPost(postId);

		return {
			postId,
		};
	}

	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
		this.fetchCommentsAndUser();
	}

	async fetchCommentsAndUser() {
		return this.setState({ loading: true }, async () => {
			try {
				await Promise.all([
					this.props.actions.loadCommentsByPost(this.props.postId),
					this.props.actions.loadUser(this.props.post.userId),
				]);

				this.setState({ loading: false });
			} catch (error) {
				this.setState({ loading: false });
			}
		});
	}

	render() {
		const {
			post,
			comments,
		} = this.props;

		return (
			<Layout
				{...this.props}
				intlTitleId="title.post"
				intlTitleValues={{
					postTitle: post.title,
				}}
			>
				<PostHeader {...this.props} loading={this.state.loading} />
				<Container>
					<PostContent {...post} />
					<Divider />
					{
						this.state.loading ? <Loading /> : (
							<CommentsList comments={comments} />
						)
					}
				</Container>
			</Layout>
		);
	}
}

PostDetail.propTypes = {
	post: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.number,
		title: PropTypes.string,
		body: PropTypes.string,
	}).isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
		postId: PropTypes.number,
		id: PropTypes.number,
	    name: PropTypes.string,
	    email: PropTypes.string,
	    body: PropTypes.string,
		}),
	).isRequired,
};

function mapStateToProps(state, props) {
	const post = state.get('currentPost').get(props.postId).toJS();
	const user = state.get('user').get(post.userId.toString()) ?
		state.get('user').get(post.userId.toString()).toJS() : {};

	return {
		post,
		user,
		comments: state.get('comments')
			.filter((c) => {
				return c.get('postId') === post.id;
			})
			.toList()
			.toJS()
			.sort((a, b) => {
				return a.id - b.id;
			}),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default BasePage(mapStateToProps, mapDispatchToProps)(PostDetail);
