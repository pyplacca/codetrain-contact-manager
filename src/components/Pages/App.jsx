import React from "react";
// Redux store subscriber
import { connect } from 'react-redux'
// components
import CardSegment from '../Cards/CardSegment';
import GroupCard from '../Cards/GroupCard';
import Header from '../Misc/Header';
import Footer from '../Misc/Footer';
import ContentCategory from '../Misc/ContentCategory';
import ContentDisplay from '../Misc/ContentDisplay';
import * as Buttons from '../Misc/Buttons';
import fields from '../Forms/fields.js';
import ContactForm from '../Forms/ContactForm';
import GroupForm from '../Forms/GroupForm';
// import { Misc, Cards, Forms } from "components";

// styles
import "../../static/css/app.css";
// import "static/css/app.css";
// store actions
import {
	toggleContactForm,
	toggleGroupForm,
	changeContactModProps,
	changeGroupModProps,
	retrieveData,
	signOut
} from '../../store/actions'


class App extends React.Component {

	constructor(props) {
		super(props)

		this.newContactForm = this.newContactForm.bind(this)
		this.newGroupForm = this.newGroupForm.bind(this)
	}

	newContactForm () {
		const entry = Object.fromEntries(
			fields.map(obj => [obj.name, ''])
		)
		this.props.changeContactModProps({
			mode: 'add',
			entry
		})
		this.props.toggleContactForm('open')
	}

	newGroupForm () {
		this.props.changeGroupModProps({
			mode: 'add',
			entry: undefined
		})
		this.props.toggleGroupForm('open')
	}

	componentDidMount() {
		const {retrieveData} = this.props
		retrieveData('contacts', 'RETRIEVE_CONTACTS')
		retrieveData('groups', 'RETRIEVE_GROUPS')
	}

	render () {
		const { view, groups, fbRdcr, signOut } = this.props
		const user = fbRdcr.auth.providerData[0]; // logged in user's info
		const groupNames = Object.keys(groups);
		let {contacts} = this.props;
		const contactsCount = Object.keys(contacts).length;
		// segment contacts into groups of alphabets or #
		contacts = Object.values(contacts)
			.reduce((output, contact) => {
				const {name} = contact
				const key = (name ? name[0].toUpperCase() : '#')
				output[key] = [...(output[key] || []), contact]
				return output
			} , {});

		return (
			<div className="App">
				{/* Page header */}
				<Header
					name={user.displayName || user.email}
					dp={user.photoURL}
					signOutFunc={signOut}
				/>
				{/* Main area */}
				<div className="App__container">
					{/* Contacts Category */}
					<ContentCategory id="contacts">
						<div className="head">
							<div>
								<h2>Contacts</h2>
								<p>{
									(contactsCount || 0) +
									" contact" +
									(contactsCount !== 1 ? 's' : '')
								}</p>
							</div>
							<Buttons.Add clickCallback={this.newContactForm} />
						</div>
						<ContentDisplay>
							{
								contactsCount
								?
								Object.keys(contacts).sort().map(
									(key, i) =>
										<CardSegment
											title={key}
											collection={
												// sort contacts in each segment
												// by name in ascending order
												contacts[key]
												.sort((a, b) =>
													(a.name < b.name) ? -1 :
													((a.name > b.name) ? 1 : 0)
												)
											}
											key={i}
										/>
								)
								:
								<p className="tip">
									No contacts to display.<br/>
									Start by clicking/tapping the
									<span className="emphasis">&#43;</span>
									icon above.
								</p>
							}
						</ContentDisplay>

						{/* Contacts segment shortcuts */}
						<ul className="contact-shortcuts">
							{
								"#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(
									(char, i) =>
										<li
											className={
												"shortcut" +
												(contacts[char] ? " is-linked" : "")
											}
											key={i}
										>
											<a href={"#" + char}>{char}</a>
										</li>
								)
							}
						</ul>
					</ContentCategory>

					{/* Groups Category */}
					<ContentCategory id="groups">
						<div className="head">
							<h2>Groups</h2>
						</div>
						<ContentDisplay>
							{
								!contactsCount
								?
								// placeholder text to be shown when there
								// aren't any contacts available
								<p className="tip">
									You can create a new group after adding
									one or more contacts to your contact list
								</p>
								:
								(
									groupNames.length
									?
									// a group card is automatically deleted once there are
									// no contacts present in that group after update.
									groupNames.sort().map((name, i) =>
										<GroupCard
											name={name}
											count={Object.keys(groups[name]).length}
											key={i}
										/>
									)
									:
									// placeholder text to be shown when there are contacts
									// available but no groups.
									<p className="tip">
										Click/tap the
										<span className="emphasis">&#43;</span>
										icon below to create a new group.
									</p>
								)
							}
						</ContentDisplay>
						<Buttons.Add
							clickCallback={
								contactsCount ? this.newGroupForm : null
							}
						/>
					</ContentCategory>

					{/*
						Both contact and group forms are multipurposed.
						They can be used to create, edit and preview a contact / group
					*/}
					{[
						view.contactForm === 'open' ? <ContactForm key={1} /> : null,
						view.groupForm === 'open' ? <GroupForm key={2}/> : null
					]}
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	...state.mainReducer,
	fbRdcr: state.firebaseReducer
})

const mapDispatchToProps = {
	toggleContactForm,
	toggleGroupForm,
	changeContactModProps,
	changeGroupModProps,
	retrieveData,
	signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
