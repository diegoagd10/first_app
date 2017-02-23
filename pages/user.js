import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import React, { Component, PropTypes } from 'react';

import Layout from '../source/base/components/Layout';
import Loading from '../source/shared/components/Loading';
import BasePage from '../source/base/components/BasePage';
import PostList from '../source/posts/components/PostList';
import Container from '../source/shared/components/Container';
import UserHeader from '../source/users/components/UserHeader';
import UserDetails from '../source/users/components/UserDetails';
import UserAddress from '../source/users/components/UserAddress';

import actions from '../source/actions';

class UserProfile extends Component {

	static async getInitialProps(context) {
		const userId = context.query.id;
		await context.actions.loadUser(userId);

		return {
			userId,
		};
	}

	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
		this.fetchPosts();
	}

	async fetchPosts() {
		return this.setState({ loading: true }, async () => {
			try {
				await this.props.actions.loadUserPosts(this.props.userId);
				this.setState({ loading: false });
			} catch (error) {
				this.setState({ loading: false });
			}
		});
	}

	render() {
		const {
			user,
			posts,
		} = this.props;

		return (
			<Layout
				{...this.props}
				intlTitleId="title.profile"
				intlTitleValues={{
					name: user.name,
				}}
			>
				<UserHeader {...user} />
				<Container>
					<section>
						<UserDetails {...user} />
						<Divider />
						<UserAddress {...user.address} />
						<Divider />
						<h2>
							<FormattedMessage
								id="profile.meta.posts"
								values={{
									amount: posts.length,
								}}
							/>
						</h2>
						{
							this.state.loading ? <Loading /> : (
								<PostList posts={posts} />
							)
						}
					</section>
				</Container>
			</Layout>
		);
	}
}

UserProfile.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		username: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
		website: PropTypes.string,
		address: PropTypes.shape({
			street: PropTypes.string,
			city: PropTypes.string,
			zipcode: PropTypes.string,
		}),
	}).isRequired,
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			userId: PropTypes.number,
			id: PropTypes.number,
			title: PropTypes.string,
			body: PropTypes.string,
		}),
	).isRequired,
};

function mapStateToProps(state, props) {
	const user = state.get('user').get(props.userId).toJS();

	const posts = state.get('posts').get('entities')
			.filter((p) => {
				return p.get('userId') === user.id;
			})
			.toList()
			.toJS()
			.sort((a, b) => {
				return a.id - b.id;
			});

	return {
		user,
		posts,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default BasePage(mapStateToProps, mapDispatchToProps)(UserProfile);
