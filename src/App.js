import React, {Fragment} from "react";
// Redux store
import { connect } from 'react-redux'
import {
	toggleContactForm,
	toggleGroupForm,
	changeContactModProps,
	changeGroupModProps
} from './store/actions'
import { fields } from './components/forms/fields'
// Components
import AddButton from "./components/add-button.jsx"
import ContentCategory from "./components/content-category.jsx"
import CardSegment from "./components/name-group.jsx"
import ContentDisplay from "./components/content-display.jsx"
import ContactForm from "./components/forms/contact-form.jsx"
import GroupCard from "./components/cards/group-card.jsx"
import GroupForm from "./components/forms/group-form.jsx"
// import Footer from "./components/footer.jsx"
// Styles
import "./App.css";


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

	render () {
		const { view, groups } = this.props
		const groupNames = Object.keys(groups)
		let {contacts} = this.props
		const contactsCount = Object.keys(contacts).length
		contacts = Object.values(contacts)
			.reduce((output, contact) => {
				const {name} = contact
				const key = (name ? name[0].toUpperCase() : '#')
				output[key] = [...(output[key] || []), contact]
				return output
			} , {})

		return (
			<div className="App">
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
						<AddButton clickCallback={this.newContactForm} />
					</div>
					<ContentDisplay>
						{
							contactsCount
							?
							Object.keys(contacts).sort().map(
								(key, i) =>
									<CardSegment
										title={key}
										collection={contacts[key].sort()}
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
					<div className="contact-shortcuts">
						{
							"#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(
								(char, i) =>
									<a
										className={
											"shortcut" +
											(contacts[char] ? " is-linked" : "")
										}
										href={"#" + char}
										key={i}
									>{char}</a>
							)
						}
					</div>
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
					<AddButton
						clickCallback={
							contactsCount ? this.newGroupForm : null
						}
					/>
				</ContentCategory>

				{/*
					Both contact and group forms are multipurposed.
					They can be used to create, edit and preview a contact / group
				*/}
				{
					view.contactForm === 'open' ? <ContactForm /> : null
				}
				{
					view.groupForm === 'open' ? <GroupForm /> : null
				}
				{/*<Footer />*/}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	...state
})

const mapDispatchToProps = {
	toggleContactForm,
	toggleGroupForm,
	changeContactModProps,
	changeGroupModProps,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
