import React from "react";
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
import ContactCard from "./components/cards/contact-card.jsx"
import ContentDisplay from "./components/content-display.jsx"
import ContactForm from "./components/forms/contact-form.jsx"
import GroupCard from "./components/cards/group-card.jsx"
import GroupForm from "./components/forms/group-form.jsx"
// Styling
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

		const {contacts, view} = this.props
		const contacts_array = Object.values(contacts)
		const groups = contacts_array.reduce((output, person) => {
			const {group} = person
			if (group) {
				group.forEach(name =>
					output[name] = [...(output[name] || []), person]
				)
			}
			return output
		}, {})

		return (
			<div className="App">
				{/* Contacts Category */}
				<ContentCategory id="contacts">
					<div className="head">
						<div>
							<h2>Contacts</h2>
							<p>{contacts_array.length + " contacts"}</p>
						</div>
						<AddButton clickCallback={this.newContactForm} />
					</div>
					<ContentDisplay>
						{
							contacts_array.length ?
							contacts_array.map(
								(info, i) => <ContactCard info={info} key={i}/>
							) :
							<p>
								No contacts to display.
								Start by clicking/tapping the
								<span className="emphasis">+</span>
								icon above.
							</p>
						}
					</ContentDisplay>
				</ContentCategory>

				{/* Groups Category */}
				<ContentCategory id="groups">
					<div className="head">
						<h2>Groups</h2>
					</div>
					<ContentDisplay>
						{
							!contacts_array.length ?
							// placeholder text to be shown when there
							// aren't any contacts available
							<p>
								You can create a new group after adding
								one or more contacts to your contact list
							</p>
							:
							(
								Object.keys(groups).length ?
								// a group card is automatically deleted once there are
								// no contacts present in that group after update.
								Object.keys(groups).sort().map((name, i) =>
									<GroupCard
										name={name}
										list={groups[name]}
										key={i}
									/>
								) :
								// placeholder text to be shown when there are contacts
								// available without any groups added yet.
								<p>
									Create a new group by clicking/tapping
									<span className="emphasis">+</span>
									icon below.
								</p>
							)
						}
					</ContentDisplay>
					<AddButton clickCallback={contacts_array.length ? this.newGroupForm : null} />
				</ContentCategory>

				{/*
					Both contact and group forms are multipurposed.
					They can be used to create, edit and preview a contact / group
				*/}
				{
					view.contactForm === 'open'
					?
					<ContactForm fields={fields} />
					:
					null
				}
				{
					view.groupForm === 'open' ? <GroupForm /> : null
				}
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
