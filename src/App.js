import React from "react";
import AddButton from "./components/add-button.jsx"
import ContentCategory from "./components/content-category.jsx"
import ContentDisplay from "./components/content-display.jsx"
import ContactCard from "./components/cards/contact-card.jsx"
import ContactForm from "./components/forms/contact-form.jsx"
import GroupCard from "./components/cards/group-card.jsx"
import GroupForm from "./components/forms/group-form.jsx"
import "./App.css";


class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			// id helps keep track of a contact
			id: 1,
			// Each contact entry is an object with integer(s), string(s) and/or array(s)
			// A contact's group entry must be an Set in order to accomodate the
			// possibility of having a contact appear in more than one group without duplicates.
			contacts: {},
			// contact and group names are case-sensitive
			preview: {
				contact: {},
				group: undefined,
			}
		}

		this.createContact = this.createContact.bind(this)
		this.createGroup = this.createGroup.bind(this)

		this.openContactForm = this.openContactForm.bind(this)
		this.openGroupForm = this.openGroupForm.bind(this)

		this.previewContact = this.previewContact.bind(this)
		this.previewGroup = this.previewGroup.bind(this)
	}

	openContactForm () {
		document.querySelector(".form-modal#contact-form")
		.classList
		.toggle("hidden")
	}

	openGroupForm () {
		document.querySelector(".form-modal#group-form")
		.classList
		.toggle("hidden")
	}

	createContact (contact) {}

	createGroup (group) {}

	editContact (id) {}

	previewGroup ({target}) {}

	previewContact ({target}) {}

	render () {
		const contacts_array = Object.values(this.state.contacts)
		const groups = contacts_array.reduce((output, obj, i) => {
			const {group} = obj
			if (group) {
				group.forEach(name =>
					output[name] = [...(output[name] || []), obj]
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
						<AddButton clickCallback={this.openContactForm} />
					</div>
					<ContentDisplay>
						{
							contacts_array.map((person, i) =>
								<ContactCard
									info={person}
									clickCallback={this.previewContact}
									key={i}
								/>
							)
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
							Object.keys(groups).sort().map((name, i) =>
								<GroupCard
									name={name}
									list={groups[name]}
									key={i}
									clickCallback={this.previewGroup}
								/>
							)
						}
					</ContentDisplay>
					<AddButton clickCallback={this.openGroupForm} />
				</ContentCategory>

				{/* Forms */}
				<ContactForm />
				<GroupForm contacts={this.state.contacts} />
			</div>
		);
	}
}

export default App;
