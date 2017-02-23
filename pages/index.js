import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import React, { Component, PropTypes } from 'react';

import Layout from '../source/base/components/Layout';
import Header from '../source/shared/components/Header';
import Loading from '../source/shared/components/Loading';
import BasePage from '../source/base/components/BasePage';
import PostList from '../source/posts/components/PostList';
import Container from '../source/shared/components/Container';

import actions from '../source/actions';

class Home extends Component {

	static async getInitialProps(context) {
		if (context.isServer) await context.actions.postsNextPage();
		return {};
	}

	constructor(props) {
		super(props);
		this.state = { loading: false };
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		if (this.props.posts.length === 0) this.fetchPosts();
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	async fetchPosts() {
		return this.setState({ loading: true }, async () => {
			try {
				await this.props.actions.postsNextPage();
				this.setState({ loading: false });
			} catch (error) {
				this.setState({ loading: false });
			}
		});
	}

	handleScroll() {
		if (this.state.loading) return null;

		const scrolled = window.scrollY;
		const viewportHeight = window.innerHeight;
		const fullHeight = document.body.offsetHeight;

		if (!(scrolled + viewportHeight >= fullHeight)) {
			return null;
		}

		return this.fetchPosts();
	}

	render() {
		const posts = this.props.posts;

		return (
			<Layout {...this.props} intlTitleId="title.home">
				<div>
					<Header>
						<FormattedMessage id="title.home" />
					</Header>
					<Container>
						<div>
							<PostList posts={posts} />
							{
								this.state.loading && (
									<Loading />
								)
							}
						</div>
					</Container>
				</div>
			</Layout>
		);
	}
}

Home.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			body: PropTypes.string,
			userId: PropTypes.number,
		}),
	).isRequired,
};

function mapStateToProps(state) {
	return {
		posts: state.get('posts').get('entities').toList().toJS()
			.sort((a, b) => {
				return a.id - b.id;
			}),
		page: state.get('posts').get('page'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default BasePage(mapStateToProps, mapDispatchToProps)(Home);
